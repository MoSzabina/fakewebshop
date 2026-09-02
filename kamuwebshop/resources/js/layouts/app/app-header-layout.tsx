import { AppHeader } from '@/components/app-header';
import { Footer } from '@/components/footer';
import { AppShell } from '@/components/app-shell';
import type { AppLayoutProps } from '@/types';

export default function AppHeaderLayout({
    children,
}: AppLayoutProps) {
    return (
        <AppShell>
            <AppHeader />

            <main className="mx-auto flex w-full max-w-[1040px] flex-1 flex-col px-8">
                {children}
            </main>

            <Footer />
        </AppShell>
    );
}
