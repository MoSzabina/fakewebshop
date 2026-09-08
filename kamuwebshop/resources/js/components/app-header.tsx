import { Link, router, usePage } from '@inertiajs/react';
import { LogOut, Menu, ShoppingBag, User, X } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { useTranslations } from '@/hooks/useTranslation';
import type { SharedData } from '@/types';

export function AppHeader() {
    const { auth, locale } = usePage<SharedData>().props;
    const { __ } = useTranslations();

    const [menuOpen, setMenuOpen] = useState(false);

    const isLoggedIn = !!auth.user;
    const isAdmin = !!auth.user?.is_admin;

    const handleLanguageChange = (newLocale: 'en' | 'hu') => {
        if (newLocale === locale) return;

        router.post(
            '/locale',
            { locale: newLocale },
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    const closeMenu = () => setMenuOpen(false);

    return (
        <header className="sticky top-0 z-50 border-b border-[#DDD8D0] bg-[rgba(250,248,245,0.92)] backdrop-blur-[10px]">
            <div className="mx-auto flex min-h-[54px] w-full max-w-[1040px] items-center px-8">

                {/* Logo */}
                {!isAdmin && (
                    <Link
                        href="/"
                        className="text-lg font-medium tracking-wide text-[#1C1917]"
                    >
                        fakewebshop
                    </Link>
                )}

                {/* Desktop navigation */}
                <nav className="ml-12 hidden items-center gap-8 md:flex">
                    <Link
                        href="/products"
                        className="text-[13px] text-[#6B6460] transition-colors hover:text-[#1C1917]"
                    >
                        {__('Products')}
                    </Link>

                    {isLoggedIn && !isAdmin && (
                        <Link
                            href="/credits"
                            className="text-[13px] text-[#6B6460] transition-colors hover:text-[#1C1917]"
                        >
                            {__('Credits')}
                        </Link>
                    )}

                    {isAdmin && (
                        <Link
                            href="/dashboard"
                            className="text-[13px] text-[#6B6460] transition-colors hover:text-[#1C1917]"
                        >
                            {__('Dashboard')}
                        </Link>
                    )}
                </nav>

                {/* Desktop actions */}
                <div className="ml-auto hidden items-center gap-1 md:flex">

                    {/* Language switcher */}
                    <div className="mr-5 flex items-center gap-1 text-[11px] font-medium tracking-[0.08em]">
                        <button
                            type="button"
                            onClick={() => handleLanguageChange('en')}
                            className={`px-1 py-0.5 transition-colors ${
                                locale === 'en'
                                    ? 'text-[#1C1917]'
                                    : 'text-[#A8A29E] hover:text-[#6B6460]'
                            }`}
                        >
                            EN
                        </button>

                        <span className="text-[#DDD8D0]">/</span>

                        <button
                            type="button"
                            onClick={() => handleLanguageChange('hu')}
                            className={`px-1 py-0.5 transition-colors ${
                                locale === 'hu'
                                    ? 'text-[#1C1917]'
                                    : 'text-[#A8A29E] hover:text-[#6B6460]'
                            }`}
                        >
                            HU
                        </button>
                    </div>

                    {!isLoggedIn ? (
                        <>
                            <Link
                                href="/auth"
                                className="mr-6 text-[13px] text-[#6B6460] transition-colors hover:text-[#1C1917]"
                            >
                                {__('Login')}
                            </Link>

                            <Button variant="muted" size="icon" asChild>
                                <Link
                                    href="/cart"
                                    aria-label={__('Cart')}
                                >
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
                                aria-label={__('Logout')}
                            >
                                <LogOut />
                            </Link>
                        </Button>
                    ) : (
                        <>
                            <Button variant="muted" size="icon" asChild>
                                <Link
                                    href="/profile"
                                    aria-label={__('Profile')}
                                >
                                    <User />
                                </Link>
                            </Button>

                            <Button variant="muted" size="icon" asChild>
                                <Link
                                    href="/cart"
                                    aria-label={__('Cart')}
                                >
                                    <ShoppingBag />
                                </Link>
                            </Button>

                            <Button variant="muted" size="icon" asChild>
                                <Link
                                    href="/logout"
                                    method="post"
                                    as="button"
                                    aria-label={__('Logout')}
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
                    aria-label={menuOpen ? __('Close menu') : __('Menu')}
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
                            onClick={closeMenu}
                            className="text-sm text-[#6B6460] hover:text-[#1C1917]"
                        >
                            {__('Products')}
                        </Link>

                        {isLoggedIn && !isAdmin && (
                            <Link
                                href="/credits"
                                onClick={closeMenu}
                                className="text-sm text-[#6B6460] hover:text-[#1C1917]"
                            >
                                {__('Credits')}
                            </Link>
                        )}

                        {isAdmin ? (
                            <>
                                <Link
                                    href="/dashboard"
                                    onClick={closeMenu}
                                    className="text-sm text-[#6B6460] hover:text-[#1C1917]"
                                >
                                    {__('Dashboard')}
                                </Link>

                                <Link
                                    href="/logout"
                                    method="post"
                                    as="button"
                                    onClick={closeMenu}
                                    className="text-left text-sm text-[#6B6460] hover:text-[#1C1917]"
                                >
                                    {__('Logout')}
                                </Link>
                            </>
                        ) : isLoggedIn ? (
                            <>
                                <Link
                                    href="/profile"
                                    onClick={closeMenu}
                                    className="text-sm text-[#6B6460] hover:text-[#1C1917]"
                                >
                                    {__('Profile')}
                                </Link>

                                <Link
                                    href="/cart"
                                    onClick={closeMenu}
                                    className="text-sm text-[#6B6460] hover:text-[#1C1917]"
                                >
                                    {__('Cart')}
                                </Link>

                                <Link
                                    href="/logout"
                                    method="post"
                                    as="button"
                                    onClick={closeMenu}
                                    className="text-left text-sm text-[#6B6460] hover:text-[#1C1917]"
                                >
                                    {__('Logout')}
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/auth"
                                    onClick={closeMenu}
                                    className="text-sm text-[#6B6460] hover:text-[#1C1917]"
                                >
                                    {__('Login')}
                                </Link>

                                <Link
                                    href="/cart"
                                    onClick={closeMenu}
                                    className="text-sm text-[#6B6460] hover:text-[#1C1917]"
                                >
                                    {__('Cart')}
                                </Link>
                            </>
                        )}

                        {/* Mobile language switcher */}
                        <div className="mt-1 flex items-center gap-1 border-t border-[#DDD8D0] pt-4 text-[11px] font-medium tracking-[0.08em]">
                            <button
                                type="button"
                                onClick={() => handleLanguageChange('en')}
                                className={`px-1 py-0.5 transition-colors ${
                                    locale === 'en'
                                        ? 'text-[#1C1917]'
                                        : 'text-[#A8A29E] hover:text-[#6B6460]'
                                }`}
                            >
                                EN
                            </button>

                            <span className="text-[#DDD8D0]">/</span>

                            <button
                                type="button"
                                onClick={() => handleLanguageChange('hu')}
                                className={`px-1 py-0.5 transition-colors ${
                                    locale === 'hu'
                                        ? 'text-[#1C1917]'
                                        : 'text-[#A8A29E] hover:text-[#6B6460]'
                                }`}
                            >
                                HU
                            </button>
                        </div>
                    </div>
                </nav>
            )}
        </header>
    );
}
