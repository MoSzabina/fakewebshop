<?php

namespace App\Actions\Fortify;

use App\Actions\MergeGuestCart;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Laravel\Fortify\Contracts\RegisterResponse as RegisterResponseContract;

class RegisterResponse implements RegisterResponseContract
{
    public function __construct(
        protected MergeGuestCart $mergeGuestCart
    ) {
    }

    public function toResponse($request): RedirectResponse
    {
        $this->mergeGuestCart->handle($request);

        Inertia::flash('toast', [
            'type' => 'success',
            'message' => __('Welcome! Here, 1000 credits to spend wisely.'),
        ]);

        if ($request->session()->pull('checkout_redirect', false)) {
            return redirect()->route('checkout');
        }

        return redirect()->intended('/');
    }
}
