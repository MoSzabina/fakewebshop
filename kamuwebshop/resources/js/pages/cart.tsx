import { Link, router, usePage } from '@inertiajs/react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { useTranslations } from '@/hooks/useTranslation';
import type { SharedData } from '@/types';

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
}

interface CartItem {
    id: number;
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
    const { auth } = usePage<SharedData>().props;

    const [showLoginPrompt, setShowLoginPrompt] = useState(false);

    const updateQuantity = (productId: number, quantity: number) => {
        router.patch(`/cart/update/${productId}`, {
            quantity,
        });
    };

    const removeItem = (productId: number) => {
        router.delete(`/cart/remove/${productId}`);
    };

    const clearCart = () => {
        router.delete('/cart/clear');
    };

    const handleCheckout = () => {
        if (!auth.user) {
            setShowLoginPrompt(true);
            return;
        }

        router.visit('/checkout');
    };

    const total = cart.items.reduce(
        (sum, item) =>
            sum + Number(item.product.price) * item.quantity,
        0,
    );

    return (
        <section className="mx-auto w-full max-w-[1040px] px-8 py-12">
            <div className="mb-10">
                <h1 className="text-[36px] font-semibold tracking-[-0.03em] text-[var(--color-ink)]">
                    {__('Your cart')}
                </h1>

                <p className="mt-2 text-[15px] text-[var(--color-ink-mid)]">
                    {__('Your selected products')}
                </p>
            </div>

            {cart.items.length === 0 ? (
                <div className="border-t border-[var(--color-rule)] pt-8">
                    <p className="text-[14px] text-[var(--color-ink-mid)]">
                        {__('Your cart is empty.')}
                    </p>
                </div>
            ) : (
                <div className="grid gap-10 md:grid-cols-[1fr_300px]">
                    <div>
                        <div className="divide-y divide-[var(--color-rule)] border-y border-[var(--color-rule)]">
                            {cart.items.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex gap-5 py-6"
                                >
                                    <div className="flex size-24 shrink-0 items-center justify-center overflow-hidden rounded-[4px] bg-[var(--color-sage-light)]">
                                        {item.product.image ? (
                                            <img
                                                src={item.product.image}
                                                alt={item.product.name}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <span className="text-[9px] font-medium tracking-[0.08em] text-[var(--color-sage)]">
                                                {__('PRODUCT IMAGE')}
                                            </span>
                                        )}
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <div className="mb-1 text-[11px] font-medium tracking-[0.08em] text-[var(--color-sage)]">
                                            {__(item.product.category.name)}
                                        </div>

                                        <Link
                                            href={`/products/${item.product.slug}`}
                                            className="text-[15px] font-medium text-[var(--color-ink)] hover:underline"
                                        >
                                            {__(item.product.name)}
                                        </Link>

                                        <div className="mt-2 text-[14px] text-[var(--color-ink-mid)]">
                                            {item.product.price} €
                                        </div>

                                        <div className="mt-4 flex items-center gap-2">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    updateQuantity(
                                                        item.product.id,
                                                        item.quantity - 1,
                                                    )
                                                }
                                                disabled={item.quantity <= 1}
                                                aria-label={__(
                                                    'Decrease quantity',
                                                )}
                                                className="flex size-7 items-center justify-center rounded-[3px] border border-[var(--color-rule)] text-[var(--color-ink)] disabled:opacity-40"
                                            >
                                                <Minus size={13} />
                                            </button>

                                            <span className="w-6 text-center text-[13px] text-[var(--color-ink)]">
                                                {item.quantity}
                                            </span>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    updateQuantity(
                                                        item.product.id,
                                                        item.quantity + 1,
                                                    )
                                                }
                                                aria-label={__(
                                                    'Increase quantity',
                                                )}
                                                className="flex size-7 items-center justify-center rounded-[3px] border border-[var(--color-rule)] text-[var(--color-ink)]"
                                            >
                                                <Plus size={13} />
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeItem(
                                                        item.product.id,
                                                    )
                                                }
                                                aria-label={__('Remove')}
                                                className="ml-2 flex size-7 items-center justify-center rounded-[3px] text-[var(--color-ink-mid)] hover:text-[var(--color-ink)]"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="shrink-0 text-right text-[14px] text-[var(--color-ink)]">
                                        {(
                                            Number(item.product.price) *
                                            item.quantity
                                        ).toFixed(2)}{' '}
                                        €
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-5">
                            <Button
                                variant="muted"
                                type="button"
                                onClick={clearCart}
                            >
                                {__('Clear cart')}
                            </Button>
                        </div>
                    </div>

                    <aside className="h-fit rounded-[4px] bg-[var(--color-sage-light)] p-6">
                        <h2 className="mb-6 text-[18px] font-medium text-[var(--color-ink)]">
                            {__('Order summary')}
                        </h2>

                        <div className="mb-6 flex justify-between border-b border-[var(--color-rule)] pb-4 text-[16px] font-medium text-[var(--color-ink)]">
                            <span>{__('Total')}</span>
                            <span>{total.toFixed(2)} €</span>
                        </div>

                        <Button
                            type="button"
                            onClick={handleCheckout}
                            className="w-full"
                        >
                            {__('Proceed to checkout')}
                        </Button>
                    </aside>
                </div>
            )}

            {showLoginPrompt && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 px-6">
                    <div className="w-full max-w-[420px] rounded-[4px] bg-[var(--color-white)] p-7 shadow-[0_8px_30px_rgba(28,25,23,0.15)]">
                        <h2 className="mb-3 text-[18px] font-medium text-[var(--color-ink)]">
                            {__('Login required')}
                        </h2>

                        <p className="mb-7 text-[14px] leading-6 text-[var(--color-ink-mid)]">
                            {__(
                                'You need to log in to place an order.',
                            )}
                        </p>

                        <div className="flex justify-end gap-3">
                            <Button
                                type="button"
                                variant="muted"
                                onClick={() => setShowLoginPrompt(false)}
                            >
                                {__('Cancel')}
                            </Button>

                            <Button
                                type="button"
                                onClick={() =>
                                    router.post('/checkout/redirect')
                                }
                            >
                                {__('Log in')}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
