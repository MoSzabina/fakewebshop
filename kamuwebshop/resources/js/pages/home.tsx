import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { SectionLabel } from '@/components/section-label';
import { useTranslations } from '@/hooks/useTranslation';

export default function Home() {
    const { __ } = useTranslations();
    return (
        <>
            <Head title="fakewebshop" />

            <section className="mx-auto max-w-[1040px] px-8 py-[72px]">
                <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-[1fr_1fr] md:gap-16">
                    <div>
                        <h1>{__("Do you love shopping?")}</h1>
                        <h3 className="mb-4">{__("A little too much?")}</h3>

                        <p>
                            {__("Can't stop yourself from ordering? Then you're in the right place. Here you can enjoy the real shopping experience without spending real money. Browse, add to cart, and order without feeling guilty!")}
                        </p>
                    </div>

                    <div className="flex flex-col gap-4 sm:flex-row">
                        <Button variant="secondary" asChild>
                            <Link href="/products">
                                {__("Start shopping!")}
                            </Link>
                        </Button>

                        <Button variant="outline" asChild>
                            <Link href="/about">
                                {__("Learn more...")}
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            <section>
                <SectionLabel>{__('What is this all about?')}</SectionLabel>
                <div className="mb-5 rounded-[4px] bg-[var(--color-parchment)] p-10">
                    <div className="mb-5 text-[11px] font-medium tracking-[0.12em] text-[var(--color-ink-mid)]">
                        PORTFOLIO PROJECT
                    </div>

                    <div className="mb-2 text-[52px] font-light leading-[1.08] tracking-[-0.03em] text-[var(--color-ink)]">
                        {__("A webshop,")}
                    </div>

                    <div className="mb-7 text-[52px] font-bold leading-[1.08] tracking-[-0.03em] text-[var(--color-ink)]">
                        {__("that is not really a webshop.")}
                    </div>

                    <p className="max-w-[520px]">
                        {__("The special thing about this webshop is that you don't have to spend real money: you can browse, add anything you want to your cart, and even place an order — we just don't actually deliver anything. 😄")}
                    </p>

                    <div className="my-8 border-b border-[var(--color-rule)]" />

                    <p className="mb-5 max-w-[520px]">
                        {__('I made this project as part of my portfolio to show how I use the following technologies in a webshop:')}
                    </p>

                    <ul className="mb-5 list-disc pl-5 text-[15px] leading-[1.72] text-[var(--color-ink)]">
                        <li>Laravel</li>
                        <li>React</li>
                        <li>TypeScript</li>
                        <li>Inertia</li>
                        <li>Tailwind CSS</li>
                        <li>Eloquent</li>
                    </ul>

                    <div className="my-8 border-b border-[var(--color-rule)]" />

                    <p className="mb-5 max-w-[520px]">
                        {__('I worked on the whole project from planning to the finished application:')}
                    </p>

                    <ul className="mb-5 list-disc pl-5 text-[15px] leading-[1.72] text-[var(--color-ink)]">
                        <li>{__('Project planning and task management with a Kanban board')}</li>
                        <li>{__('UI/UX and visual design with Figma')}</li>
                        <li>{__('Version control with GitHub')}</li>
                        <li>{__('Database design and implementation')}</li>
                        <li>{__('Frontend and backend development')}</li>
                        <li>{__('Documentation')}</li>
                    </ul>
                </div>
            </section>
        </>
    );
}
