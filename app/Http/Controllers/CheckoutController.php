<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use App\Models\Order;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;
use Midtrans\Config;
use Midtrans\Snap;

class CheckoutController extends Controller
{
    public function index(Request $request): Response
    {
        $cartItems = CartItem::query()
            ->where('user_id', $request->user()->id)
            ->with('product.images')
            ->get();

        abort_if(
            $cartItems->isEmpty(),
            404,
            'Cart is empty.'
        );

        $subtotal = $cartItems->sum(
            fn ($item) => $item->product->price * $item->quantity
        );

        return Inertia::render('checkout', [
            'cartItems' => $cartItems,
            'subtotal' => $subtotal,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'customer_name' => [
                'required',
                'string',
                'max:255',
            ],

            'customer_phone' => [
                'required',
                'string',
                'max:30',
            ],

            'fulfillment_method' => [
                'required',
                'in:pickup,self_delivery',
            ],
        ]);

        $user = $request->user();

        $cartItems = CartItem::query()
            ->where('user_id', $user->id)
            ->with('product')
            ->get();

        if ($cartItems->isEmpty()) {
            return back()->withErrors([
                'cart' => 'Your cart is empty.',
            ]);
        }

        $subtotal = $cartItems->sum(
            fn ($item) => $item->product->price * $item->quantity
        );

        $order = DB::transaction(function () use (
            $user,
            $validated,
            $cartItems,
            $subtotal
        ) {
            $order = Order::create([
                'user_id' => $user->id,

                'order_number' => 'LR-' . strtoupper(
                    Str::random(10)
                ),

                'status' => 'pending',

                'subtotal' => $subtotal,

                'total' => $subtotal,

                'fulfillment_method' =>
                    $validated['fulfillment_method'],

                'customer_name' =>
                    $validated['customer_name'],

                'customer_phone' =>
                    $validated['customer_phone'],

                'payment_status' => 'pending',
            ]);

            foreach ($cartItems as $cartItem) {
                $price = $cartItem->product->price;

                $order->items()->create([
                    'product_id' => $cartItem->product_id,
                    'product_name' => $cartItem->product->name,
                    'price' => $price,
                    'quantity' => $cartItem->quantity,
                    'subtotal' => $price * $cartItem->quantity,
                ]);
            }

            CartItem::query()
                ->where('user_id', $user->id)
                ->delete();

            return $order;
        });

        return redirect()->route(
            'checkout.payment-page',
            $order
        );
    }

    public function paymentPage(
        Request $request,
        Order $order
    ): Response {
        abort_unless(
            $order->user_id === $request->user()->id,
            403
        );

        abort_if(
            $order->payment_status === 'paid',
            422,
            'Order is already paid.'
        );

        return Inertia::render('payment', [
            'order' => $order->load('items'),
            'midtransClientKey' =>
                config('midtrans.client_key'),
        ]);
    }

    public function payment(
        Request $request,
        Order $order
    ): JsonResponse {
        abort_unless(
            $order->user_id === $request->user()->id,
            403
        );

        abort_if(
            $order->payment_status === 'paid',
            422,
            'Order is already paid.'
        );

        Config::$serverKey =
            config('midtrans.server_key');

        Config::$isProduction =
            config('midtrans.is_production');

        Config::$isSanitized = true;
        Config::$is3ds = true;

        $order->load('items');

        $params = [
            'transaction_details' => [
                // order_number IS the Midtrans order ID.
                'order_id' => $order->order_number,

                'gross_amount' => (int) $order->total,
            ],

            'customer_details' => [
                'first_name' => $order->customer_name,
                'phone' => $order->customer_phone,
            ],

            'item_details' => $order->items
                ->map(function ($item) {
                    return [
                        'id' => (string) $item->product_id,
                        'price' => (int) $item->price,
                        'quantity' => $item->quantity,
                        'name' => $item->product_name,
                    ];
                })
                ->values()
                ->toArray(),
        ];

        $snapToken = Snap::getSnapToken($params);

        return response()->json([
            'snap_token' => $snapToken,
        ]);
    }
}