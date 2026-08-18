<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class OrderController extends Controller
{
    public function index(Request $request): Response
    {
        $orders = Order::query()
            ->with('user')
            ->when(
                $request->string('payment_status')->isNotEmpty(),
                function ($query) use ($request) {
                    $query->where(
                        'payment_status',
                        $request->string('payment_status')
                    );
                }
            )
            ->latest()
            ->paginate(20)
            ->withQueryString();

        return Inertia::render('admin/orders/index', [
            'orders' => $orders,

            'filters' => [
                'payment_status' =>
                    $request->string('payment_status')->toString(),
            ],
        ]);
    }

    public function show(Order $order): Response
    {
        $order->load([
            'user',
            'items',
        ]);

        return Inertia::render('admin/orders/show', [
            'order' => $order,
        ]);
    }
}