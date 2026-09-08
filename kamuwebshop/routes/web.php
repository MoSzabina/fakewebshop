<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;

// Public pages
Route::inertia('/', 'home')->name('home');

Route::inertia('/about', 'about')->name('about');

Route::inertia('/auth', 'auth')->name('auth');

Route::inertia('/products', 'products')->name('products');

Route::get('/products', [ProductController::class, 'index'])
    ->name('products');

Route::inertia('/cart', 'cart')->name('cart');

// Authenticated user pages
Route::middleware('auth')->group(function () {
    Route::inertia('/checkout', 'checkout')->name('checkout');

    Route::inertia('/credits', 'credits')->name('credits');
});

// Admin pages
Route::middleware(['auth', 'admin'])->group(function () {
    Route::inertia('/dashboard', 'dashboard')->name('dashboard');
});

require __DIR__.'/profile.php';
