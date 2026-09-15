<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\LocaleController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\CreditController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\OverviewController;

Route::post('/locale', [LocaleController::class, 'change'])
    ->name('locale.change');

Route::inertia('/', 'home')->name('home');

Route::inertia('/about', 'about')->name('about');

Route::inertia('/privacy', 'privacy')->name('privacy');

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
    Route::get('/admin', [OverviewController::class, 'index'])
    ->name('admin');

    Route::get('/admin/products', [ProductController::class, 'adminIndex'])
    ->name('admin.products');

    Route::get('/admin/products/create', [ProductController::class, 'create'])
    ->name('admin.products.create');

    Route::post('/admin/products', [ProductController::class, 'store'])
    ->name('admin.products.store');

    Route::get('/admin/products/{product}/edit', [ProductController::class, 'edit'])
    ->name('admin.products.edit');

    Route::patch('/admin/products/{product}', [ProductController::class, 'update'])
    ->name('admin.products.update');

    Route::delete('/admin/products/{product}', [ProductController::class, 'destroy'])
    ->name('admin.products.destroy');

    Route::get('/admin/users', [UserController::class, 'adminIndex'])
    ->name('admin.users');

    Route::post('/admin/users/{user}/credits', [UserController::class, 'addCredits'])
    ->name('admin.users.credits');

    Route::delete('/admin/users/{user}', [UserController::class, 'destroy'])
    ->name('admin.users.destroy');

    Route::get('/admin/orders', [OrderController::class, 'adminIndex'])
    ->name('admin.orders');

    Route::patch('/admin/orders/{order}/status', [OrderController::class, 'updateStatus'])
    ->name('admin.orders.status');
});

require __DIR__.'/profile.php';
