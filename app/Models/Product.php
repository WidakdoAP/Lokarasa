<?php

namespace App\Models;

use Database\Factories\ProductFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property int $id
 * @property string $name
 * @property string $description
 * @property string $price
 * @property string $category
 */
class Product extends Model
{
    /** @use HasFactory<ProductFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'price',
        'description',
        'category',
    ];

    /**
     * @return HasMany<ProductImage, $this>
     */
    public function images()
    {
        return $this->hasMany(ProductImage::class);
    }
}
