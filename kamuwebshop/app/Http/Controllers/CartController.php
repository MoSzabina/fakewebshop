<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CartController extends Controller
{
    public function index(Request $request)
    {
        if ($request->user()) {
            $cart = Cart::firstOrCreate([
                'user_id' => $request->user()->id,
            ]);

            $cart->load('items.product.category');

            return Inertia::render('cart', [
                'cart' => $cart,
            ]);
        }

        $items = collect($request->session()->get('cart', []))
            ->map(function ($quantity, $productId) {
                $product = Product::with('category')->find($productId);

                if (! $product) {
                    return null;
                }

                return [
                    'product' => $product,
                    'quantity' => (int) $quantity,
                ];
            })
            ->filter()
            ->values();

        return Inertia::render('cart', [
            'cart' => [
                'items' => $items,
            ],
        ]);
    }

    public function add(Request $request, Product $product)
    {
        $quantity = max(1, (int) $request->input('quantity', 1));

        if ($product->stock < $quantity) {
            return back()->with('error', 'Not enough stock available.');
        }

        if ($request->user()) {
            $cart = Cart::firstOrCreate([
                'user_id' => $request->user()->id,
            ]);

            $item = $cart->items()
                ->where('product_id', $product->id)
                ->first();

            if ($item) {
                $newQuantity = $item->quantity + $quantity;

                if ($newQuantity > $product->stock) {
                    $newQuantity = $product->stock;
                }

                $item->update([
                    'quantity' => $newQuantity,
                ]);
            } else {
                $cart->items()->create([
                    'product_id' => $product->id,
                    'quantity' => $quantity,
                ]);
            }

            return back();
        }

        $cart = $request->session()->get('cart', []);

        $currentQuantity = (int) ($cart[$product->id] ?? 0);
        $newQuantity = min(
            $currentQuantity + $quantity,
            $product->stock
        );

        $cart[$product->id] = $newQuantity;

        $request->session()->put('cart', $cart);

        return back();
    }

    public function update(Request $request, $productId)
    {
        $quantity = (int) $request->input('quantity', 1);

        if ($request->user()) {
            $cart = Cart::where('user_id', $request->user()->id)->first();

            if (! $cart) {
                return back();
            }

            $item = $cart->items()
                ->with('product')
                ->where('product_id', $productId)
                ->first();

            if (! $item) {
                return back();
            }

            if ($quantity <= 0) {
                $item->delete();

                return back();
            }

            $quantity = min($quantity, $item->product->stock);

            $item->update([
                'quantity' => $quantity,
            ]);

            return back();
        }

        $cart = $request->session()->get('cart', []);

        if (! isset($cart[$productId])) {
            return back();
        }

        if ($quantity <= 0) {
            unset($cart[$productId]);
        } else {
            $product = Product::find($productId);

            if ($product) {
                $cart[$productId] = min($quantity, $product->stock);
            }
        }

        $request->session()->put('cart', $cart);

        return back();
    }

    public function remove(Request $request, $productId)
    {
        if ($request->user()) {
            $cart = Cart::where('user_id', $request->user()->id)->first();

            if ($cart) {
                $cart->items()
                    ->where('product_id', $productId)
                    ->delete();
            }

            return back();
        }

        $cart = $request->session()->get('cart', []);

        unset($cart[$productId]);

        $request->session()->put('cart', $cart);

        return back();
    }

    public function clear(Request $request)
    {
        if ($request->user()) {
            $cart = Cart::where('user_id', $request->user()->id)->first();

            if ($cart) {
                $cart->items()->delete();
            }

            return back();
        }

        $request->session()->forget('cart');

        return back();
    }
}
