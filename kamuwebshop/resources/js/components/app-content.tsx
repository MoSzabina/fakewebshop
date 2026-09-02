import * as React from 'react';

type Props = React.ComponentProps<'main'>;

export function AppContent({ children, ...props }: Props) {
    return (
        <main
            className="mx-auto flex w-full max-w-[1040px] flex-1 flex-col px-8"
            {...props}
        >
            {children}
        </main>
    );
}
