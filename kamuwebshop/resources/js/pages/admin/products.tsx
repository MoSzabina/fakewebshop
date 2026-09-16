import { Link, Form } from '@inertiajs/react';
import { Plus, Search } from 'lucide-react'
import { Pencil, Trash2 } from 'lucide-react'
import { useState } from 'react'
import type { ReactNode} from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import AdminLayout from '@/layouts/admin-layout'

interface Product {
    id: number
    name: string
    price: string
    stock: number
    category?: {
        name: string
    }
}

interface ProductsProps {
    products: Product[]
}

export default function Products({ products }: ProductsProps) {
    const [search, setSearch] = useState('')

    const filteredProducts = products.filter((product) => {
        const searchTerm = search.toLowerCase()

        return (
            product.name.toLowerCase().includes(searchTerm) ||
            product.category?.name.toLowerCase().includes(searchTerm)
        )
    })

    return (
        <AdminLayout>

            <h1>Products</h1>

            <p>
                {products.length} products
            </p>

            <div className="mb-5 flex items-center justify-between gap-4">
                <div className="relative w-full max-w-sm">
                    <Search
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-mid"
                    />

                    <input
                        type="text"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Search products..."
                        className="h-10 w-full rounded border border-rule bg-white pl-9 pr-3 text-[13px] text-ink outline-none placeholder:text-ink-mid focus:border-sage"
                    />
                </div>

                <Button asChild>
                    <Link href="/admin/products/create">
                        Add Product
                        <Plus size={16} />
                    </Link>
                </Button>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-[700px]">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th className="text-right">Price</th>
                            <th className="text-right">Stock</th>
                            <th className="text-right">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredProducts.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="text-center">
                                    No products found.
                                </td>
                            </tr>
                        ) : (
                            filteredProducts.map((product) => (
                                <tr key={product.id}>
                                    <td>#{product.id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.category?.name ?? '—'}</td>
                                    <td className="text-right">
                                        €{Number(product.price).toFixed(2)}
                                    </td>
                                    <td className="text-right">{product.stock}</td>
                                    <td>
                                        <div className="flex gap-2">
                                            <Button
                                                asChild
                                                variant="secondary"
                                                size="icon"
                                                title="Edit product"
                                            >
                                                <Link href={`/admin/products/${product.id}/edit`}>
                                                    <Pencil size={16} />
                                                </Link>
                                            </Button>
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button
                                                        type="button"
                                                        variant="muted"
                                                        size="icon"
                                                        title="Delete product"
                                                    >
                                                        <Trash2 size={16} />
                                                    </Button>
                                                </DialogTrigger>

                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>Are you sure?</DialogTitle>
                                                        <DialogDescription>
                                                            This action cannot be undone.
                                                        </DialogDescription>
                                                    </DialogHeader>

                                                    <DialogFooter>
                                                        <DialogClose asChild>
                                                            <Button variant="outline">
                                                                Cancel
                                                            </Button>
                                                        </DialogClose>

                                                        <Form
                                                            action={`/admin/products/${product.id}`}
                                                            method="delete"
                                                        >
                                                            <Button type="submit">
                                                                Delete
                                                            </Button>
                                                        </Form>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    )
}

Products.layout = (page: ReactNode) => page
