<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $clothing = Category::where('name', 'Clothing')->first();
        $feelings = Category::where('name', 'Feelings')->first();
        $geek = Category::where('name', 'Geek')->first();
        $pet = Category::where('name', 'Pets')->first();
        $electronics = Category::where('name', 'Electronics')->first();
        $luxury = Category::where('name', 'Luxury')->first();

        Product::create([
        'category_id' => $geek->id,
        'name' => 'Nose of Sauron',
        'price' => 34.99,
        'stock' => 25,
        'description' => 'All knows the Eye of Sauron, but what about his nose?',
        'image' => 'placeholder.jpg',
    ]);

    }
}
