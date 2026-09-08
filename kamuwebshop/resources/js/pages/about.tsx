import { SectionLabel } from "@/components/section-label";
import TextLink from "@/components/text-link";
import { useTranslations } from '@/hooks/useTranslation';

export default function About() {
    const { __ } = useTranslations();
    return (
        <>

            <section className="p-8">

                <SectionLabel>{__('It’s fake!')}</SectionLabel>
                <p className="max-w-[520px] pb-8">
                    {__('It looks like a webshop. But you don’t spend real money here. You don’t need to give any real information. You place an order, but you don’t get anything. Just the experience.')}
                </p>

                <SectionLabel>{__('How does it work?')}</SectionLabel>
                <p className="max-w-[520px]">
                    {__('You can browse and add products to your cart without logging in. Only registered users can place an order!')}
                </p>

                <ol className="list-decimal list-inside py-8 text-[var(--color-ink-mid)]">
                    <li>{__('You can add products to your cart.')}</li>
                    <li>{__('To place an order, you need to log in or create an account.')}</li>
                    <li>{__('You can register with any email address. We don’t send a confirmation link.')}</li>
                    <li>{__('After logging in, you get credits that you can use for "buying".')}</li>
                    <li>
                        {__('If you don’t have enough, get more on the')}{' '}
                        <TextLink href="/credits" variant="sage">{__('Credits')}</TextLink>
                        {' '}{__('page.')}
                    </li>
                </ol>

            </section>

            <section className="p-8">

                <SectionLabel>{__('PORTFOLIO PROJECT')}</SectionLabel>

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

            </section>

        </>
    );
}
