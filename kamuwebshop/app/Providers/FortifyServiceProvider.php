<?php

namespace App\Providers;

use App\Actions\Fortify\CreateNewUser;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Str;
use Laravel\Fortify\Fortify;
use App\Actions\Fortify\LoginResponse;
use Laravel\Fortify\Contracts\LoginResponse as LoginResponseContract;
use App\Actions\Fortify\RegisterResponse;
use Laravel\Fortify\Contracts\RegisterResponse as RegisterResponseContract;

class FortifyServiceProvider extends ServiceProvider
{
    public function register(): void
    {
    $this->app->singleton(
        LoginResponseContract::class,
        LoginResponse::class
    );

    $this->app->singleton(
        RegisterResponseContract::class,
        RegisterResponse::class
    );
    }

    public function boot(): void
    {
        $this->configureActions();
        $this->configureRateLimiting();
    }

    private function configureActions(): void
    {
        Fortify::createUsersUsing(CreateNewUser::class);
    }

    private function configureRateLimiting(): void
    {
        RateLimiter::for('login', function (Request $request) {
            $throttleKey = Str::transliterate(
                Str::lower($request->input(Fortify::username())).'|'.$request->ip()
            );

            return Limit::perMinute(5)->by($throttleKey);
        });
    }
}
