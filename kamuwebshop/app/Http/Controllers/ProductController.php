<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        return Inertia::render('products', [
            'products' => Product::with('category')->get(),
            'categories' => Category::all(),
        ]);
    }

    public function show(Product $product)
    {
        $product->load('category');

        $relatedProducts = Product::with('category')
            ->where('category_id', $product->category_id)
            ->where('id', '!=', $product->id)
            ->get();

        return Inertia::render('product', [
            'product' => $product,
            'relatedProducts' => $relatedProducts,
        ]);
    }
}
