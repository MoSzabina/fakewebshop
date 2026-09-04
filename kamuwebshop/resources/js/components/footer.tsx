import TextLink from '@/components/text-link';

export function Footer() {
    return (
        <footer className="border-t border-[var(--color-rule)] bg-[var(--color-parchment)]">
            <div className="mx-auto w-full max-w-[1040px] px-8 pt-8">

                <div className="grid grid-cols-2 gap-8 text-sm">
                    {/* Left */}
                    <div className="flex flex-col gap-1">
                        <span className="mb-1 font-medium text-[var(--color-ink)]">
                            Kapcsolat
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
                            Tudj meg többet
                        </TextLink>

                        <TextLink href="/privacy" variant="muted">
                            Adatvédelem
                        </TextLink>
                    </div>
                </div>

                <span className="my-8 block h-px bg-[var(--color-rule)]" />

                <div className="flex justify-end text-xs text-[var(--color-ink-mid)]">
                    © 2026 kamuwebshop — mutiba készült.
                </div>

            </div>
        </footer>
    );
}
