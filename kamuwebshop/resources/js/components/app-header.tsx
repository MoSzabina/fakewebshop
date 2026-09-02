import { Link, usePage } from '@inertiajs/react';
import { LogOut, ShoppingBag, User } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

const categories = [
    { label: 'Clothing', href: '/products/clothing' },
    { label: 'Feelings', href: '/products/feelings' },
    { label: 'Geek', href: '/products/geek' },
    { label: 'Pets', href: '/products/pets' },
    { label: 'Electronics', href: '/products/electronics' },
    { label: 'Luxury', href: '/products/luxury' },
];

export function AppHeader() {
    const { auth } = usePage().props as {
        auth: {
            user?: {
                id: number;
            };
        };
    };

    const isLoggedIn = !!auth?.user;

    return (
        <header className="sticky top-0 z-50 h-[54px] border-b border-[#DDD8D0] bg-[rgba(250,248,245,0.92)] backdrop-blur-[10px]">
            <div className="mx-auto flex h-full w-full max-w-[1040px] items-center justify-between px-8">

                {/* Logo + navigation */}
                <div className="flex items-center gap-8">
                    <Link
                        href="/"
                        className="text-lg font-medium tracking-wide text-[#1C1917]"
                    >
                        kamuwebshop
                    </Link>

                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>
                                    Termékek
                                </NavigationMenuTrigger>

                                <NavigationMenuContent>
                                    <div className="grid w-[220px] gap-1 p-2">
                                        {categories.map((category) => (
                                            <Link
                                                key={category.href}
                                                href={category.href}
                                                className="rounded-[4px] px-3 py-2 text-sm text-[#6B6460] hover:bg-[#EDE8DF] hover:text-[#1C1917]"
                                            >
                                                {category.label}
                                            </Link>
                                        ))}
                                    </div>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                {/* User actions */}
                <div className="flex items-center gap-1">
                    {!isLoggedIn ? (
                        <>
                            <Link
                                href="/login"
                                className="text-sm text-[#6B6460] hover:text-[#1C1917]"
                            >
                                Belépés
                            </Link>

                            <span className="text-sm text-[#DDD8D0]">/</span>

                            <Link
                                href="/register"
                                className="text-sm text-[#6B6460] hover:text-[#1C1917]"
                            >
                                Regisztráció
                            </Link>
                        </>
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

                    {!isLoggedIn && (
                        <Button variant="muted" size="icon" asChild>
                            <Link href="/cart" aria-label="Kosár">
                                <ShoppingBag />
                            </Link>
                        </Button>
                    )}
                </div>
            </div>
        </header>
    );
}
