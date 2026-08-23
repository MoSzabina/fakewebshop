<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Enums\CreditTransactionType;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class CreditTransaction extends Model
{
    
    use HasFactory;
    
    protected $fillable = [
        'user_id',
        'amount',
        'type',
    ];

    protected function casts(): array
    {
        return [
            'type' => CreditTransactionType::class,
            'amount' => 'integer',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
