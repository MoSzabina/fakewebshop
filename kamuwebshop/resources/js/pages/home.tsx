import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { SectionLabel } from '@/components/section-label';

export default function Home() {
    return (
        <>
            <Head title="kamuwebshop" />

            <section className="mx-auto max-w-[1040px] px-8 py-[72px]">
                <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-[1fr_1fr] md:gap-16">
                    <div>
                        <h1>Szeretsz shoppingolni?</h1>
                        <h3 className="mb-4">Túlságosan is?</h3>

                        <p>
                            Nem bírod ki, hogy ne rendelj? Akkor jó helyen jársz. Itt valódi shopping élmény vár, valódi pénzköltés nélkül. Nézelődj, rakd a kosárba, rendeld meg bűntudat nélkül!
                        </p>
                    </div>

                    <div className="flex flex-col gap-4 sm:flex-row">
                        <Button variant="secondary" asChild>
                            <Link href="/products">
                                Irány a shop!
                            </Link>
                        </Button>

                        <Button variant="outline" asChild>
                            <Link href="/about">
                                Tudj meg többet...
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            <section>
                <SectionLabel>Mi ez az egész?</SectionLabel>
                <div className="mb-5 rounded-[4px] bg-[var(--color-parchment)] p-10">
                    <div className="mb-5 text-[11px] font-medium tracking-[0.12em] text-[var(--color-ink-mid)]">
                        PORTFOLIO PROJECT
                    </div>

                    <div className="mb-2 text-[52px] font-light leading-[1.08] tracking-[-0.03em] text-[var(--color-ink)]">
                        Egy webshop,
                    </div>

                    <div className="mb-7 text-[52px] font-bold leading-[1.08] tracking-[-0.03em] text-[var(--color-ink)]">
                        ami valójában nem webshop.
                    </div>

                    <p className="max-w-[520px]">
                        A webshop különlegessége, hogy itt nem kell valódi pénzt költened:
                        nézelődhetsz, kosárba tehetsz mindent, amit csak szeretnél, és még a
                        rendelést is leadhatod — csak éppen semmit nem szállítunk ki. 😄
                    </p>

                    <div className="my-8 border-b border-[var(--color-rule)]" />

                    <p className="mb-5 max-w-[520px]">
                        Ezt a projektet a portfólióm részeként készítettem, hogy egy teljes
                        webshopélményen keresztül mutassam be a következő technológiák
                        használatát:
                    </p>

                    <ul className="mb-5 list-disc pl-5 text-[15px] leading-[1.72] text-[var(--color-ink)]">
                        <li>Laravel</li>
                        <li>React</li>
                        <li>TypeScript</li>
                        <li>Inertia.js</li>
                        <li>Tailwind CSS</li>
                        <li>Eloquent</li>
                    </ul>

                    <div className="my-8 border-b border-[var(--color-rule)]" />

                    <p className="mb-5 max-w-[520px]">
                        A fejlesztés során a teljes folyamatot végigvezettem a tervezéstől a kész alkalmazásig:
                    </p>

                    <ul className="mb-5 list-disc pl-5 text-[15px] leading-[1.72] text-[var(--color-ink)]">
                        <li>projekttervezés és feladatkezelés Kanban táblával</li>
                        <li>UI/UX és vizuális tervezés Figma segítségével</li>
                        <li>verziókezelés GitHubon</li>
                        <li>adatbázis-tervezés és implementáció</li>
                        <li>frontend és backend fejlesztés</li>
                        <li>dokumentáció</li>
                    </ul>
                </div>
            </section>
        </>
    );
}
