import { Form } from '@inertiajs/react'
import { Eye, Save, Search } from 'lucide-react'
import { useState  } from 'react'
import type {ReactNode} from 'react';
import { Button } from '@/components/ui/button'
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
import { Input } from '@/components/ui/input'
import AdminLayout from '@/layouts/admin-layout'

interface OrderItem {
    id: number
    quantity: number
    unitprice: string
    product: {
        name: string
    }
}

interface User {
    id: number
    username: string
    email: string
}

interface Order {
    id: number
    user_id: number
    status: string
    total_price: string
    shipping: string
    created_at: string
    user: User
    items: OrderItem[]
}

interface OrdersProps {
    orders: Order[]
    selectedUser: number | null
}

const statuses = [
    'pending',
    'processing',
    'completed',
    'cancelled',
]

export default function Orders({
    orders,
    selectedUser,
}: OrdersProps) {
    const [search, setSearch] = useState('')

    const filteredOrders = orders.filter((order) =>
        String(order.id).includes(search)
    )

    return (
        <AdminLayout>

            <h1>Orders</h1>

            <p>
                {selectedUser
                    ? `${orders.length} orders for selected user`
                    : `${orders.length} orders`}
            </p>

            <div className="relative mb-5 w-full max-w-sm">
                <Search
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-ink-mid)]"
                />
                <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search orders..."
                    className="pl-9"
                />
            </div>

            <div className="overflow-x-auto">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Customer</th>
                            <th>Items</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredOrders.length === 0 ? (
                            <tr>
                                <td colSpan={7}>
                                    No orders found.
                                </td>
                            </tr>
                        ) : (
                            filteredOrders.map((order) => (
                                <tr key={order.id}>
                                    <td>#{order.id}</td>

                                    <td>
                                        {order.user.username}
                                    </td>

                                    <td>
                                        {order.items.reduce(
                                            (total, item) =>
                                                total + item.quantity,
                                            0
                                        )}
                                    </td>

                                    <td>
                                        €{Number(order.total_price).toFixed(2)}
                                    </td>

                                    <td>
                                        {order.status}
                                    </td>

                                    <td>
                                        {new Date(
                                            order.created_at
                                        ).toLocaleDateString()}
                                    </td>

                                    <td>
                                        <div className="flex items-center gap-2">
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button
                                                        type="button"
                                                        variant="secondary"
                                                    >
                                                        <Eye size={16} />
                                                        View details
                                                    </Button>
                                                </DialogTrigger>

                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>
                                                            Order #{order.id}
                                                        </DialogTitle>

                                                        <DialogDescription>
                                                            {order.user.username}
                                                            {' · '}
                                                            {order.user.email}
                                                        </DialogDescription>
                                                    </DialogHeader>

                                                    <div>
                                                        <p>
                                                            Shipping: {order.shipping}
                                                        </p>

                                                        {order.items.map(
                                                            (item) => (
                                                                <div
                                                                    key={item.id}
                                                                >
                                                                    {item.product.name}
                                                                    {' × '}
                                                                    {item.quantity}
                                                                    {' — €'}
                                                                    {Number(
                                                                        item.unitprice
                                                                    ).toFixed(2)}
                                                                </div>
                                                            )
                                                        )}

                                                        <p>
                                                            Total:
                                                            {Number(
                                                                order.total_price
                                                            ).toFixed(2)}
                                                        </p>
                                                    </div>

                                                    <DialogFooter>
                                                        <DialogClose asChild>
                                                            <Button variant="outline">
                                                                Close
                                                            </Button>
                                                        </DialogClose>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>

                                            <Form
                                                action={`/admin/orders/${order.id}/status`}
                                                method="patch"
                                            >
                                                {({ processing }) => (
                                                    <div className="flex items-center gap-2">
                                                        <select
                                                            name="status"
                                                            defaultValue={order.status}
                                                        >
                                                            {statuses.map(
                                                                (status) => (
                                                                    <option
                                                                        key={status}
                                                                        value={status}
                                                                    >
                                                                        {status
                                                                            .charAt(0)
                                                                            .toUpperCase() +
                                                                            status.slice(
                                                                                1
                                                                            )}
                                                                    </option>
                                                                )
                                                            )}
                                                        </select>

                                                        <Button
                                                            type="submit"
                                                            variant="secondary"
                                                            size="icon"
                                                            title="Save status"
                                                            disabled={
                                                                processing
                                                            }
                                                        >
                                                            <Save size={16} />
                                                        </Button>
                                                    </div>
                                                )}
                                            </Form>
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

Orders.layout = (page: ReactNode) => page
