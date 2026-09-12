<?php

namespace App\Http\Controllers;

use App\Enums\CreditTransactionType;
use App\Enums\OrderStatus;
use App\Models\Cart;
use App\Models\CreditTransaction;
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

        $balance = $request->user()
            ->creditTransactions()
            ->sum('amount');

        return Inertia::render('checkout', [
            'cart' => $cart,
            'total' => number_format($total, 2, '.', ''),
            'balance' => $balance,
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

        $order = DB::transaction(function () use ($cart, $validated, $user) {
            $total = 0;

            foreach ($cart->items as $item) {
                if ($item->product->stock < $item->quantity) {
                    abort(422, 'Not enough stock available.');
                }

                $total += (float) $item->product->price * $item->quantity;
            }

            $balance = $user->creditTransactions()
                ->lockForUpdate()
                ->sum('amount');

            if ($balance < $total) {
                abort(422, 'Not enough credits available.');
            }

            $order = Order::create([
                'user_id' => $cart->user_id,
                'status' => OrderStatus::Pending,
                'total_price' => $total,
                'shipping' => $validated['shipping'],
            ]);

            foreach ($cart->items as $item) {
                $order->items()->create([
                    'product_id' => $item->product_id,
                    'quantity' => $item->quantity,
                    'unitprice' => $item->product->price,
                ]);

                $item->product->decrement('stock', $item->quantity);
            }

            CreditTransaction::create([
                'user_id' => $user->id,
                'amount' => -$total,
                'type' => CreditTransactionType::Spent,
            ]);

            $cart->items()->delete();

            return $order;
        });

        return redirect()->route('profile.edit');
    }
}
