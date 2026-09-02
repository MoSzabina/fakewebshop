import { Link } from '@inertiajs/react';
import type { BreadcrumbItem as BreadcrumbItemType } from '@/types';

export function Breadcrumbs({
    breadcrumbs,
}: {
    breadcrumbs: BreadcrumbItemType[];
}) {
    if (breadcrumbs.length === 0) {
        return null;
    }

    return (
        <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-sm"
        >
            {breadcrumbs.map((item, index) => {
                const isLast = index === breadcrumbs.length - 1;

                return (
                    <div key={index} className="flex items-center gap-2">
                        {isLast ? (
                            <span className="text-[#1C1917]">
                                {item.title}
                            </span>
                        ) : (
                            <>
                                <Link
                                    href={item.href}
                                    className="text-[#6B6460] transition-colors hover:text-[#1C1917]"
                                >
                                    {item.title}
                                </Link>
                                <span className="text-[#6B6460]">/</span>
                            </>
                        )}
                    </div>
                );
            })}
        </nav>
    );
}
