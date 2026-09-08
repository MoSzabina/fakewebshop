<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class LocaleController extends Controller
{
    public function change(Request $request): RedirectResponse
    {
    $locale = $request->get('locale', 'en');
    if (in_array($locale, available_locales(), true)) {
        Session::put('locale', $locale);
    }
    return redirect()->back();
    }
}
