<?php

namespace App\Actions\Fortify;

use App\Enums\CreditTransactionType;
use App\Models\CreditTransaction;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Laravel\Fortify\Contracts\CreatesNewUsers;
use App\Concerns\PasswordValidationRules;
use App\Concerns\ProfileValidationRules;

class CreateNewUser implements CreatesNewUsers
{
    use PasswordValidationRules, ProfileValidationRules;

    /**
     * Validate and create a newly registered user.
     *
     * @param  array<string, string>  $input
     */
    public function create(array $input): User
    {
        Validator::make($input, [
            ...$this->profileRules(),
            'password' => $this->passwordRules(),
        ])->validate();

        $user = User::create([
            'username' => $input['username'],
            'email' => $input['email'],
            'password' => $input['password'],
        ]);

        CreditTransaction::create([
            'user_id' => $user->id,
            'amount' => 1000,
            'type' => CreditTransactionType::Earn,
        ]);

        return $user;
    }
}
