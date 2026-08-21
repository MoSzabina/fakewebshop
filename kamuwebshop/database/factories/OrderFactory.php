<?php

namespace Database\Factories;

use App\Enums\OrderStatus;
use App\Models\Order;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Order>
 */
class OrderFactory extends Factory
{
    public function definition(): array
    {
        return [
            'status' => fake()->randomElement(OrderStatus::cases()),
            'created_at' => fake()->dateTimeBetween('-1 year', 'now'),
            'shipping' => fake()->address(),
        ];
    }
}
