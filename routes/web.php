<?php

use App\Http\Controllers\Auth\AccountController;
use App\Http\Controllers\Auth\GoogleController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [ProductController::class, 'index'])->name('/');
Route::get('/product/{product}', [ProductController::class, 'details'])->name('product.details');

// Auth
Route::middleware('guest')->group(function () {
    Route::get('/login', fn() => Inertia::render('auth/login'))->name('login');
    Route::get('/register', fn() => Inertia::render('auth/register'))->name('register');
    Route::get('/forgot-password', fn() => Inertia::render('auth/forgot-password'))->name('forgot-password');
    Route::get('/reset-password', fn() => Inertia::render('auth/reset-password'))->name('reset-password');
});

// Google OAuth
Route::get('/auth/google', [GoogleController::class, 'redirectToGoogle'])->name('google.redirect');
Route::get('/auth/google/callback', [GoogleController::class, 'handleGoogleCallback'])->name('google.callback');

Route::post('/midtrans/notification', [CheckoutController::class, 'notification'])
    ->name('midtrans.notification');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/profile', [AccountController::class, 'index'])->name('profile');
    Route::post('/profile', [AccountController::class, 'update'])->name('profile.update');

    Route::get('/cart', [CartController::class, 'index'])->name('cart.index');
    Route::post('/cart', [CartController::class, 'store'])->name('cart.store');
    Route::patch('/cart/{cartItem}', [CartController::class, 'update'])->name('cart.update');
    Route::delete('/cart/{cartItem}', [CartController::class, 'destroy'])->name('cart.destroy');

    Route::get('/checkout', [CheckoutController::class, 'index'])->name('checkout.index');
    Route::post('/checkout', [CheckoutController::class, 'store'])->name('checkout.store');
    Route::post('/checkout/{order}/payment', [CheckoutController::class, 'payment'])->name('checkout.payment');
    Route::get('/checkout/{order}/payment', [CheckoutController::class, 'paymentPage'])->name('checkout.payment-page');
});

