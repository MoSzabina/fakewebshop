import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export default function InputError({
    message,
    className = '',
    ...props
}: HTMLAttributes<HTMLParagraphElement> & { message?: string }) {
    return message ? (
        <p
            {...props}
            className={cn(
                'mt-[5px] text-[12px] text-[#B91C1C]',
                className,
            )}
        >
            {message}
        </p>
    ) : null
}
