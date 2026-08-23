<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        Category::create([
            'name' => 'Clothing',
        ]);

        Category::create([
            'name' => 'Feelings',
        ]);

        Category::create([
            'name' => 'Geek',
        ]);

        Category::create([
            'name' => 'Pets',
        ]);

        Category::create([
            'name' => 'Electronics',
        ]);

        Category::create([
            'name' => 'Luxury',
        ]);
    }
}
