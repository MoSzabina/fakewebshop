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
        $pets = Category::where('name', 'Pets')->first();
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

    Product::create([
    'category_id' => $feelings->id,
    'name' => 'Emotional Damage',
    'price' => 20,
    'stock' => 150,
    'description' => 'Perfect gift for your loved ones',
    'image' => 'placeholder.jpg',
    ]);

    Product::create([
        'category_id' => $feelings->id,
        'name' => 'Wake up refreshed in the morning',
        'price' => 30,
        'stock' => 45,
        'description' => 'A rare occasion',
        'image' => 'placeholder.jpg',
    ]);

    Product::create([
        'category_id' => $geek->id,
        'name' => 'GTA VII',
        'price' => 999,
        'stock' => 5,
        'description' => 'You will be the coolest gamer',
        'image' => 'placeholder.jpg',
    ]);

    Product::create([
        'category_id' => $clothing->id,
        'name' => 'Flying shoes',
        'price' => 89,
        'stock' => 20,
        'description' => 'Fuelled by regret',
        'image' => 'placeholder.jpg',
    ]);

    Product::create([
        'category_id' => $pets->id,
        'name' => 'Harold',
        'price' => 5,
        'stock' => 1000,
        'description' => 'Your closest companion for eternity',
        'image' => 'placeholder.jpg',
    ]);

    Product::create([
        'category_id' => $electronics->id,
        'name' => 'iPhone 78',
        'price' => 800,
        'stock' => 10,
        'description' => 'Have the latest phone 2 years before everyone',
        'image' => 'placeholder.jpg',
    ]);

    Product::create([
        'category_id' => $electronics->id,
        'name' => 'Hair reapplier',
        'price' => 25,
        'stock' => 40,
        'description' => 'Unshave yourself, everybody knows nobody smooth',
        'image' => 'placeholder.jpg',
    ]);

    Product::create([
        'category_id' => $luxury->id,
        'name' => 'Time for that',
        'price' => 1900,
        'stock' => 9,
        'description' => 'Average pepole aint got time for that. But you are above.',
        'image' => 'placeholder.jpg',
    ]);

    Product::create([
        'category_id' => $geek->id,
        'name' => 'Force ',
        'price' => 600,
        'stock' => 17,
        'description' => '1000 midi-chlorians per bottle',
        'image' => 'placeholder.jpg',
    ]);

    Product::create([
        'category_id' => $feelings->id,
        'name' => 'Motivation',
        'price' => 120,
        'stock' => 0,
        'description' => 'Out of stock since Monday',
        'image' => 'placeholder.jpg',
    ]);

    Product::create([
        'category_id' => $feelings->id,
        'name' => 'Patience',
        'price' => 230,
        'stock' => 22,
        'description' => 'Delivery may take several years',
        'image' => 'placeholder.jpg',
    ]);

    Product::create([
        'category_id' => $geek->id,
        'name' => 'Half-Life 3',
        'price' => 999,
        'stock' => 10,
        'description' => 'Pre-order now, receive eventually',
        'image' => 'placeholder.jpg',
    ]);

    Product::create([
        'category_id' => $clothing->id,
        'name' => 'Formal Crocs',
        'price' => 59,
        'stock' => 30,
        'description' => 'When you respect neither fashion nor yourself',
        'image' => 'placeholder.jpg',
    ]);

    Product::create([
        'category_id' => $pets->id,
        'name' => 'Emotional Support Rock',
        'price' => 19,
        'stock' => 200,
        'description' => 'Does not judge, bark or require feeding',
        'image' => 'placeholder.jpg',
    ]);

    Product::create([
        'category_id' => $electronics->id,
        'name' => 'Self-Destructing Printer',
        'price' => 349,
        'stock' => 300,
        'description' => 'Basically a normal printer',
        'image' => 'placeholder.jpg',
    ]);

    Product::create([
        'category_id' => $luxury->id,
        'name' => 'Private Island',
        'price' => 20000,
        'stock' => 2,
        'description' => 'Taxes not included',
        'image' => 'placeholder.jpg',
    ]);

    Product::create([
        'category_id' => $luxury->id,
        'name' => 'Solid Gold Toilet',
        'price' => 2800,
        'stock' => 3,
        'description' => 'Flush away your money in style',
        'image' => 'placeholder.jpg',
    ]);

    Product::create([
        'category_id' => $pets->id,
        'name' => 'Invisible Dog',
        'price' => 35,
        'stock' => 1001,
        'description' => 'Never sheds hair',
        'image' => 'placeholder.jpg',
    ]);

    Product::create([
        'category_id' => $geek->id,
        'name' => 'Felix Felicis',
        'price' => 70,
        'stock' => 80,
        'description' => 'You know, just alcohol to make you confident',
        'image' => 'placeholder.jpg',
    ]);

    Product::create([
        'category_id' => $clothing->id,
        'name' => 'Self-Lacing Shoes',
        'price' => 210,
        'stock' => 40,
        'description' => 'One less thing to worry about',
        'image' => 'placeholder.jpg',
    ]);

    Product::create([
        'category_id' => $clothing->id,
        'name' => 'Introvert Sunglasses',
        'price' => 89,
        'stock' => 90,
        'description' => 'Never make eye contact again',
        'image' => 'placeholder.jpg',
    ]);

    Product::create([
        'category_id' => $clothing->id,
        'name' => 'Barefoot shoes',
        'price' => 65,
        'stock' => 260,
        'description' => 'You know, just leave you shoes at home',
        'image' => 'placeholder.jpg',
    ]);

    Product::create([
        'category_id' => $geek->id,
        'name' => 'Respawn Token',
        'price' => 500,
        'stock' => 400,
        'description' => 'No refunds!',
        'image' => 'placeholder.jpg',
    ]);

    Product::create([
        'category_id' => $electronics->id,
        'name' => 'Anti-Alarm Clock',
        'price' => 35,
        'stock' => 55,
        'description' => 'Helps you stay asleep',
        'image' => 'placeholder.jpg',
    ]);

    Product::create([
        'category_id' => $electronics->id,
        'name' => 'VR Window',
        'price' => 420,
        'stock' => 15,
        'description' => 'Experience the outside world without going outside',
        'image' => 'placeholder.jpg',
    ]);

    Product::create([
        'category_id' => $feelings->id,
        'name' => 'De ja vu',
        'price' => 5,
        'stock' => 500,
        'description' => 'Refresh this page',
        'image' => 'placeholder.jpg',
    ]);

    Product::create([
        'category_id' => $feelings->id,
        'name' => 'False Hope',
        'price' => 99,
        'stock' => 200,
        'description' => 'You will be successful and happy',
        'image' => 'placeholder.jpg',
    ]);

    Product::create([
        'category_id' => $feelings->id,
        'name' => 'Cringe',
        'price' => 1,
        'stock' => 900,
        'description' => 'Basically free',
        'image' => 'placeholder.jpg',
    ]);

    Product::create([
        'category_id' => $geek->id,
        'name' => '12000 XP',
        'price' => 100,
        'stock' => 500,
        'description' => 'Order now! Now you have it.',
        'image' => 'placeholder.jpg',
    ]);

    Product::create([
        'category_id' => $geek->id,
        'name' => 'Mystery Superpower',
        'price' => 350,
        'stock' => 100,
        'description' => '1 of 10 very useful powers, really!',
        'image' => 'placeholder.jpg',
    ]);

    }
}
