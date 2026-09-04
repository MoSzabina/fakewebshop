import type { ReactNode } from 'react';

type Props = {
    children: ReactNode;
};

export function SectionLabel({ children }: Props) {
    return (
        <div className="mb-8 border-b border-[var(--color-rule)] pb-3">
            <h2 className="text-[20px] font-semibold tracking-[-0.01em] text-[var(--color-ink)]">
                {children}
            </h2>
        </div>
    );
}
