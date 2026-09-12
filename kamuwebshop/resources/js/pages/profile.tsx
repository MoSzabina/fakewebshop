import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { FaceGrinning } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { SectionLabel } from '@/components/section-label';
import PasswordInput from '@/components/password-input';
import { useTranslations } from '@/hooks/useTranslation';

interface User {
    id: number;
    username: string;
    email: string;
    shipping?: string | null;
}

interface CreditTransaction {
    id: number;
    amount: number;
    type: string;
    created_at: string;
}

interface OrderItem {
    id: number;
    quantity: number;
    unitprice: string;
    product: {
        name: string;
    };
}

interface Order {
    id: number;
    created_at: string;
    status: string;
    total_price: string;
    items: OrderItem[];
}

interface ProfileProps {
    user: User;
    orders: Order[];
    creditBalance: number;
    creditTransactions: CreditTransaction[];
}

export default function Profile({
    user,
    orders,
    creditBalance,
    creditTransactions,
}: ProfileProps) {
    const { __ } = useTranslations();

    const [editingShipping, setEditingShipping] = useState(false);
    const [showCreditHistory, setShowCreditHistory] = useState(false);

    const profileForm = useForm({
        shipping: user.shipping ?? '',
    });

    const passwordForm = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updateProfile = (e: React.SubmitEvent) => {
        e.preventDefault();

        profileForm.patch('/profile', {
            onSuccess: () => {
                setEditingShipping(false);
            },
        });
    };

    const cancelShippingEdit = () => {
        profileForm.setData('shipping', user.shipping ?? '');
        setEditingShipping(false);
        profileForm.clearErrors();
    };

    const updatePassword = (e: React.SubmitEvent) => {
        e.preventDefault();

        passwordForm.put('/profile/password', {
            onSuccess: () => {
                passwordForm.reset();
            },
        });
    };

    return (
        <section className="mx-auto w-full max-w-[1040px] px-8 py-12">

            <div className="space-y-12">
                <div className="grid gap-8 lg:grid-cols-2">

                    <section>
                        <SectionLabel>
                            {__('Account')}
                        </SectionLabel>

                        <div className="mt-5 flex flex-col items-center text-center">
                            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[var(--color-sage-light)] text-[var(--color-sage)]">
                                <FaceGrinning size={42} strokeWidth={1.5} />
                            </div>

                            <div className="mt-6 w-full max-w-[500px] space-y-4">
                                <div className="border-b border-[var(--color-rule)] pb-3 text-[14px] text-[var(--color-ink)]">
                                    {user.username}
                                </div>

                                <div className="border-b border-[var(--color-rule)] pb-3 text-[14px] text-[var(--color-ink)]">
                                    {user.email}
                                </div>

                                <div className="border-b border-[var(--color-rule)] pb-3 text-[14px] text-[var(--color-ink-mid)]">
                                    {user.shipping || '—'}
                                </div>
                            </div>

                            {!editingShipping && (
                                <div className="mt-5">
                                    <Button
                                        type="button"
                                        variant="muted"
                                        onClick={() =>
                                            setEditingShipping(true)
                                        }
                                    >
                                        {__('Edit Shipping Address')}
                                    </Button>
                                </div>
                            )}

                            {editingShipping && (
                                <form
                                    onSubmit={updateProfile}
                                    className="mt-5"
                                >
                                    <textarea
                                        value={profileForm.data.shipping}
                                        onChange={(e) =>
                                            profileForm.setData(
                                                'shipping',
                                                e.target.value,
                                            )
                                        }
                                        rows={4}
                                        autoFocus
                                        placeholder={__(
                                            'Enter your shipping address',
                                        )}
                                        className="w-full resize-none rounded-[4px] border border-[var(--color-rule)] bg-[var(--color-white)] px-4 py-3 text-[14px] text-[var(--color-ink)] outline-none transition-colors placeholder:text-[var(--color-ink-mid)] focus:border-[var(--color-ink)]"
                                    />

                                    {profileForm.errors.shipping && (
                                        <p className="mt-2 text-[12px] text-red-600">
                                            {profileForm.errors.shipping}
                                        </p>
                                    )}

                                    <div className="mt-4 flex gap-3">
                                        <Button
                                            type="submit"
                                            disabled={profileForm.processing}
                                        >
                                            {profileForm.processing
                                                ? __('Saving...')
                                                : __('Save')}
                                        </Button>

                                        <Button
                                            type="button"
                                            variant="muted"
                                            onClick={cancelShippingEdit}
                                            disabled={profileForm.processing}
                                        >
                                            {__('Cancel')}
                                        </Button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </section>

                    <section>
                        <SectionLabel>
                            {__('Credit balance')}
                        </SectionLabel>

                        <div className="mt-5 rounded-[4px] bg-[var(--color-sage-light)] p-6">

                            <div className="mt-2 text-[32px] font-semibold tracking-[-0.03em] text-[var(--color-ink)]">
                                {Number(creditBalance).toFixed(2)}
                            </div>

                            <div className="mt-6 border-t border-[var(--color-rule)] pt-5">

                                <div className="space-y-3">
                                    {creditTransactions
                                        .slice(0, 3)
                                        .map((transaction) => (
                                            <div
                                                key={transaction.id}
                                                className="flex items-center justify-between text-[13px]"
                                            >
                                                <span className="text-[var(--color-ink-mid)]">
                                                    {new Date(
                                                        transaction.created_at,
                                                    ).toLocaleDateString()}
                                                </span>

                                                <span className="text-[var(--color-ink)]">
                                                    {transaction.amount > 0
                                                        ? '+'
                                                        : ''}
                                                    {transaction.amount}
                                                </span>
                                            </div>
                                        ))}

                                    {creditTransactions.length === 0 && (
                                        <div className="text-[13px] text-[var(--color-ink-mid)]">
                                            {__(
                                                'No credit transactions yet.',
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="mt-6">
                                <Button
                                    type="button"
                                    variant="muted"
                                    onClick={() =>
                                        setShowCreditHistory(true)
                                    }
                                >
                                    {__('History')}
                                </Button>
                            </div>
                        </div>
                    </section>
                </div>

                <section className="border-t border-[var(--color-rule)] pt-10">
                    <SectionLabel>
                        {__('Order history')}
                    </SectionLabel>

                    <div className="mt-5">
                        {orders.length === 0 ? (
                            <p className="text-[14px] text-[var(--color-ink-mid)]">
                                {__('You have no orders yet.')}
                            </p>
                        ) : (
                            <div className="overflow-hidden rounded-[4px] border border-[var(--color-rule)]">
                                <div className="hidden grid-cols-[1fr_1fr_1fr_1fr] gap-4 border-b border-[var(--color-rule)] bg-[var(--color-sage-light)] px-5 py-3 text-[11px] font-medium tracking-[0.08em] text-[var(--color-ink-mid)] md:grid">
                                    <span>{__('Order')}</span>
                                    <span>{__('Date')}</span>
                                    <span>{__('Status')}</span>
                                    <span className="text-right">
                                        {__('Total')}
                                    </span>
                                </div>

                                {orders.map((order) => (
                                    <div
                                        key={order.id}
                                        className="grid gap-2 border-b border-[var(--color-rule)] px-5 py-4 last:border-b-0 md:grid-cols-[1fr_1fr_1fr_1fr] md:items-center md:gap-4"
                                    >
                                        <span className="text-[13px] font-medium text-[var(--color-ink)]">
                                            #{order.id}
                                        </span>

                                        <span className="text-[13px] text-[var(--color-ink-mid)]">
                                            {new Date(
                                                order.created_at,
                                            ).toLocaleDateString()}
                                        </span>

                                        <span className="text-[13px] capitalize text-[var(--color-ink-mid)]">
                                            {__(order.status)}
                                        </span>

                                        <span className="text-[13px] text-[var(--color-ink)] md:text-right">
                                            {order.total_price}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                <section className="border-t border-[var(--color-rule)] pt-10">
                    <SectionLabel>
                        {__('Security')}
                    </SectionLabel>

                    <form
                        onSubmit={updatePassword}
                        className="mt-5 max-w-[500px] space-y-5"
                    >
                        <div>
                            <label
                                htmlFor="current-password"
                                className="text-[13px] text-[var(--color-ink)]"
                            >
                                {__('Current password')}
                            </label>

                            <div className="mt-2">
                                <PasswordInput
                                    id="current-password"
                                    value={
                                        passwordForm.data.current_password
                                    }
                                    onChange={(e) =>
                                        passwordForm.setData(
                                            'current_password',
                                            e.target.value,
                                        )
                                    }
                                    autoComplete="current-password"
                                />
                            </div>

                            {passwordForm.errors.current_password && (
                                <p className="mt-2 text-[12px] text-red-600">
                                    {passwordForm.errors.current_password}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="new-password"
                                className="text-[13px] text-[var(--color-ink)]"
                            >
                                {__('New password')}
                            </label>

                            <div className="mt-2">
                                <PasswordInput
                                    id="new-password"
                                    value={passwordForm.data.password}
                                    onChange={(e) =>
                                        passwordForm.setData(
                                            'password',
                                            e.target.value,
                                        )
                                    }
                                    autoComplete="new-password"
                                />
                            </div>

                            {passwordForm.errors.password && (
                                <p className="mt-2 text-[12px] text-red-600">
                                    {passwordForm.errors.password}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="password-confirmation"
                                className="text-[13px] text-[var(--color-ink)]"
                            >
                                {__('Confirm new password')}
                            </label>

                            <div className="mt-2">
                                <PasswordInput
                                    id="password-confirmation"
                                    value={
                                        passwordForm.data
                                            .password_confirmation
                                    }
                                    onChange={(e) =>
                                        passwordForm.setData(
                                            'password_confirmation',
                                            e.target.value,
                                        )
                                    }
                                    autoComplete="new-password"
                                />
                            </div>

                            {passwordForm.errors
                                .password_confirmation && (
                                <p className="mt-2 text-[12px] text-red-600">
                                    {
                                        passwordForm.errors
                                            .password_confirmation
                                    }
                                </p>
                            )}
                        </div>

                        <Button
                            type="submit"
                            disabled={passwordForm.processing}
                        >
                            {passwordForm.processing
                                ? __('Updating...')
                                : __('Change password')}
                        </Button>
                    </form>
                </section>
            </div>

            {showCreditHistory && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4"
                    onClick={() => setShowCreditHistory(false)}
                >
                    <div
                        className="w-full max-w-[520px] rounded-[4px] border border-[var(--color-rule)] bg-[var(--color-white)] p-6 shadow-[0_8px_40px_rgba(28,25,23,0.15)]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between">
                            <h2 className="text-[20px] font-semibold text-[var(--color-ink)]">
                                {__('Credit history')}
                            </h2>

                            <button
                                type="button"
                                onClick={() =>
                                    setShowCreditHistory(false)
                                }
                                className="text-[22px] leading-none text-[var(--color-ink-mid)] transition-colors hover:text-[var(--color-ink)]"
                                aria-label={__('Close')}
                            >
                                ×
                            </button>
                        </div>

                        <div className="mt-6 max-h-[400px] overflow-y-auto pr-2">
                            {creditTransactions.length === 0 ? (
                                <p className="text-[14px] text-[var(--color-ink-mid)]">
                                    {__(
                                        'No credit transactions yet.',
                                    )}
                                </p>
                            ) : (
                                <div className="space-y-4">
                                    {creditTransactions.map(
                                        (transaction) => (
                                            <div
                                                key={transaction.id}
                                                className="flex items-center justify-between border-b border-[var(--color-rule)] pb-3"
                                            >
                                                <div>
                                                    <div className="text-[13px] text-[var(--color-ink)]">
                                                        {__(
                                                            transaction.type,
                                                        )}
                                                    </div>

                                                    <div className="mt-1 text-[12px] text-[var(--color-ink-mid)]">
                                                        {new Date(
                                                            transaction.created_at,
                                                        ).toLocaleDateString()}
                                                    </div>
                                                </div>

                                                <div className="text-[13px] font-medium text-[var(--color-ink)]">
                                                    {transaction.amount > 0
                                                        ? '+'
                                                        : ''}
                                                    {transaction.amount}
                                                </div>
                                            </div>
                                        ),
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="mt-6">
                            <Button
                                type="button"
                                variant="muted"
                                onClick={() =>
                                    setShowCreditHistory(false)
                                }
                            >
                                {__('Close')}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
