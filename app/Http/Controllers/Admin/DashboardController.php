<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        $revenue = Order::where('payment_status', 'paid')->sum('total');

        $recentOrders = Order::with('user')
            ->latest()
            ->take(5)
            ->get();

        return Inertia::render('admin/dashboard', [
            'stats' => [
                'products' => Product::count(),
                'orders' => Order::count(),
                'users' => User::count(),
                'revenue' => $revenue,
                'pending' => Order::where('payment_status', 'pending')->count(),
            ],

            'recentOrders' => $recentOrders,
        ]);
    }
}