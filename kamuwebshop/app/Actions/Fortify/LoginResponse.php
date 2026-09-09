<?php

namespace App\Actions\Fortify;

use App\Actions\MergeGuestCart;
use Laravel\Fortify\Contracts\LoginResponse as LoginResponseContract;

class LoginResponse implements LoginResponseContract
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
