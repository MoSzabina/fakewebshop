<?php

namespace App\Enums;

enum CreditTransactionType: string
{
    case Earn = 'earn';
    case Spent = 'spent';
    case Refund = 'refund';
}
