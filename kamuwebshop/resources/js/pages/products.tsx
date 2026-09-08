import { useState } from 'react';
import { ProductCard } from '@/components/ui/product-card';

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

interface ProductsProps {
    products: Product[];
    categories: Category[];
}

export default function Products({
    products,
    categories,
}: ProductsProps) {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sort, setSort] = useState('default');

    const filteredProducts = products
        .filter((product) => {
            if (selectedCategory === 'all') {
                return true;
            }

            return product.category.slug === selectedCategory;
        })
        .sort((a, b) => {
            if (sort === 'price-asc') {
                return Number(a.price) - Number(b.price);
            }

            if (sort === 'price-desc') {
                return Number(b.price) - Number(a.price);
            }

            return 0;
        });

    return (
        <section className="py-10">
            <div className="mx-auto max-w-[1040px]">

                <div className="mb-8">
                    <h1 className="text-[36px] font-semibold tracking-[-0.02em] text-[var(--color-ink)]">
                        Shop
                    </h1>
                </div>

                <div className="mb-8 flex flex-col gap-4 border-b border-[var(--color-rule)] pb-6 sm:flex-row sm:items-end sm:justify-between">

                    <div>
                        <label
                            htmlFor="category"
                            className="mb-2 block text-[12px] font-medium text-[var(--color-ink-mid)]"
                        >
                            Category
                        </label>

                        <select
                            id="category"
                            value={selectedCategory}
                            onChange={(e) =>
                                setSelectedCategory(e.target.value)
                            }
                            className="rounded-[3px] border-[1.5px] border-[var(--color-rule)] bg-[var(--color-white)] px-3 py-2 text-[14px] text-[var(--color-ink)] outline-none focus:border-[var(--color-ink)]"
                        >
                            <option value="all">All categories</option>

                            {categories.map((category) => (
                                <option
                                    key={category.id}
                                    value={category.slug}
                                >
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label
                            htmlFor="sort"
                            className="mb-2 block text-[12px] font-medium text-[var(--color-ink-mid)]"
                        >
                            Sort
                        </label>

                        <select
                            id="sort"
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                            className="rounded-[3px] border-[1.5px] border-[var(--color-rule)] bg-[var(--color-white)] px-3 py-2 text-[14px] text-[var(--color-ink)] outline-none focus:border-[var(--color-ink)]"
                        >
                            <option value="default">Default</option>
                            <option value="price-asc">Price: Low to High</option>
                            <option value="price-desc">Price: High to Low</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            slug={product.slug}
                            category={product.category.name}
                            name={product.name}
                            price={`${product.price} €`}
                            image={product.image}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
}
