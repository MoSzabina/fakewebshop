<?php

namespace App\Actions\Fortify;

use App\Actions\MergeGuestCart;
use Laravel\Fortify\Contracts\RegisterResponse as RegisterResponseContract;

class RegisterResponse implements RegisterResponseContract
{
    public function __construct(
        protected MergeGuestCart $mergeGuestCart
    ) {
    }

    public function toResponse($request)
    {
        $this->mergeGuestCart->handle($request);

        if ($request->session()->pull('checkout_redirect', false)) {
            return redirect()->route('checkout');
        }

        return redirect()->intended('/');
    }
}
