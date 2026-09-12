<?php

namespace App\Http\Controllers;

use App\Enums\CreditTransactionType;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class CreditController extends Controller
{
    public function index(Request $request): Response
{
    $user = $request->user();

    $balance = $user->creditTransactions()
        ->sum('amount');

    $claimedToday = $user->creditTransactions()
        ->where('type', CreditTransactionType::Earn)
        ->where('created_at', '>=', now()->startOfDay())
        ->where('created_at', '<=', now()->endOfDay())
        ->where('amount', 100)
        ->exists();

    return Inertia::render('credits', [
        'balance' => $balance,
        'claimedToday' => $claimedToday,
    ]);
}

    public function claimDailyReward(Request $request): RedirectResponse
    {
        $user = $request->user();

        $claimedToday = $user->creditTransactions()
            ->where('type', CreditTransactionType::Earn)
            ->where('created_at', '>=', now()->startOfDay())
            ->where('created_at', '<=', now()->endOfDay())
            ->where('amount', 100)
            ->exists();

        if ($claimedToday) {
            return back();
        }

        $user->creditTransactions()->create([
            'amount' => 100,
            'type' => CreditTransactionType::Earn,
        ]);

        Inertia::flash('toast', [
            'type' => 'success',
            'message' => __('You received 100 daily credits!'),
        ]);

        return back();
    }
}
