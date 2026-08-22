<?php

namespace Database\Seeders;

use App\Models\Cart;
use App\Models\User;
use Illuminate\Database\Seeder;

class CartSeeder extends Seeder
{
    public function run(): void
    {
        User::inRandomOrder()
            ->limit(10)
            ->get()
            ->each(function ($user) {
                Cart::factory()->for($user)->create();
            });
    }
}
