<?php

namespace Database\Factories;

use App\Models\CartItem;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<CartItem>
 */
class CartItemFactory extends Factory
{
    public function definition(): array
    {
        return [
            'quantity' => fake()->numberBetween(1, 5),
        ];
    }
}
