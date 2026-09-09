<?php

namespace App\Http\Controllers;

use App\Enums\OrderStatus;
use App\Models\Cart;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class CheckoutController extends Controller
{
    public function index(Request $request): Response
    {
        $cart = Cart::where('user_id', $request->user()->id)
            ->with('items.product.category')
            ->first();

        if (! $cart || $cart->items->isEmpty()) {
            return redirect()->route('cart');
        }

        $total = $cart->items->sum(function ($item) {
            return (float) $item->product->price * $item->quantity;
        });

        return Inertia::render('checkout', [
            'cart' => $cart,
            'total' => number_format($total, 2, '.', ''),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'shipping' => ['required', 'string', 'max:255'],
        ]);

        $user = $request->user();

        $cart = Cart::where('user_id', $user->id)
            ->with('items.product')
            ->first();

        if (! $cart || $cart->items->isEmpty()) {
            return redirect()->route('cart');
        }

        $order = DB::transaction(function () use ($cart, $validated) {
            $total = 0;

            foreach ($cart->items as $item) {
                if ($item->product->stock < $item->quantity) {
                    abort(422, 'Not enough stock available.');
                }

                $total += (float) $item->product->price * $item->quantity;
            }

            $order = Order::create([
                'user_id' => $cart->user_id,
                'status' => OrderStatus::pending,
                'total_price' => $total,
                'shipping' => $validated['shipping'],
            ]);

            foreach ($cart->items as $item) {
                $order->items()->create([
                    'product_id' => $item->product_id,
                    'quantity' => $item->quantity,
                    'unit_price' => $item->product->price,
                ]);

                $item->product->decrement('stock', $item->quantity);
            }

            $cart->items()->delete();

            return $order;
        });

        return redirect()->route('orders.show', $order);
    }
}
