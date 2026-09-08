import { SectionLabel } from '@/components/section-label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import PasswordInput from '@/components/password-input';
import { useForm } from '@inertiajs/react';

export default function Auth() {
    const loginForm = useForm({
        username: '',
        password: '',
    });

    const registerForm = useForm({
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    return (
        <section className="py-10">
            <div className="mx-auto grid max-w-[1040px] grid-cols-1 overflow-hidden rounded-[4px] bg-[var(--color-sage)] md:grid-cols-2">

                {/* Bejelentkezés */}
                <div className="p-8 md:p-10">
                    <SectionLabel>Bejelentkezés</SectionLabel>

                    <form
                        noValidate
                        onSubmit={(e) => {
                            e.preventDefault();
                            loginForm.post('/login');
                        }}
                        className="space-y-6"
                    >
                        <div>
                            <Label htmlFor="login-username">
                                Felhasználónév
                            </Label>

                            <div className="mt-2">
                                <Input
                                    id="login-username"
                                    type="text"
                                    value={loginForm.data.username}
                                    onChange={(e) =>
                                        loginForm.setData(
                                            'username',
                                            e.target.value,
                                        )
                                    }
                                    autoComplete="username"
                                    aria-invalid={
                                        !!loginForm.errors.username
                                    }
                                />
                            </div>

                            {loginForm.errors.username && (
                                <p className="mt-[5px] text-[12px] !text-[#B91C1C]">
                                    {loginForm.errors.username}
                                </p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="login-password">
                                Jelszó
                            </Label>

                            <div className="mt-2">
                                <PasswordInput
                                    id="login-password"
                                    value={loginForm.data.password}
                                    onChange={(e) =>
                                        loginForm.setData(
                                            'password',
                                            e.target.value,
                                        )
                                    }
                                    autoComplete="current-password"
                                    aria-invalid={
                                        !!loginForm.errors.password
                                    }
                                />
                            </div>

                            {loginForm.errors.password && (
                                <p className="mt-[5px] text-[12px] !text-[#B91C1C]">
                                    {loginForm.errors.password}
                                </p>
                            )}
                        </div>

                        <div className="flex justify-center pt-2">
                            <Button
                                type="submit"
                                disabled={loginForm.processing}
                            >
                                {loginForm.processing
                                    ? 'Bejelentkezés...'
                                    : 'Bejelentkezés'}
                            </Button>
                        </div>
                    </form>
                </div>

                {/* Regisztráció */}
                <div className="border-t border-[var(--color-rule)] p-8 md:border-l md:border-t-0 md:p-10">
                    <SectionLabel>Regisztráció</SectionLabel>

                    <form
                        noValidate
                        onSubmit={(e) => {
                            e.preventDefault();
                            registerForm.post('/register');
                        }}
                        className="space-y-6"
                    >
                        <div>
                            <Label htmlFor="register-username">
                                Felhasználónév
                            </Label>

                            <div className="mt-2">
                                <Input
                                    id="register-username"
                                    type="text"
                                    value={registerForm.data.username}
                                    onChange={(e) =>
                                        registerForm.setData(
                                            'username',
                                            e.target.value,
                                        )
                                    }
                                    autoComplete="username"
                                    aria-invalid={
                                        !!registerForm.errors.username
                                    }
                                />
                            </div>

                            {registerForm.errors.username && (
                                <p className="mt-[5px] text-[12px] !text-[#B91C1C]">
                                    {registerForm.errors.username}
                                </p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="register-email">
                                E-mail
                            </Label>

                            <div className="mt-2">
                                <Input
                                    id="register-email"
                                    type="email"
                                    placeholder="nemkell.azigazit@megadnod.hu"
                                    value={registerForm.data.email}
                                    onChange={(e) =>
                                        registerForm.setData(
                                            'email',
                                            e.target.value,
                                        )
                                    }
                                    autoComplete="email"
                                    aria-invalid={
                                        !!registerForm.errors.email
                                    }
                                />
                            </div>

                            {registerForm.errors.email && (
                                <p className="mt-[5px] text-[12px] !text-[#B91C1C]">
                                    {registerForm.errors.email}
                                </p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="register-password">
                                Jelszó
                            </Label>

                            <div className="mt-2">
                                <PasswordInput
                                    id="register-password"
                                    placeholder="Minimum 6 karakter"
                                    value={registerForm.data.password}
                                    onChange={(e) =>
                                        registerForm.setData(
                                            'password',
                                            e.target.value,
                                        )
                                    }
                                    autoComplete="new-password"
                                    aria-invalid={
                                        !!registerForm.errors.password
                                    }
                                />
                            </div>

                            {registerForm.errors.password && (
                                <p className="mt-[5px] text-[12px] !text-[#B91C1C]">
                                    {registerForm.errors.password}
                                </p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="register-password-confirmation">
                                Jelszó újra
                            </Label>

                            <div className="mt-2">
                                <PasswordInput
                                    id="register-password-confirmation"
                                    placeholder="Jelszó újra"
                                    value={
                                        registerForm.data
                                            .password_confirmation
                                    }
                                    onChange={(e) =>
                                        registerForm.setData(
                                            'password_confirmation',
                                            e.target.value,
                                        )
                                    }
                                    autoComplete="new-password"
                                    aria-invalid={
                                        !!registerForm.errors
                                            .password_confirmation
                                    }
                                />
                            </div>

                            {registerForm.errors.password_confirmation && (
                                <p className="mt-[5px] text-[12px] !text-[#B91C1C]">
                                    {
                                        registerForm.errors
                                            .password_confirmation
                                    }
                                </p>
                            )}
                        </div>

                        <div className="flex justify-center pt-2">
                            <Button
                                type="submit"
                                disabled={registerForm.processing}
                            >
                                {registerForm.processing
                                    ? 'Regisztráció...'
                                    : 'Regisztráció'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
