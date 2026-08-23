<?php

namespace Database\Factories;

use App\Enums\CreditTransactionType;
use App\Models\CreditTransaction;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<CreditTransaction>
 */
class CreditTransactionFactory extends Factory
{
    public function definition(): array
    {
        return [
            'amount' => fake()->numberBetween(100, 10000),
            'type' => fake()->randomElement(CreditTransactionType::cases()),
        ];
    }
}
