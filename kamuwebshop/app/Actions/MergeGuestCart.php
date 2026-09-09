<?php

namespace App\Actions;

use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\Request;

class MergeGuestCart
{
    public function handle(Request $request): void
    {
        $guestCart = $request->session()->get('cart', []);

        if (empty($guestCart) || ! $request->user()) {
            return;
        }

        $cart = Cart::firstOrCreate([
            'user_id' => $request->user()->id,
        ]);

        foreach ($guestCart as $productId => $quantity) {
            $product = Product::find($productId);

            if (! $product || $product->stock <= 0) {
                continue;
            }

            $quantity = min((int) $quantity, $product->stock);

            $item = $cart->items()
                ->where('product_id', $product->id)
                ->first();

            if ($item) {
                $item->update([
                    'quantity' => min(
                        $item->quantity + $quantity,
                        $product->stock
                    ),
                ]);
            } else {
                $cart->items()->create([
                    'product_id' => $product->id,
                    'quantity' => $quantity,
                ]);
            }
        }

        $request->session()->forget('cart');
    }
}
