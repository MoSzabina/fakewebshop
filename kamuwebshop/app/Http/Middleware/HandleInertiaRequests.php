<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Session;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        $getTranslations = function () {
            $locale = Session::get('locale', config('app.locale'));

            $path = lang_path("$locale.json");

            if (file_exists($path)) {
                return json_decode(file_get_contents($path), true) ?? [];
            }

            return [];
        };

        $cartCount = 0;

        if ($request->user()) {
            $cart = $request->user()
                ->cart()
                ->with('items')
                ->first();

            if ($cart) {
                $cartCount = $cart->items->sum('quantity');
            }
        } else {
            $cartCount = collect(
                Session::get('cart', [])
            )->sum();
        }

        return [
            ...parent::share($request),

            'name' => config('app.name'),

            'auth' => [
                'user' => $request->user(),
            ],

            'sidebarOpen' => ! $request->hasCookie('sidebar_state')
                || $request->cookie('sidebar_state') === 'true',

            'locale' => App::getLocale(),
            'translations' => $getTranslations(),
            'cartCount' => $cartCount,
        ];
    }
}
