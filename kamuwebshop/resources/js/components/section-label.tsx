import type { ReactNode } from 'react';

type Props = {
    children: ReactNode;
};

export function SectionLabel({ children }: Props) {
    return (
        <div className="mb-8 border-b border-rule pb-3">
            <h2 className="text-[20px] font-semibold tracking-[-0.01em] text-ink">
                {children}
            </h2>
        </div>
    );
}
