import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';

export function useTranslations() {
    const { translations, locale } = usePage<SharedData>().props;
    const __ = (key: string, replacements: Record<string, string> = {}) => {
        let translation = translations[key] || key;
        Object.keys(replacements).forEach((r) => {
            translation = translation.replace(`:${r}`, replacements[r]);
        });
        return translation;
    };
    return {
        __,
        trans: __,
        locale,
    };
}
