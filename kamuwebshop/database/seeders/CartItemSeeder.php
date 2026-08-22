<?php

namespace Database\Seeders;

use App\Models\CartItem;
use App\Models\Cart;
use App\Models\Product;
use Illuminate\Database\Seeder;

class CartItemSeeder extends Seeder
{
    public function run(): void
    {
        $carts = Cart::all();
        $products = Product::all();

        foreach ($carts as $cart) {
            $productsForCart = $products->random(rand(1, 5));

            foreach ($productsForCart as $product) {
                CartItem::factory()->create([
                    'cart_id' => $cart->id,
                    'product_id' => $product->id,
                ]);
            }
        }
    }
}
