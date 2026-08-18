<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function index(): Response
    {
        $products = Product::query()
            ->with('images')
            ->latest()
            ->paginate(20);

        return Inertia::render('admin/products/index', [
            'products' => $products,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/products/create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => [
                'required',
                'string',
                'max:255',
            ],

            'description' => [
                'required',
                'string',
            ],

            'price' => [
                'required',
                'numeric',
                'min:0',
            ],

            'category' => [
                'required',
                'string',
                'max:255',
            ],

            'images' => [
                'nullable',
                'array',
            ],

            'images.*' => [
                'image',
                'max:5120',
            ],
        ]);

        DB::transaction(function () use (
            $validated,
            $request
        ) {
            $product = Product::create([
                'name' =>
                    $validated['name'],

                'description' =>
                    $validated['description'],

                'price' =>
                    $validated['price'],

                'category' =>
                    $validated['category'],
            ]);

            foreach (
                $request->file('images', [])
                as $index => $image
            ) {
                $path = $image->store(
                    'products',
                    'public'
                );

                $product->images()->create([
                    'image' => $path,
                    'sort_order' => $index,
                ]);
            }
        });

        return redirect()
            ->route('admin.products.index')
            ->with('success', 'Product created.');
    }

    public function edit(Product $product): Response
    {
        $product->load('images');

        return Inertia::render('admin/products/edit',
            [
                'product' => $product,
            ]
        );
    }

    public function update(
        Request $request,
        Product $product
    ): RedirectResponse {
        $validated = $request->validate([
            'name' => [
                'required',
                'string',
                'max:255',
            ],

            'description' => [
                'required',
                'string',
            ],

            'price' => [
                'required',
                'numeric',
                'min:0',
            ],

            'category' => [
                'required',
                'string',
                'max:255',
            ],

            'images' => [
                'nullable',
                'array',
            ],

            'images.*' => [
                'image',
                'max:5120',
            ],
        ]);

        DB::transaction(function () use (
            $validated,
            $request,
            $product
        ) {
            $product->update([
                'name' =>
                    $validated['name'],

                'description' =>
                    $validated['description'],

                'price' =>
                    $validated['price'],

                'category' =>
                    $validated['category'],
            ]);

            $startingOrder =
                $product->images()->max('sort_order') ?? -1;

            foreach (
                $request->file('images', [])
                as $index => $image
            ) {
                $path = $image->store(
                    'products',
                    'public'
                );

                $product->images()->create([
                    'image' => $path,
                    'sort_order' =>
                        $startingOrder + $index + 1,
                ]);
            }
        });

        return redirect()
            ->route('admin.products.index')
            ->with('success', 'Product updated.');
    }

    public function destroy(
        Product $product
    ): RedirectResponse {
        DB::transaction(function () use ($product) {
            $product->load('images');

            foreach ($product->images as $image) {
                Storage::disk('public')
                    ->delete($image->image);
            }

            $product->delete();
        });

        return back()->with(
            'success',
            'Product deleted.'
        );
    }
}