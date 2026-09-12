import { Link, useForm } from '@inertiajs/react';

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
}

interface CartItem {
    id: number;
    product: Product;
    quantity: number;
}

interface Cart {
    items: CartItem[];
}

interface CheckoutProps {
    cart: Cart;
    total: string;
    creditBalance: number;
}

export default function Checkout({ cart, total, creditBalance }: CheckoutProps) {
    const { __ } = useTranslations();

    const { data, setData, post, processing, errors } = useForm({
        shipping: '',
    });

    const totalAmount = Number(total);
    const hasEnoughCredits = creditBalance >= totalAmount;

    const submit = (e: React.SubmitEvent) => {
        e.preventDefault();

        post('/checkout');
    };

    return (
        <section className="mx-auto w-full max-w-[1040px] px-8 py-12">
            <div className="mb-10">
                <h1 className="text-[36px] font-semibold tracking-[-0.03em] text-[var(--color-ink)]">
                    {__('Checkout')}
                </h1>

                <div className="mt-2 flex items-center gap-4">
                    <p className="text-[15px] text-[var(--color-ink-mid)]">
                        {__('Complete your order')}
                    </p>

                    <Link
                        href="/cart"
                        className="text-[13px] text-[var(--color-ink-mid)] underline underline-offset-4 hover:text-[var(--color-ink)]"
                    >
                        {__('Back to cart')}
                    </Link>
                </div>
            </div>

            <div className="grid gap-10 md:grid-cols-[1fr_300px]">
                <form onSubmit={submit}>
                    <div className="mb-8">
                        <h2 className="mb-5 text-[18px] font-medium text-[var(--color-ink)]">
                            {__('Shipping address')}
                        </h2>

                        <textarea
                            value={data.shipping}
                            onChange={(e) => setData('shipping', e.target.value)}
                            placeholder={__('Enter some address, e.g. Bikini Bottom, Conch Street 124')}
                            rows={4}
                            className="w-full resize-none rounded-[4px] border border-[var(--color-rule)] bg-[var(--color-white)] px-4 py-3 text-[14px] text-[var(--color-ink)] outline-none transition-colors placeholder:text-[var(--color-ink-mid)] focus:border-[var(--color-ink)]"
                        />

                        {errors.shipping && (
                            <p className="mt-2 text-[12px] text-red-600">
                                {errors.shipping}
                            </p>
                        )}
                    </div>

                    <Button
                        type="submit"
                        disabled={processing || !hasEnoughCredits}
                        className="w-full md:w-auto"
                    >
                        {processing
                            ? __('Placing order...')
                            : __('Place order')}
                    </Button>

                    {!hasEnoughCredits && (
                        <p className="mt-3 text-[13px] text-red-600">
                            {__('You do not have enough credits to place this order.')}
                        </p>
                    )}
                </form>

                <aside className="h-fit rounded-[4px] bg-[var(--color-sage-light)] p-6">
                    <h2 className="mb-6 text-[18px] font-medium text-[var(--color-ink)]">
                        {__('Order summary')}
                    </h2>

                    <div className="mb-5 space-y-4">
                        {cart.items.map((item) => (
                            <div
                                key={item.id}
                                className="flex justify-between gap-4 text-[13px]"
                            >
                                <div className="text-[var(--color-ink-mid)]">
                                    {__(item.product.name)}
                                    <span className="ml-1">
                                        × {item.quantity}
                                    </span>
                                </div>

                                <div className="shrink-0 text-[var(--color-ink)]">
                                    {(
                                        Number(item.product.price) *
                                        item.quantity
                                    ).toFixed(2)}{' '}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="border-t border-[var(--color-rule)] pt-4">
                        <div className="mb-3 flex justify-between text-[14px] text-[var(--color-ink-mid)]">
                            <span>{__('Your balance')}</span>
                            <span>{Number(creditBalance).toFixed(2)}</span>
                        </div>

                        <div className="flex justify-between text-[16px] font-medium text-[var(--color-ink)]">
                            <span>{__('Total')}</span>
                            <span>{total}</span>
                        </div>
                    </div>
                </aside>
            </div>
        </section>
    );
}
