<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        Product::factory()->create([
            'name' => 'Risoles',
            'price' => 18000,
            'description' => 'Risoles mayo dengan isi sosis & telur.',
        ]);
        Product::factory()->count(5)->create();
    }
}
