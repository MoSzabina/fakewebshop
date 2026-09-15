<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Inertia\Inertia;
use Illuminate\Http\Request;

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

    public function adminIndex()
    {
        return Inertia::render('admin/products', [
            'products' => Product::with('category')->get(), ]);
    }

    public function create()
    {
        return Inertia::render('admin/addproduct', [
            'categories' => Category::all(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_id' => ['required', 'exists:categories,id'],
            'name' => ['required', 'string', 'max:255'],
            'price' => ['required', 'numeric', 'min:0'],
            'stock' => ['required', 'integer', 'min:0'],
            'description' => ['nullable', 'string'],
            'image' => ['nullable', 'image', 'max:5120'],
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')
                ->store('products', 'public');
        } else {
            $validated['image'] = 'placeholder.jpg';
        }

        Product::create($validated);

        return redirect()
            ->route('admin.products');
    }

    public function edit(Product $product)
    {
        return Inertia::render('admin/editproduct', [
            'product' => $product,
            'categories' => Category::all(),
        ]);
    }

    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'category_id' => ['required', 'exists:categories,id'],
            'name' => ['required', 'string', 'max:255'],
            'price' => ['required', 'numeric', 'min:0'],
            'stock' => ['required', 'integer', 'min:0'],
            'description' => ['nullable', 'string'],
            'image' => ['nullable', 'image', 'max:5120'],
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')
                ->store('products', 'public');
        }

        $product->update($validated);

        return redirect()->route('admin.products');
    }

    public function destroy(Product $product)
    {
        $product->delete();

        return redirect()->route('admin.products');
    }
}
