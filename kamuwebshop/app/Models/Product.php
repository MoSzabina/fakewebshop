<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Product extends Model
{
    public $timestamps = false;
    
    protected static function booted(): void
        {
            static::creating(function (Product $product) {
                $product->slug = Str::slug($product->name);
            });
        }

    protected $fillable = [
        'category_id',
        'name',
        'price',
        'stock',
        'description',
        'image',
    ];

    protected function casts(): array
    {
        return [
            'price' => 'decimal:2',
            'stock' => 'integer',
        ];
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
