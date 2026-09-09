import { Link, router } from '@inertiajs/react';
import { Minus, Plus, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useTranslations } from '@/hooks/useTranslation';

interface Category {
    id: number;
    name: string;
    slug: string;
}

interface Product {
    id: number;
    slug: string;
    name: string;
    price: string;
    image?: string;
    category: Category;
    stock: number;
}

interface CartItem {
    id?: number;
    product: Product;
    quantity: number;
}

interface Cart {
    items: CartItem[];
}

interface CartProps {
    cart: Cart;
}

export default function Cart({ cart }: CartProps) {
    const { __ } = useTranslations();

    const items = cart.items ?? [];

    const total = items.reduce(
        (sum, item) =>
            sum + Number(item.product.price) * item.quantity,
        0,
    );

    const updateQuantity = (item: CartItem, quantity: number) => {
        router.patch(`/cart/update/${item.product.id}`, {
            quantity,
        }, {
            preserveScroll: true,
        });
    };

    const removeItem = (item: CartItem) => {
        router.delete(`/cart/remove/${item.product.id}`, {
            preserveScroll: true,
        });
    };

    const clearCart = () => {
        router.delete('/cart/clear', {
            preserveScroll: true,
        });
    };

    return (
        <section className="mx-auto w-full max-w-[1040px] px-8 py-12">
            <div className="mb-10">
                <h1 className="text-[36px] font-semibold tracking-[-0.03em] text-[var(--color-ink)]">
                    {__('Cart')}
                </h1>

                <p className="mt-2 text-[15px] text-[var(--color-ink-mid)]">
                    {__('Your selected products')}
                </p>
            </div>

            {items.length === 0 ? (
                <div className="py-20 text-center">
                    <p className="mb-6 text-[15px] text-[var(--color-ink-mid)]">
                        {__('Your cart is empty.')}
                    </p>

                    <Button variant="secondary" asChild>
                        <Link href="/products">
                            {__('Start shopping!')}
                        </Link>
                    </Button>
                </div>
            ) : (
                <div className="grid gap-10 md:grid-cols-[1fr_300px]">
                    <div>
                        <div className="mb-4 flex justify-end">
                            <button
                                type="button"
                                onClick={clearCart}
                                className="text-[12px] text-[var(--color-ink-mid)] hover:text-[var(--color-ink)]"
                            >
                                {__('Clear cart')}
                            </button>
                        </div>

                        <div className="divide-y divide-[var(--color-rule)] border-y border-[var(--color-rule)]">
                            {items.map((item) => (
                                <div
                                    key={item.product.id}
                                    className="flex gap-5 py-5"
                                >
                                    <Link
                                        href={`/products/${item.product.slug}`}
                                        className="size-24 shrink-0 overflow-hidden rounded-[4px] bg-[var(--color-sage-light)]"
                                    >
                                        {item.product.image ? (
                                            <img
                                                src={item.product.image}
                                                alt={item.product.name}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-full items-center justify-center text-[9px] tracking-[0.08em] text-[var(--color-sage)]">
                                                {__('PRODUCT IMAGE')}
                                            </div>
                                        )}
                                    </Link>

                                    <div className="flex min-w-0 flex-1 flex-col justify-between">
                                        <div>
                                            <div className="text-[11px] font-medium tracking-[0.08em] text-[var(--color-sage)]">
                                                {__(item.product.category.name)}
                                            </div>

                                            <Link
                                                href={`/products/${item.product.slug}`}
                                                className="mt-1 block text-[15px] font-medium text-[var(--color-ink)] hover:underline"
                                            >
                                                {__(item.product.name)}
                                            </Link>
                                        </div>

                                        <div className="mt-4 flex items-center justify-between">
                                            <div className="flex items-center border border-[var(--color-rule)]">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        updateQuantity(
                                                            item,
                                                            item.quantity - 1,
                                                        )
                                                    }
                                                    className="flex size-8 items-center justify-center text-[var(--color-ink-mid)] hover:bg-[var(--color-sage-light)]"
                                                    aria-label={__('Decrease quantity')}
                                                >
                                                    <Minus size={14} />
                                                </button>

                                                <span className="w-8 text-center text-[13px]">
                                                    {item.quantity}
                                                </span>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        updateQuantity(
                                                            item,
                                                            item.quantity + 1,
                                                        )
                                                    }
                                                    disabled={
                                                        item.quantity >=
                                                        item.product.stock
                                                    }
                                                    className="flex size-8 items-center justify-center text-[var(--color-ink-mid)] hover:bg-[var(--color-sage-light)] disabled:cursor-not-allowed disabled:opacity-30"
                                                    aria-label={__('Increase quantity')}
                                                >
                                                    <Plus size={14} />
                                                </button>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() => removeItem(item)}
                                                className="flex items-center gap-1 text-[12px] text-[var(--color-ink-mid)] hover:text-[var(--color-ink)]"
                                            >
                                                <Trash2 size={14} />
                                                {__('Remove')}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="text-right text-[14px] text-[var(--color-ink)]">
                                        {(Number(item.product.price) * item.quantity).toFixed(2)} €
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <aside className="h-fit rounded-[4px] bg-[var(--color-sage-light)] p-6">
                        <h2 className="mb-6 text-[18px] font-medium text-[var(--color-ink)]">
                            {__('Order summary')}
                        </h2>

                        <div className="mb-3 flex justify-between text-[14px] text-[var(--color-ink-mid)]">
                            <span>{__('Products')}</span>
                            <span>{total.toFixed(2)} €</span>
                        </div>

                        <div className="mb-6 border-t border-[var(--color-rule)] pt-4">
                            <div className="flex justify-between text-[16px] font-medium text-[var(--color-ink)]">
                                <span>{__('Total')}</span>
                                <span>{total.toFixed(2)} €</span>
                            </div>
                        </div>

                        <Button className="w-full">
                            {__('Proceed to checkout')}
                        </Button>
                    </aside>
                </div>
            )}
        </section>
    );
}
