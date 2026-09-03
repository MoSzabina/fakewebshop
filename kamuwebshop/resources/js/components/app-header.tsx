import { Link, usePage } from '@inertiajs/react';
import { LogOut, Menu, ShoppingBag, User, X } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';

export function AppHeader() {
    const { auth } = usePage().props as {
        auth: {
            user?: {
                id: number;
                is_admin?: boolean;
            };
        };
    };

    const isLoggedIn = !!auth?.user;
    const isAdmin = !!auth?.user?.is_admin;

    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 border-b border-[#DDD8D0] bg-[rgba(250,248,245,0.92)] backdrop-blur-[10px]">
            <div className="mx-auto flex min-h-[54px] w-full max-w-[1040px] items-center px-8">

                {/* Logo */}
                {!isAdmin && (
                    <Link
                        href="/"
                        className="text-lg font-medium tracking-wide text-[#1C1917]"
                    >
                        kamuwebshop
                    </Link>
                )}

                {/* Desktop navigation */}
                <nav className="ml-12 hidden items-center gap-8 md:flex">
                    <Link
                        href="/products"
                        className="text-[13px] text-[#6B6460] transition-colors hover:text-[#1C1917]"
                    >
                        Termékek
                    </Link>

                    {isAdmin && (
                        <Link
                            href="/dashboard"
                            className="text-[13px] text-[#6B6460] transition-colors hover:text-[#1C1917]"
                        >
                            Dashboard
                        </Link>
                    )}
                </nav>

                {/* Desktop user actions */}
                <div className="ml-auto hidden items-center gap-1 md:flex">
                    {!isLoggedIn ? (
                        <>
                            <Link
                                href="/auth"
                                className="mr-6 text-[13px] text-[#6B6460] transition-colors hover:text-[#1C1917]"
                            >
                                Belépés
                            </Link>

                            <Button variant="muted" size="icon" asChild>
                                <Link href="/cart" aria-label="Kosár">
                                    <ShoppingBag />
                                </Link>
                            </Button>
                        </>
                    ) : isAdmin ? (
                        <Button variant="muted" size="icon" asChild>
                            <Link
                                href="/logout"
                                method="post"
                                as="button"
                                aria-label="Kilépés"
                            >
                                <LogOut />
                            </Link>
                        </Button>
                    ) : (
                        <>
                            <Button variant="muted" size="icon" asChild>
                                <Link href="/profile" aria-label="Profil">
                                    <User />
                                </Link>
                            </Button>

                            <Button variant="muted" size="icon" asChild>
                                <Link href="/cart" aria-label="Kosár">
                                    <ShoppingBag />
                                </Link>
                            </Button>

                            <Button variant="muted" size="icon" asChild>
                                <Link
                                    href="/logout"
                                    method="post"
                                    as="button"
                                    aria-label="Kilépés"
                                >
                                    <LogOut />
                                </Link>
                            </Button>
                        </>
                    )}
                </div>

                {/* Mobile hamburger */}
                <button
                    type="button"
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="ml-auto flex items-center justify-center p-2 text-[#6B6460] md:hidden"
                    aria-label="Menü"
                >
                    {menuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {/* Mobile menu */}
            {menuOpen && (
                <nav className="border-t border-[#DDD8D0] bg-[#FAF8F5] px-8 py-4 md:hidden">
                    <div className="flex flex-col gap-4">
                        <Link
                            href="/products"
                            onClick={() => setMenuOpen(false)}
                            className="text-sm text-[#6B6460] hover:text-[#1C1917]"
                        >
                            Termékek
                        </Link>

                        {isAdmin ? (
                            <>
                                <Link
                                    href="/dashboard"
                                    onClick={() => setMenuOpen(false)}
                                    className="text-sm text-[#6B6460] hover:text-[#1C1917]"
                                >
                                    Dashboard
                                </Link>

                                <Link
                                    href="/logout"
                                    method="post"
                                    as="button"
                                    onClick={() => setMenuOpen(false)}
                                    className="text-left text-sm text-[#6B6460] hover:text-[#1C1917]"
                                >
                                    Kilépés
                                </Link>
                            </>
                        ) : isLoggedIn ? (
                            <>
                                <Link
                                    href="/profile"
                                    onClick={() => setMenuOpen(false)}
                                    className="text-sm text-[#6B6460] hover:text-[#1C1917]"
                                >
                                    Profil
                                </Link>

                                <Link
                                    href="/cart"
                                    onClick={() => setMenuOpen(false)}
                                    className="text-sm text-[#6B6460] hover:text-[#1C1917]"
                                >
                                    Kosár
                                </Link>

                                <Link
                                    href="/logout"
                                    method="post"
                                    as="button"
                                    onClick={() => setMenuOpen(false)}
                                    className="text-left text-sm text-[#6B6460] hover:text-[#1C1917]"
                                >
                                    Kilépés
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/auth"
                                    onClick={() => setMenuOpen(false)}
                                    className="text-sm text-[#6B6460] hover:text-[#1C1917]"
                                >
                                    Belépés
                                </Link>

                                <Link
                                    href="/cart"
                                    onClick={() => setMenuOpen(false)}
                                    className="text-sm text-[#6B6460] hover:text-[#1C1917]"
                                >
                                    Kosár
                                </Link>
                            </>
                        )}
                    </div>
                </nav>
            )}
        </header>
    );
}
