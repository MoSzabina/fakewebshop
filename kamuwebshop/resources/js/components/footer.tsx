import { useState } from 'react';
import TextLink from '@/components/text-link';
import { useTranslations } from '@/hooks/useTranslation';

export function Footer() {
    const { __ } = useTranslations();
    const [contactOpen, setContactOpen] = useState(false);
    const [sent, setSent] = useState(false);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        formData.append('access_key', 'ef17cd17-05a7-4ca1-a746-bd3a0157de95');

        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();

        if (data.success) {
            setSent(true);
            event.currentTarget.reset();
        }
    }

    return (
        <footer className="border-t border-rule bg-parchment">
            <div className="mx-auto w-full max-w-[1040px] px-8 pt-8">

                <div className="grid grid-cols-2 gap-8 text-sm">
                    {/* Left */}
                    <div className="flex flex-col gap-1">
                        <span className="mb-1 font-medium text-ink">
                            {__('Contact')}
                        </span>

                        <a
                            href="#"
                            onClick={(event) => {
                                event.preventDefault();
                                setContactOpen(true);
                                setSent(false);
                            }}
                            className="text-[14px] text-ink-mid transition-colors duration-150 hover:text-ink"
                        >
                            {__('Send an email')}
                        </a>

                        <a
                            href="https://www.linkedin.com/in/oreszabina"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[14px] text-ink-mid transition-colors duration-150 hover:text-ink"
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

                <span className="my-8 block h-px bg-rule" />

                <div className="flex justify-end text-xs text-ink-mid">
                    © 2026 fakewebshop
                </div>
            </div>

            {contactOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
                    onClick={() => setContactOpen(false)}
                >
                    <div
                        className="w-full max-w-md rounded bg-white p-6"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div className="mb-5 flex items-center justify-between">
                            <h2 className="font-medium text-ink">
                                {__('Contact')}
                            </h2>

                            <button
                                type="button"
                                onClick={() => setContactOpen(false)}
                                className="text-xl text-ink-mid hover:text-ink"
                            >
                                ×
                            </button>
                        </div>

                        {sent ? (
                            <p className="text-sm text-ink-mid">
                                {__('Message sent successfully.')}
                            </p>
                        ) : (
                            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder={__('Name')}
                                    required
                                    className="rounded border border-rule px-3 py-2 text-sm outline-none focus:border-ink"
                                />

                                <input
                                    type="email"
                                    name="email"
                                    placeholder={__('Email')}
                                    required
                                    className="rounded border border-rule px-3 py-2 text-sm outline-none focus:border-ink"
                                />

                                <textarea
                                    name="message"
                                    placeholder={__('Message')}
                                    rows={5}
                                    required
                                    className="resize-none rounded border border-rule px-3 py-2 text-sm outline-none focus:border-ink"
                                />

                                <button
                                    type="submit"
                                    className="rounded bg-ink px-4 py-2 text-sm text-white hover:opacity-90"
                                >
                                    {__('Send message')}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </footer>
    );
}
