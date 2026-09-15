import { Link, router, usePage } from '@inertiajs/react';
import { LogOut, Menu, ShoppingBag, User, X } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { useTranslations } from '@/hooks/useTranslation';
import type { SharedData } from '@/types';

export function AppHeader() {
    const { auth, locale, cartCount } = usePage<SharedData>().props;
    const { __ } = useTranslations();

    const [menuOpen, setMenuOpen] = useState(false);

    const isLoggedIn = !!auth.user;
    const isAdmin = !!auth.user?.is_admin;

    const [darkMode, setDarkMode] = useState(
        document.documentElement.classList.contains('dark')
    )

    const toggleDarkMode = () => {
        document.documentElement.classList.toggle('dark')
        setDarkMode(document.documentElement.classList.contains('dark'))
    }

    const handleLanguageChange = (newLocale: 'en' | 'hu') => {
        if (newLocale === locale) {
return;
}

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
        <header className="sticky top-0 z-50 border-b border-[[var(--color-rule)]] backdrop-blur-[10px]">
            <div className="mx-auto flex min-h-[54px] w-full max-w-[1040px] items-center px-8">

                <Link
                    href="/"
                    className="text-lg font-medium tracking-wide text-[[var(--color-ink)]]"
                >
                    fakewebshop
                </Link>

                {/* Desktop navigation */}
                <nav className="ml-12 hidden items-center gap-8 md:flex">
                    <Link
                        href="/products"
                        className="text-[13px] text-[[var(--color-ink-mid)]] transition-colors hover:text-[[var(--color-ink)]]"
                    >
                        {__('Products')}
                    </Link>

                    {isLoggedIn && !isAdmin && (
                        <Link
                            href="/credits"
                            className="text-[13px] text-[[var(--color-ink-mid)]] transition-colors hover:text-[[var(--color-ink)]]"
                        >
                            {__('Credits')}
                        </Link>
                    )}

                    {isAdmin && (
                        <Link
                            href="/admin"
                            className="text-[13px] text-[[var(--color-ink-mid)]] transition-colors hover:text-[[var(--color-ink)]]"
                        >
                            {__('Dashboard')}
                        </Link>
                    )}
                </nav>

                {/* Desktop actions */}
                <div className="ml-auto hidden items-center gap-1 md:flex">

                    <button
                        type="button"
                        onClick={toggleDarkMode}
                        aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                        className="relative flex h-7 w-12 cursor-pointer items-center rounded-full border border-[var(--color-rule)] bg-[var(--color-parchment)] p-1 transition-colors"
                    >
                        <span
                            className={`flex size-5 items-center justify-center rounded-full bg-[var(--color-white)] text-[11px] shadow-sm transition-transform ${darkMode ? 'translate-x-5' : 'translate-x-0'
                                }`}
                        >
                            {darkMode ? '☾' : '☀'}
                        </span>
                    </button>

                    <div className="mr-5 flex items-center gap-1 text-[11px] font-medium tracking-[0.08em]">
                        <button
                            type="button"
                            onClick={() => handleLanguageChange('en')}
                            className={`px-1 py-0.5 transition-colors ${locale === 'en'
                                ? 'text-[[var(--color-ink)]]'
                                : 'text-[#A8A29E] hover:text-[[var(--color-ink-mid)]]'
                                }`}
                        >
                            EN
                        </button>

                        <span className="text-[[var(--color-rule)]]">/</span>

                        <button
                            type="button"
                            onClick={() => handleLanguageChange('hu')}
                            className={`px-1 py-0.5 transition-colors ${locale === 'hu'
                                ? 'text-[[var(--color-ink)]]'
                                : 'text-[#A8A29E] hover:text-[[var(--color-ink-mid)]]'
                                }`}
                        >
                            HU
                        </button>
                    </div>

                    {!isLoggedIn ? (
                        <>
                            <Link
                                href="/auth"
                                className="mr-6 text-[13px] text-[[var(--color-ink-mid)]] transition-colors hover:text-[[var(--color-ink)]]"
                            >
                                {__('Login')}
                            </Link>

                            <Button variant="muted" size="icon" asChild>
                                <Link
                                    href="/cart"
                                    aria-label={__('Cart')}
                                    className="relative"
                                >
                                    <ShoppingBag />

                                    {cartCount > 0 && (
                                        <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-medium leading-none text-white">
                                            {cartCount}
                                        </span>
                                    )}
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
                                    className="relative"
                                >
                                    <ShoppingBag />

                                    {cartCount > 0 && (
                                        <span className="absolute -right-1 -top-1 flex min-w-4 h-4 items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-medium leading-none text-white">
                                            {cartCount}
                                        </span>
                                    )}
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
                    className="ml-auto flex items-center justify-center p-2 text-[[var(--color-ink-mid)]] md:hidden"
                    aria-label={menuOpen ? __('Close menu') : __('Menu')}
                >
                    {menuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {/* Mobile menu */}
            {menuOpen && (
                <nav className="border-t border-[[var(--color-rule)]] bg-[[var(--color-white)]] px-8 py-4 md:hidden">
                    <div className="flex flex-col gap-4">

                        <Link
                            href="/products"
                            onClick={closeMenu}
                            className="text-sm text-[[var(--color-ink-mid)]] hover:text-[[var(--color-ink)]]"
                        >
                            {__('Products')}
                        </Link>

                        {isLoggedIn && !isAdmin && (
                            <Link
                                href="/credits"
                                onClick={closeMenu}
                                className="text-sm text-[[var(--color-ink-mid)]] hover:text-[[var(--color-ink)]]"
                            >
                                {__('Credits')}
                            </Link>
                        )}

                        {isAdmin ? (
                            <>
                                <Link
                                    href="/dashboard"
                                    onClick={closeMenu}
                                    className="text-sm text-[[var(--color-ink-mid)]] hover:text-[[var(--color-ink)]]"
                                >
                                    {__('Dashboard')}
                                </Link>

                                <Link
                                    href="/logout"
                                    method="post"
                                    as="button"
                                    onClick={closeMenu}
                                    className="text-left text-sm text-[[var(--color-ink-mid)]] hover:text-[[var(--color-ink)]]"
                                >
                                    {__('Logout')}
                                </Link>
                            </>
                        ) : isLoggedIn ? (
                            <>
                                <Link
                                    href="/profile"
                                    onClick={closeMenu}
                                    className="text-sm text-[[var(--color-ink-mid)]] hover:text-[[var(--color-ink)]]"
                                >
                                    {__('Profile')}
                                </Link>

                                <Link
                                    href="/cart"
                                    onClick={closeMenu}
                                    className="text-sm text-[[var(--color-ink-mid)]] hover:text-[[var(--color-ink)]]"
                                >
                                    {__('Cart')}
                                </Link>

                                <Link
                                    href="/logout"
                                    method="post"
                                    as="button"
                                    onClick={closeMenu}
                                    className="text-left text-sm text-[[var(--color-ink-mid)]] hover:text-[[var(--color-ink)]]"
                                >
                                    {__('Logout')}
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/auth"
                                    onClick={closeMenu}
                                    className="text-sm text-[[var(--color-ink-mid)]] hover:text-[[var(--color-ink)]]"
                                >
                                    {__('Login')}
                                </Link>

                                <Link
                                    href="/cart"
                                    onClick={closeMenu}
                                    className="text-sm text-[[var(--color-ink-mid)]] hover:text-[[var(--color-ink)]]"
                                >
                                    {__('Cart')}
                                </Link>
                            </>
                        )}

                        <div className="mt-1 border-t border-[[var(--color-rule)]] pt-4 text-[11px] font-medium tracking-[0.08em]">

                            <div className="flex items-center">
                                <button
                                    type="button"
                                    onClick={toggleDarkMode}
                                    aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                                    className="relative flex h-7 w-12 cursor-pointer items-center rounded-full border border-[var(--color-rule)] bg-[var(--color-parchment)] p-1 transition-colors"
                                >
                                    <span
                                        className={`flex size-5 items-center justify-center rounded-full bg-[var(--color-white)] text-[11px] shadow-sm transition-transform ${darkMode ? 'translate-x-5' : 'translate-x-0'
                                            }`}
                                    >
                                        {darkMode ? '☾' : '☀'}
                                    </span>
                                </button>
                            </div>

                            <div className="mt-2 flex items-center gap-1">
                                <button
                                    type="button"
                                    onClick={() => handleLanguageChange('en')}
                                    className={`px-1 py-0.5 transition-colors ${locale === 'en'
                                            ? 'text-[[var(--color-ink)]]'
                                            : 'text-[#A8A29E] hover:text-[[var(--color-ink-mid)]]'
                                        }`}
                                >
                                    EN
                                </button>

                                <span className="text-[[var(--color-rule)]]">/</span>

                                <button
                                    type="button"
                                    onClick={() => handleLanguageChange('hu')}
                                    className={`px-1 py-0.5 transition-colors ${locale === 'hu'
                                            ? 'text-[[var(--color-ink)]]'
                                            : 'text-[#A8A29E] hover:text-[[var(--color-ink-mid)]]'
                                        }`}
                                >
                                    HU
                                </button>
                            </div>

                        </div>
                    </div>
                </nav>
            )}
        </header>
    );
}
