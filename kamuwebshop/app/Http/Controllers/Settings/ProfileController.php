<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\PasswordUpdateRequest;
use App\Http\Requests\Settings\ProfileUpdateRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    public function edit(Request $request): Response
    {
        $user = $request->user();

        $creditBalance = $user->creditTransactions()->sum('amount');

        $creditTransactions = $user->creditTransactions()
            ->latest()
            ->get();

        $orders = $user->orders()
            ->with('items.product')
            ->latest()
            ->get();

        return Inertia::render('profile', [
            'user' => $user,
            'orders' => $orders,
            'creditBalance' => $creditBalance,
            'creditTransactions' => $creditTransactions,
        ]);
    }

    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->update([
            'shipping' => $request->validated('shipping'),
        ]);

        Inertia::flash('toast', [
            'type' => 'success',
            'message' => 'Shipping address updated',
        ]);

        return back();
    }

    public function updatePassword(
        PasswordUpdateRequest $request
    ): RedirectResponse {
        $request->user()->update([
            'password' => $request->password,
        ]);

        Inertia::flash('toast', [
            'type' => 'success',
            'message' => __('Password updated'),
        ]);

        return back();
    }
}
