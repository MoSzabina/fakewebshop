<?php

namespace App\Http\Requests\Settings;

use Illuminate\Foundation\Http\FormRequest;

class ProfileUpdateRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'shipping' => ['nullable', 'string', 'max:255'],
        ];
    }
}
