import { Gift, Gamepad2, CalendarDays, Sparkles } from 'lucide-react';
import { useTranslations } from '@/hooks/useTranslation';
import { SectionLabel } from '@/components/section-label';
import { router } from '@inertiajs/react';

interface CreditsProps {
    balance: number;
}

interface CreditsProps {
    balance: number;
    claimedToday: boolean;
}


export default function Credits({ balance, claimedToday }: CreditsProps) {
    const { __ } = useTranslations();

    return (
        <section className="py-10">
            <div className="mx-auto max-w-[1040px]">

                <div className="mb-10">
                    <SectionLabel>{__('Balance')}</SectionLabel>
                </div>

                <div className="mb-12 rounded-[4px] bg-[var(--color-sage-light)] px-6 py-8">
                    <div className="flex items-center gap-4">
                        <div className="flex size-12 items-center justify-center rounded-full bg-[var(--color-white)] text-[var(--color-sage)]">
                            <Sparkles size={24} strokeWidth={1.5} />
                        </div>

                        <div>
                            <div className="text-[12px] font-medium uppercase tracking-[0.08em] text-[var(--color-ink-mid)]">
                                {__('Available credits')}
                            </div>

                            <div className="mt-1 text-[30px] font-semibold text-[var(--color-ink)]">
                                {balance}
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <SectionLabel>{__('Earn Credits')}</SectionLabel>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                        <div className="rounded-[4px] border border-[var(--color-rule)] bg-[var(--color-white)] p-6">
                            <div className="mb-5 flex size-11 items-center justify-center rounded-full bg-[var(--color-sage-light)] text-[var(--color-sage)]">
                                <Gift size={22} strokeWidth={1.5} />
                            </div>

                            <h3 className="text-[16px] font-medium text-[var(--color-ink)]">
                                {__('Welcome bonus')}
                            </h3>

                            <p className="mt-2 text-[14px] leading-6 text-[var(--color-ink-mid)]">
                                {__('Get bonus credits when you create an account.')}
                            </p>

                            <div className="mt-5 text-[14px] font-medium text-[var(--color-sage)]">
                                +1000 credits
                            </div>
                        </div>

                        <div className="rounded-[4px] border border-[var(--color-rule)] bg-[var(--color-white)] p-6">
                            <div className="mb-5 flex size-11 items-center justify-center rounded-full bg-[var(--color-sage-light)] text-[var(--color-sage)]">
                                <CalendarDays size={22} strokeWidth={1.5} />
                            </div>

                            <h3 className="text-[16px] font-medium text-[var(--color-ink)]">
                                {__('Daily reward')}
                            </h3>

                            <p className="mt-2 text-[14px] leading-6 text-[var(--color-ink-mid)]">
                                {__('Come back every day and claim your reward.')}
                            </p>

                            <button
                                type="button"
                                disabled={claimedToday}
                                onClick={() =>
                                    router.post('/credits/daily-reward', {}, {
                                        preserveScroll: true,
                                    })
                                }
                                className={`mt-5 rounded-[3px] px-4 py-2 text-[13px] font-medium text-white transition-opacity ${claimedToday
                                    ? 'cursor-not-allowed bg-[var(--color-ink-mid)] opacity-50'
                                    : 'bg-[var(--color-sage)] hover:opacity-90'
                                    }`}
                            >
                                {claimedToday ? __('+ 100') : __('Claim daily reward')}
                            </button>
                        </div>

                        <div className="rounded-[4px] border border-[var(--color-rule)] bg-[var(--color-white)] p-6">
                            <div className="mb-5 flex size-11 items-center justify-center rounded-full bg-[var(--color-sage-light)] text-[var(--color-sage)]">
                                <Gamepad2 size={22} strokeWidth={1.5} />
                            </div>

                            <h3 className="text-[16px] font-medium text-[var(--color-ink)]">
                                {__('Mini games')}
                            </h3>

                            <p className="mt-2 text-[14px] leading-6 text-[var(--color-ink-mid)]">
                                {__('Play simple games and earn extra credits.')}
                            </p>

                            <button
                                type="button"
                                disabled
                                className="mt-5 rounded-[3px] bg-[var(--color-sage)] px-4 py-2 text-[13px] font-medium text-white opacity-50"
                            >
                                {__('Coming soon')}
                            </button>
                        </div>

                        <div className="rounded-[4px] border border-[var(--color-rule)] bg-[var(--color-white)] p-6">
                            <div className="mb-5 flex size-11 items-center justify-center rounded-full bg-[var(--color-sage-light)] text-[var(--color-sage)]">
                                <Sparkles size={22} strokeWidth={1.5} />
                            </div>

                            <h3 className="text-[16px] font-medium text-[var(--color-ink)]">
                                {__('More ways to earn')}
                            </h3>

                            <p className="mt-2 text-[14px] leading-6 text-[var(--color-ink-mid)]">
                                {__('More fun ways to earn credits will be added later.')}
                            </p>

                            <div className="mt-5 text-[13px] text-[var(--color-ink-mid)]">
                                {__('Coming soon')}
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
}
