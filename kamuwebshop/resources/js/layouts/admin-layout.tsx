import { Link } from '@inertiajs/react'
import {
    ClipboardList,
    LayoutDashboard,
    LogOut,
    Package,
    Users,
} from 'lucide-react'
import type { ReactNode } from 'react'

interface AdminLayoutProps {
    children: ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
    const currentPath = window.location.pathname

    return (
        <div className="grid min-h-screen grid-cols-[224px_1fr]">
            <aside className="flex flex-col border-r border-[var(--color-rule)] bg-[var(--color-parchment)]">
                <div className="p-6">
                    <div className="text-lg font-semibold">
                        fakewebshop
                    </div>

                    <div className="text-[10px] uppercase tracking-widest text-[var(--color-ink-mid)]">
                        Admin
                    </div>
                </div>

                <nav className="px-3">
                    <Link
                        href="/admin"
                        className={currentPath === '/admin'
                            ? 'flex items-center gap-3 rounded bg-[var(--color-sage-light)] px-3 py-2 text-sm'
                            : 'flex items-center gap-3 rounded px-3 py-2 text-sm text-[var(--color-ink-mid)]'}
                    >
                        <LayoutDashboard size={16} />
                        Overview
                    </Link>

                    <Link
                        href="/admin/products"
                        className={currentPath === '/admin/products'
                            ? 'flex items-center gap-3 rounded bg-[var(--color-sage-light)] px-3 py-2 text-sm'
                            : 'flex items-center gap-3 rounded px-3 py-2 text-sm text-[var(--color-ink-mid)]'}
                    >
                        <Package size={16} />
                        Products
                    </Link>

                    <Link
                        href="/admin/users"
                        className={currentPath === '/admin/users'
                            ? 'flex items-center gap-3 rounded bg-[var(--color-sage-light)] px-3 py-2 text-sm'
                            : 'flex items-center gap-3 rounded px-3 py-2 text-sm text-[var(--color-ink-mid)]'}
                    >
                        <Users size={16} />
                        Users
                    </Link>

                    <Link
                        href="/admin/orders"
                        className={currentPath === '/admin/orders'
                            ? 'flex items-center gap-3 rounded bg-[var(--color-sage-light)] px-3 py-2 text-sm'
                            : 'flex items-center gap-3 rounded px-3 py-2 text-sm text-[var(--color-ink-mid)]'}
                    >
                        <ClipboardList size={16} />
                        Orders
                    </Link>

                    <Link
                        href="/logout"
                        method="post"
                        as="button"
                        aria-label="Logout"
                        className="flex cursor-pointer items-center gap-3 rounded px-3 py-2 text-sm text-[var(--color-ink-mid)]"
                    >
                        <LogOut size={16} />
                        Logout
                    </Link>
                </nav>

            </aside>

            <main className="min-w-0 p-8">
                {children}
            </main>
        </div>
    )
}
