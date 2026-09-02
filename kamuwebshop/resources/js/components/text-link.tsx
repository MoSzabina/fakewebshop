import { Link } from '@inertiajs/react'
import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

type Props = ComponentProps<typeof Link> & {
    variant?: 'default' | 'sage' | 'bold' | 'muted' | 'arrow'
}

export default function TextLink({
    className = '',
    children,
    variant = 'default',
    ...props
}: Props) {
    return (
        <Link
            className={cn(
                'transition-colors duration-150',

                variant === 'default' && [
                    'text-[15px]',
                    'text-[var(--color-ink)]',
                    'underline',
                    'underline-offset-[3px]',
                    'decoration-[1px]',
                ],

                variant === 'sage' && [
                    'text-[15px]',
                    'text-[var(--color-sage)]',
                    'underline',
                    'underline-offset-[3px]',
                    'decoration-[1px]',
                ],

                variant === 'bold' && [
                    'text-[14px]',
                    'font-medium',
                    'text-[var(--color-ink)]',
                    'no-underline',
                    'border-b-[1.5px]',
                    'border-[var(--color-ink)]',
                    'pb-[1px]',
                ],

                variant === 'muted' && [
                    'text-[14px]',
                    'text-[var(--color-ink-mid)]',
                    'no-underline',
                    'border-b',
                    'border-dotted',
                    'border-[var(--color-rule)]',
                ],

                variant === 'arrow' && [
                    'inline-flex',
                    'items-center',
                    'gap-[5px]',
                    'text-[13px]',
                    'font-medium',
                    'text-[var(--color-ink)]',
                    'no-underline',
                ],

                className,
            )}
            {...props}
        >
            {children}

            {variant === 'arrow' && (
                <span className="text-[15px]">→</span>
            )}
        </Link>
    )
}
