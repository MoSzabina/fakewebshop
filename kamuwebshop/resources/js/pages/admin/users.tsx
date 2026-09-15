import { Form, Link } from '@inertiajs/react'
import { Search, Trash2 } from 'lucide-react'
import type { ReactNode} from 'react';
import { useState } from 'react'

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

type User = {
    id: number
    username: string
    email: string
    credit_transactions_sum_amount: number
    created_at: string
    orders_count: number
}

type Props = {
    users: User[]
}

export default function Users({ users }: Props) {
    const [search, setSearch] = useState('')

    const filteredUsers = users.filter((user) =>
        `${user.username} ${user.email}`
            .toLowerCase()
            .includes(search.toLowerCase())
    )

    return (
        <AdminLayout>

            <h1>Users</h1>
            <p>
                Manage registered users and their credits.
            </p>

            <div className="relative mb-5 w-full max-w-sm">
                <Search
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-ink-mid)]"
                />
                <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search users..."
                    className="pl-9"
                />
            </div>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Credits</th>
                        <th>Registered</th>
                        <th>Orders</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {filteredUsers.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>
                                {user.credit_transactions_sum_amount ?? 0}
                            </td>
                            <td>
                                {new Date(user.created_at).toLocaleDateString()}
                            </td>
                            <td>{user.orders_count}</td>
                            <td>
                                <div className="flex gap-2">
                                    <Button asChild variant="secondary">
                                        <Link href={`/admin/orders?user=${user.id}`}>
                                            View Orders
                                        </Link>
                                    </Button>

                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button
                                                type="button"
                                                variant="secondary"
                                                title="Add credits">
                                                Add Credits
                                            </Button>
                                        </DialogTrigger>

                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Add credits</DialogTitle>
                                                <DialogDescription>
                                                    Add credits to {user.username}'s account.
                                                </DialogDescription>
                                            </DialogHeader>

                                            <Form
                                                action={`/admin/users/${user.id}/credits`}
                                                method="post"
                                            >
                                                <div className="py-4">
                                                    <p className="mb-2 text-sm">
                                                        Current balance:{' '}
                                                        <strong>
                                                            {user.credit_transactions_sum_amount ?? 0}
                                                        </strong>
                                                    </p>

                                                    <Input
                                                        name="amount"
                                                        type="number"
                                                        min="1"
                                                        placeholder="Amount"
                                                        required
                                                    />
                                                </div>

                                                <DialogFooter>
                                                    <DialogClose asChild>
                                                        <Button variant="outline">
                                                            Cancel
                                                        </Button>
                                                    </DialogClose>

                                                    <Button type="submit">
                                                        Add credits
                                                    </Button>
                                                </DialogFooter>
                                            </Form>
                                        </DialogContent>
                                    </Dialog>

                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button
                                                type="button"
                                                variant="muted"
                                                size="icon"
                                                title="Delete user"
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
                                                    action={`/admin/users/${user.id}`}
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
                    ))}
                </tbody>
            </table>
        </AdminLayout>
    )
}

Users.layout = (page: ReactNode) => page
