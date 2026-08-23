<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\User;
use Illuminate\Database\Seeder;

class OrderSeeder extends Seeder
{
    public function run(): void
    {
        $users = User::all();

        for ($i = 0; $i < 30; $i++) {
            Order::factory()->create([
                'user_id' => $users->random()->id,
                'totalprice' => 0,
            ]);
        }
    }
}
