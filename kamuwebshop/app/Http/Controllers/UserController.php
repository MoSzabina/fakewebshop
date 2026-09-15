<?php

namespace App\Http\Controllers;

use App\Enums\CreditTransactionType;
use App\Models\CreditTransaction;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function adminIndex()
    {
        $users = User::withSum('creditTransactions', 'amount')
            ->withCount('orders')
            ->latest()
            ->get();

        return inertia('admin/users', [
            'users' => $users,
        ]);
    }

    public function addCredits(Request $request, User $user)
    {
        $validated = $request->validate([
            'amount' => ['required', 'integer', 'min:1'],
        ]);

        CreditTransaction::create([
            'user_id' => $user->id,
            'amount' => $validated['amount'],
            'type' => CreditTransactionType::Earn,
        ]);

        return back();
    }

    public function destroy(User $user)
    {
        $user->delete();

        return redirect()->route('admin.users');
    }
}
