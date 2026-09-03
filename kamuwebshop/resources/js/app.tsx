import { createInertiaApp } from '@inertiajs/react';
import { Toaster } from '@/components/ui/sonner';
import AppHeaderLayout from '@/layouts/app/app-header-layout';

const appName = import.meta.env.VITE_APP_NAME || 'kamuwebshop';

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),

    layout: () => AppHeaderLayout,

    strictMode: true,

    withApp(app) {
        return (
            <>
                {app}
                <Toaster />
            </>
        );
    },

    progress: {
        color: '#6B7C65',
    },
});
