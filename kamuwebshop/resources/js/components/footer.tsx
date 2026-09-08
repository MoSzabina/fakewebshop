import TextLink from '@/components/text-link';
import { useTranslations } from '@/hooks/useTranslation';

export function Footer() {
    const { __ } = useTranslations();
    return (
        <footer className="border-t border-[var(--color-rule)] bg-[var(--color-parchment)]">
            <div className="mx-auto w-full max-w-[1040px] px-8 pt-8">

                <div className="grid grid-cols-2 gap-8 text-sm">
                    {/* Left */}
                    <div className="flex flex-col gap-1">
                        <span className="mb-1 font-medium text-[var(--color-ink)]">
                            {__('Contact')}
                        </span>

                        <a
                            href="email@example.com"
                            className="text-[14px] text-[var(--color-ink-mid)] transition-colors duration-150 hover:text-[var(--color-ink)]"
                        >
                            email@example.com
                        </a>

                        <a
                            href="www.linkedin.com/in/oreszabina"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[14px] text-[var(--color-ink-mid)] transition-colors duration-150 hover:text-[var(--color-ink)]"
                        >
                            LinkedIn
                        </a>
                    </div>

                    {/* Right */}
                    <div className="flex flex-col items-end gap-1">
                        <TextLink href="/about" variant="muted">
                           {__('Learn more')}
                        </TextLink>

                        <TextLink href="/privacy" variant="muted">
                           {__('Privacy Policy')}
                        </TextLink>
                    </div>
                </div>

                <span className="my-8 block h-px bg-[var(--color-rule)]" />

                <div className="flex justify-end text-xs text-[var(--color-ink-mid)]">
                    © 2026 fakewebshop
                </div>

            </div>
        </footer>
    );
}
