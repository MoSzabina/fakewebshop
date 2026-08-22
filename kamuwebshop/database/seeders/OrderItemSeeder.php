<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Database\Seeder;

class OrderItemSeeder extends Seeder
{
    public function run(): void
    {
        $orders = Order::all();

        foreach ($orders as $order) {
            $products = \App\Models\Product::all()->random(rand(1, 5));

            $totalPrice = 0;

            foreach ($products as $product) {
                $quantity = rand(1, 5);

                OrderItem::factory()->create([
                    'order_id' => $order->id,
                    'product_id' => $product->id,
                    'quantity' => $quantity,
                    'unitprice' => $product->price,
                ]);

                $totalPrice += $product->price * $quantity;
            }

            $order->update([
                'totalprice' => $totalPrice,
            ]);
        }
    }
}
