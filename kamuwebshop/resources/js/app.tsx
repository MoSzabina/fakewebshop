import { createInertiaApp } from '@inertiajs/react'
import { Toaster } from '@/components/ui/sonner'
import AppHeaderLayout from '@/layouts/app/app-header-layout'

const appName = import.meta.env.VITE_APP_NAME || 'kamuwebshop'

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),

    resolve: async (name) => {
        const pages = import.meta.glob('./pages/**/*.tsx', {
            eager: true,
        })

        const page = pages[`./pages/${name}.tsx`] as any

        page.default.layout ??= AppHeaderLayout

        return page
    },

    strictMode: true,

    withApp(app) {
        return (
            <>
                {app}
                <Toaster />
            </>
        )
    },

    progress: {
        color: 'var(--color-sage)',
    },
})
