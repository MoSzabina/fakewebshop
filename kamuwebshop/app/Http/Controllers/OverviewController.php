<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\User;
use Inertia\Inertia;

class OverviewController extends Controller
{
    public function index()
    {
        $orders = Order::query();

        $revenue = $orders->sum('total_price');
        $orderCount = $orders->count();
        $customerCount = User::where('is_admin', false)->count();

        $averageOrder = $orderCount > 0
            ? $revenue / $orderCount
            : 0;

        $startMonth = now()->startOfMonth()->subMonths(6);

        $recentOrders = Order::where('created_at', '>=', $startMonth)
            ->get(['total_price', 'created_at']);

        $salesData = collect(range(6, 0))->map(function ($monthsAgo) use ($recentOrders) {
            $month = now()->startOfMonth()->subMonths($monthsAgo);

            $monthOrders = $recentOrders->filter(function ($order) use ($month) {
                return $order->created_at->year === $month->year
                    && $order->created_at->month === $month->month;
            });

            return [
                'month' => $month->format('M'),
                'revenue' => round($monthOrders->sum('total_price'), 2),
                'orders' => $monthOrders->count(),
            ];
        })->values();

        $categoryTotals = OrderItem::with('product.category')
            ->get()
            ->filter(fn ($item) => $item->product?->category)
            ->groupBy(fn ($item) => $item->product->category->name)
            ->map(fn ($items) => $items->sum('quantity'))
            ->sortDesc();

        $totalCategoryOrders = $categoryTotals->sum();

        $categoryData = $categoryTotals
            ->map(function ($value, $name) use ($totalCategoryOrders) {
                return [
                    'name' => $name,
                    'value' => $totalCategoryOrders > 0
                        ? round(($value / $totalCategoryOrders) * 100)
                        : 0,
                ];
            })
            ->values();

        return Inertia::render('admin', [
            'stats' => [
                'revenue' => $revenue,
                'orders' => $orderCount,
                'customers' => $customerCount,
                'averageOrder' => $averageOrder,
            ],
            'salesData' => $salesData,
            'categoryData' => $categoryData,
        ]);
    }
}
