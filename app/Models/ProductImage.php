<?php

namespace App\Models;

use App\Models\Product;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProductImage extends Model
{
    protected $fillable = [
        'image',
        'sort_order',
    ];

    /**
     * @return BelongsTo<Product, $this>
     */
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}