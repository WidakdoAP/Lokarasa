<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function index(Request $request): Response
    {
        $search = $request->string('search')->trim()->toString();
        $sort = $request->string('sort')->toString();
        
        $products = Product::query()
            ->with('images')
        
            // Search
            ->when($search !== '', function ($query) use ($search) {
                $query->where(
                    'name',
                    'ILIKE',
                    "%{$search}%"
                );
            })
        
            // Sorting
            ->when($sort === 'Paling Murah', function ($query) {
                $query->orderBy('price', 'asc');
            })
        
            ->when($sort === 'Paling Mahal', function ($query) {
                $query->orderBy('price', 'desc');
            })
        
            // Default
            ->when($sort === '', function ($query) {
                $query->latest();
            })
        
            ->get();


        $banners = collect(Storage::disk('public')->files('banners'))
            ->filter(fn($file) => in_array(
                strtolower(pathinfo($file, PATHINFO_EXTENSION)),
                ['jpg', 'jpeg', 'png', 'webp','gif']
            ))
            ->values()
            ->all();

        return Inertia::render('market', [
            'products' => $products->map(fn (Product $product) => [
                'id' => $product->id,
                'name' => $product->name,
                'description' => $product->description,
                'price' => $product->price,
                'category' => $product->category,

                'images' => $product->images
                    ->sortBy('sort_order')
                    ->map(fn ($image) => [
                        'id' => $image->id,
                        'image' => asset('storage/'.$image->image),
                    ])
                    ->values(),
            ]),
            'banners' => $banners,
            'filters' => [
                'search' => $search,
                'sort' => $sort,
            ],
        ]);
    }

    public function details(Product $product): Response
    {
        $product->load('images');

        return Inertia::render('product-details', [
            'product' => [
                'id' => $product->id,
                'name' => $product->name,
                'description' => $product->description,
                'price' => $product->price,
                'category' => $product->category,
                'images' => $product->images
                    ->sortBy('sort_order')
                    ->map(fn ($image) => [
                        'id' => $image->id,
                        'image' => asset('storage/'.$image->image),
                    ])
                    ->values()
                    ->all(),
            ],
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $path = $request->file('image')->store('products', 'public');
        Product::create([
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price,
            'image' => $path,
        ]);

        return redirect()->route('/');
    }
}
