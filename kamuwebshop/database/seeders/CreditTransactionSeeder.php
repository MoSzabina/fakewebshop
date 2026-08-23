<?php

namespace Database\Seeders;

use App\Models\CreditTransaction;
use App\Models\User;
use Illuminate\Database\Seeder;

class CreditTransactionSeeder extends Seeder
{
    public function run(): void
    {
        $users = User::all();

        for ($i = 0; $i < 50; $i++) {
            CreditTransaction::factory()->create([
                'user_id' => $users->random()->id,
            ]);
        }
    }
}
