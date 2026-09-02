import { AppHeader } from '@/components/app-header';
import { Footer } from '@/components/footer';
import { AppShell } from '@/components/app-shell';
import type { AuthLayoutProps } from '@/types';

export default function AuthSimpleLayout({
    children,
}: AuthLayoutProps) {
    return (
        <AppShell>
            <AppHeader />

            <main className="mx-auto flex w-full max-w-[1040px] flex-1 flex-col px-8 py-16">
                {children}
            </main>

            <Footer />
        </AppShell>
    );
}
