import { Link, router } from '@inertiajs/react';

import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ui/product-card';
import { SectionLabel } from '@/components/section-label';
import { useTranslations } from '@/hooks/useTranslation';

interface Product {
    id: number;
    slug: string;
    category: {
        id: number;
        name: string;
    };
    name: string;
    price: string;
    description: string;
    image?: string;
    stock: number;
}

interface ProductPageProps {
    product: Product;
    relatedProducts: Product[];
}

export default function ProductPage({
    product,
    relatedProducts,
}: ProductPageProps) {
    const { __ } = useTranslations();

    const addToCart = () => {
        router.post(`/cart/add/${product.slug}`);
    };

    return (
        <section className="mx-auto w-full max-w-[1040px] px-8 py-10">
            <div className="mb-8 text-[13px] text-[var(--color-ink-mid)]">
                <Link
                    href="/products"
                    className="hover:text-[var(--color-ink)]"
                >
                    {__('Products')}
                </Link>

                <span className="mx-2">/</span>

                <span className="text-[var(--color-ink)]">
                    {__(product.category.name)}
                </span>
            </div>

            <div className="mb-10 border-t border-[var(--color-rule)]" />

            <div className="grid gap-10 md:grid-cols-2 md:items-start">
                <div className="overflow-hidden rounded-[4px] bg-[var(--color-sage-light)]">
                    {product.image ? (
                        <img
                            src={product.image?.startsWith('/') ? product.image : `/${product.image}`}
                            alt={product.name}
                            className="aspect-square h-full w-full object-cover"
                        />
                    ) : (
                        <div className="flex aspect-square items-center justify-center text-[11px] font-medium tracking-[0.08em] text-[var(--color-sage)]">
                            PRODUCT IMAGE
                        </div>
                    )}
                </div>

                <div className="flex flex-col">
                    <div className="text-[11px] font-medium tracking-[0.08em] text-[var(--color-sage)]">
                        {__(product.category.name)}
                    </div>

                    <h1 className="mt-2 text-[36px] font-semibold tracking-[-0.03em] text-[var(--color-ink)]">
                        {__(product.name)}
                    </h1>

                    <div className="mt-4 text-[16px] text-[var(--color-ink-mid)]">
                        {product.price}
                    </div>

                    <p className="mt-7 text-[15px] leading-7 text-[var(--color-ink-mid)]">
                        {product.description}
                    </p>

                    <div className="mt-8">
                        <Button
                            type="button"
                            onClick={addToCart}
                            disabled={product.stock <= 0}
                        >
                            {product.stock > 0
                                ? __('Add to cart')
                                : __('Out of stock')}
                        </Button>
                    </div>
                </div>
            </div>

            {relatedProducts.length > 0 && (
                <section className="mt-20 border-t border-[var(--color-rule)] pt-10">
                    <SectionLabel>
                        {__('This might be interesting for you')}
                    </SectionLabel>

                    <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {relatedProducts.map((relatedProduct) => (
                            <ProductCard
                                key={relatedProduct.id}
                                slug={relatedProduct.slug}
                                category={relatedProduct.category.name}
                                name={relatedProduct.name}
                                price={`${relatedProduct.price}`}
                                image={relatedProduct.image}
                                showCartButton={false}
                            />
                        ))}
                    </div>
                </section>
            )}
        </section>
    );
}
