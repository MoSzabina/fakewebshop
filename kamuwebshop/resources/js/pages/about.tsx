import { SectionLabel } from "@/components/section-label";
import TextLink from "@/components/text-link";

export default function About() {
    return (
        <>

            <section className="p-8">

                <SectionLabel>Ez kamu!</SectionLabel>
                <p className="max-w-[520px] pb-8">
                    Olyan, mint egy webshop. Csak itt nem költesz igazi pénzt. Nem kell semmilyen valódi adatot megadni. Rendelsz, és cserébe nem kapsz semmit. Csak az élményt.
                </p>
                <SectionLabel>Hogy működik?</SectionLabel>
                <p className="max-w-[520px]">
                    Belépés nélkül is nézelődhetsz, és rakhatsz kosárba termékeket. Rendelés ladása csak regisztrált felhasználóknak elérhető!
                </p>
                <ol className="list-decimal list-inside py-8 text-[var(--color-ink-mid)]">
                    <li>Kosárba rakhatsz termékeket.</li>
                    <li>Rendelés esetén be kell lépned a fiókodba, vagy létrehozni egyet.</li>
                    <li>Regisztrálsz, akár nem létező email címmel, nem küldünk megerősítő linket.</li>
                    <li>Bejelentkezel, és máris kapsz kreditet, amit felhasználhatsz a "vásárláshoz".</li>
                    <li>Ha nem elég, szerezz többet a <TextLink href="/credits" variant="sage">Kreditek</TextLink> oldalon.</li>
                </ol>

            </section>

            <section className="p-8">

                <SectionLabel>PORTFOLIO PROJECT</SectionLabel>
                
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

            </section>

        </>
    );
}
