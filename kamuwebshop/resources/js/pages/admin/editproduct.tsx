import { Form, Head } from '@inertiajs/react'
import type { ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import AdminLayout from '@/layouts/admin-layout'

interface Category {
    id: number
    name: string
}

interface Product {
    id: number
    category_id: number
    name: string
    price: string
    stock: number
    description: string | null
    image: string | null
}

interface EditProductProps {
    product: Product
    categories: Category[]
}

export default function EditProduct({
    product,
    categories,
}: EditProductProps) {
    return (
        <AdminLayout>
            <Head title="Edit Product" />

            <div className="p-8 rounded-md bg-[var(--color-sage)]">
                <h1>Edit Product</h1>

                <Form
                    action={`/admin/products/${product.id}`}
                    method="patch"
                    encType="multipart/form-data"
                    className="mt-8 max-w-2xl"
                >
                    {({ errors, processing }) => (
                        <>
                            <div>
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    type="text"
                                    defaultValue={product.name}
                                />
                                {errors.name && <p>{errors.name}</p>}
                            </div>

                            <div>
                                <Label htmlFor="category_id">Category</Label>

                                <select className="rounded-[3px] border-[1.5px] border-[var(--color-rule)] bg-[var(--color-white)] px-3 py-2 text-[14px] text-[var(--color-ink)] outline-none focus:border-[var(--color-ink)]"
                                    id="category_id"
                                    name="category_id"
                                    defaultValue={product.category_id}
                                >
                                    {categories.map((category) => (
                                        <option
                                            key={category.id}
                                            value={category.id}
                                        >
                                            {category.name}
                                        </option>
                                    ))}
                                </select>

                                {errors.category_id && (
                                    <p>{errors.category_id}</p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="price">Price</Label>
                                <Input
                                    id="price"
                                    name="price"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    defaultValue={product.price}
                                />
                                {errors.price && <p>{errors.price}</p>}
                            </div>

                            <div>
                                <Label htmlFor="stock">Stock</Label>
                                <Input
                                    id="stock"
                                    name="stock"
                                    type="number"
                                    min="0"
                                    defaultValue={product.stock}
                                />
                                {errors.stock && <p>{errors.stock}</p>}
                            </div>

                            <div>
                                <Label htmlFor="description">
                                    Description
                                </Label>

                                <textarea
                                    id="description"
                                    className="w-full resize-none rounded-[4px] border border-[var(--color-rule)] bg-[var(--color-white)] px-4 py-3 text-[14px] text-[var(--color-ink)] outline-none transition-colors placeholder:text-[var(--color-ink-mid)] focus:border-[var(--color-ink)]"
                                    name="description"
                                    defaultValue={product.description ?? ''}
                                />

                                {errors.description && (
                                    <p>{errors.description}</p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="image">Image</Label>

                                <Input
                                    id="image"
                                    name="image"
                                    type="file"
                                    accept="image/*"
                                />

                                {errors.image && <p>{errors.image}</p>}
                            </div>

                            <Button
                                type="submit"
                                disabled={processing}
                            >
                                {processing
                                    ? 'Saving...'
                                    : 'Save Changes'}
                            </Button>
                        </>
                    )}
                </Form>
            </div>
        </AdminLayout>
    )
}

EditProduct.layout = (page: ReactNode) => page
