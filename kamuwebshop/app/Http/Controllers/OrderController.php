<?php

namespace App\Http\Controllers;

use App\Enums\OrderStatus;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function adminIndex(Request $request)
    {
        $orders = Order::with([
            'user',
            'items.product',
        ])
            ->when(
                $request->filled('user'),
                fn ($query) => $query->where('user_id', $request->integer('user'))
            )
            ->when(
            $request->filled('search'),
            fn ($query) => $query->where('id', $request->integer('search'))
            )
            ->latest()
            ->get();

        return Inertia::render('admin/orders', [
            'orders' => $orders,
            'selectedUser' => $request->integer('user') ?: null,
        ]);
    }

    public function updateStatus(Request $request, Order $order)
    {
        $validated = $request->validate([
            'status' => [
                'required',
                Rule::enum(OrderStatus::class),
            ],
        ]);

        $order->update([
            'status' => $validated['status'],
        ]);

        return back();
    }
}
