import { Head } from '@inertiajs/react';

import { AppHeader } from '@/components/app-header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';

export default function Login() {
    return (
        <>
            <Head title="Meridian Test" />




            <main className="mx-auto w-full max-w-[1040px] px-8 py-16">
                <div className="space-y-[72px]">

                    {/* Typography */}
                    <section>
                        <h1>Meridian Design System</h1>
                        <p className="mt-3">
                            Tesztoldal a globális stílusok és komponensek
                            ellenőrzéséhez.
                        </p>

                        <h2 className="mt-10">Heading 2</h2>
                        <h3 className="mt-6">Heading 3</h3>
                    </section>

                    <Separator />

                    {/* Colors */}
                    <section>
                        <h2>Színek</h2>

                        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
                            <div className="h-24 rounded-[4px] bg-[#1C1917]" />
                            <div className="h-24 rounded-[4px] bg-[#6B6460]" />
                            <div className="h-24 rounded-[4px] bg-[#6B7C65]" />
                            <div className="h-24 rounded-[4px] bg-[#E8EDE7]" />
                            <div className="h-24 rounded-[4px] bg-[#EDE8DF]" />
                            <div className="h-24 rounded-[4px] border border-[#DDD8D0] bg-[#FAF8F5]" />
                        </div>
                    </section>

                    {/* Buttons */}
                    <section>
                        <h2>Gombok</h2>

                        <div className="mt-6 flex flex-wrap gap-4">
                            <Button>Default</Button>
                            <Button variant="secondary">Secondary</Button>
                            <Button variant="outline">Outline</Button>
                            <Button variant="muted">Muted</Button>
                            <Button variant="link">Link</Button>
                        </div>
                    </section>

                    {/* Forms */}
                    <section>
                        <h2>Form elemek</h2>

                        <div className="mt-6 max-w-md space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="test-email">Email</Label>
                                <Input
                                    id="test-email"
                                    type="email"
                                    placeholder="email@example.com"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="test-password">
                                    Jelszó
                                </Label>
                                <Input
                                    id="test-password"
                                    type="password"
                                    placeholder="••••••••"
                                />
                            </div>

                            <div className="flex items-center space-x-3">
                                <Checkbox
                                    id="remember"
                                    name="remember"
                                    tabIndex={3}
                                />
                                <Label htmlFor="remember">Remember me</Label>
                            </div>
                        </div>
                    </section>

                    {/* Badges */}
                    <section>
                        <h2>Badge-ek</h2>

                        <div className="mt-6 flex flex-wrap gap-3">
                            <Badge>Default</Badge>
                            <Badge variant="secondary">
                                Secondary
                            </Badge>
                            <Badge variant="outline">
                                Outline
                            </Badge>
                        </div>
                    </section>

                    {/* Product-like cards */}
                    <section>
                        <h2>Kártya jellegű elemek</h2>

                        <div className="mt-6 grid gap-6 sm:grid-cols-2">
                            <div className="overflow-hidden rounded-[4px] border border-[#DDD8D0] bg-[#FAF8F5]">
                                <div className="h-40 bg-[#E8EDE7]" />

                                <div className="p-5">
                                    <div className="text-[11px] font-medium tracking-[0.08em] text-[#6B7C65]">
                                        FEELINGS
                                    </div>

                                    <h3 className="mt-2">
                                        Deja Vu
                                    </h3>

                                    <p className="mt-2">
                                        Refresh this page.
                                    </p>

                                    <div className="mt-4 text-sm text-[#6B6460]">
                                        4 990 Ft
                                    </div>
                                </div>
                            </div>

                            <div className="overflow-hidden rounded-[4px] border border-[#DDD8D0] bg-[#FAF8F5]">
                                <div className="h-40 bg-[#E8EDE7]" />

                                <div className="p-5">
                                    <div className="text-[11px] font-medium tracking-[0.08em] text-[#6B7C65]">
                                        ELECTRONICS
                                    </div>

                                    <h3 className="mt-2">
                                        Unshaver
                                    </h3>

                                    <p className="mt-2">
                                        Be unique. Everybody shaves.
                                    </p>

                                    <div className="mt-4 text-sm text-[#6B6460]">
                                        9 990 Ft
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Table */}
                    <section>
                        <h2>Táblázat</h2>

                        <table className="mt-6">
                            <thead>
                                <tr>
                                    <th>Termék</th>
                                    <th>Kategória</th>
                                    <th>Ár</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td>Unshaver</td>
                                    <td>Electronics</td>
                                    <td>9 990 Ft</td>
                                </tr>
                                <tr>
                                    <td>Deja Vu</td>
                                    <td>Feelings</td>
                                    <td>4 990 Ft</td>
                                </tr>
                            </tbody>
                        </table>
                    </section>

                </div>
            </main>


        </>
    );
}