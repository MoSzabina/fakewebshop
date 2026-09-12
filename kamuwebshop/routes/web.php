<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\LocaleController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\CreditController;

Route::post('/locale', [LocaleController::class, 'change'])
    ->name('locale.change');

Route::inertia('/', 'home')->name('home');

Route::inertia('/about', 'about')->name('about');

Route::inertia('/auth', 'auth')->name('auth');

Route::inertia('/products', 'products')->name('products');

Route::get('/products', [ProductController::class, 'index'])
    ->name('products');

Route::get('/products/{product:slug}', [ProductController::class, 'show'])
    ->name('products.show');

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

Route::post('/checkout/redirect', function () {
    session()->put('checkout_redirect', true);

    return redirect()->route('auth');
})->name('checkout.redirect');

Route::middleware('auth')->group(function () {
    Route::get('/checkout', [CheckoutController::class, 'index'])
        ->name('checkout');

    Route::post('/checkout', [CheckoutController::class, 'store'])
        ->name('checkout.store');

    Route::get('/credits', [CreditController::class, 'index'])
    ->name('credits');

    Route::post('/credits/daily-reward', [CreditController::class, 'claimDailyReward'])
    ->name('credits.daily-reward');
});

Route::middleware(['auth', 'admin'])->group(function () {
    Route::inertia('/dashboard', 'dashboard')->name('dashboard');
});

require __DIR__.'/profile.php';
