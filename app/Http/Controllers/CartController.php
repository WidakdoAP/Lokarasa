<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CartController extends Controller
{
    public function index(Request $request): Response
    {
        $cartItems = CartItem::query()
            ->where('user_id', $request->user()->id)
            ->with('product.images')
            ->get();

        return Inertia::render('cart', [
            'cartItems' => $cartItems,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'product_id' => ['required', 'exists:products,id'],
            'quantity' => ['nullable', 'integer', 'min:1'],
        ]);

        $cartItem = CartItem::firstOrCreate(
            [
                'user_id' => $request->user()->id,
                'product_id' => $validated['product_id'],
            ],
            [
                'quantity' => $validated['quantity'] ?? 1,
            ]
        );

        // If product already exists in cart,
        // increase its quantity instead.
        if (! $cartItem->wasRecentlyCreated) {
            $cartItem->increment(
                'quantity',
                $validated['quantity'] ?? 1
            );
        }

        return back()->with('success', 'Product added to cart.');
    }

    public function update(
        Request $request,
        CartItem $cartItem
    ): RedirectResponse {
        abort_unless(
            $cartItem->user_id === $request->user()->id,
            403
        );

        $validated = $request->validate([
            'quantity' => ['required', 'integer', 'min:1'],
        ]);

        $cartItem->update([
            'quantity' => $validated['quantity'],
        ]);

        return back();
    }

    public function destroy(
        Request $request,
        CartItem $cartItem
    ): RedirectResponse {
        abort_unless(
            $cartItem->user_id === $request->user()->id,
            403
        );

        $cartItem->delete();

        return back()->with('success', 'Product removed from cart.');
    }
}