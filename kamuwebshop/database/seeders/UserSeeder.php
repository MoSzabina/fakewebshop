<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::factory()->count(30)->create();

        User::factory()->create([
            'username' => 'admin',
            'email' => 'admin@example.com',
            'is_admin' => true,
        ]);
    }
}
