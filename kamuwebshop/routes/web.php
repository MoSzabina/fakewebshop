<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\LocaleController;
use App\Http\Controllers\CartController;

Route::post('/locale', [LocaleController::class, 'change'])->name('locale.change');

// Public pages
Route::inertia('/', 'home')->name('home');

Route::inertia('/about', 'about')->name('about');

Route::inertia('/auth', 'auth')->name('auth');

Route::inertia('/products', 'products')->name('products');

Route::get('/products', [ProductController::class, 'index'])
    ->name('products');

Route::get('/cart', [CartController::class, 'index'])
    ->name('cart');

Route::post('/cart/add/{product:slug}', [CartController::class, 'add'])
    ->name('cart.add');

Route::patch('/cart/update/{product}', [CartController::class, 'update'])
    ->name('cart.update');

Route::delete('/cart/remove/{product}', [CartController::class, 'remove'])
    ->name('cart.remove');

Route::delete('/cart/clear', [CartController::class, 'clear'])
    ->name('cart.clear');

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
