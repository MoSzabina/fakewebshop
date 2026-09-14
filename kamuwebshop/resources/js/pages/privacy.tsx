import { SectionLabel } from "@/components/section-label"
import { useTranslations } from "@/hooks/useTranslation";

export default function Privacy() {

    const { __ } = useTranslations();
    return (
        <>
            <section className="py-12">
    <SectionLabel>{__('Privacy Policy')}</SectionLabel>

    <p className="italic">
        {__('Last updated: September 2026')}
    </p>

    <p className="italic">
        {__('Welcome to our demo webshop. This website is a portfolio project created for demonstration and educational purposes. It is not a real online store and no real purchases or deliveries are made.')}
    </p>

    <h3>1. {__('Information we collect')}</h3>

    <p>{__('If you create an account, the website may store information such as:')}</p>

    <ul className="list-disc list-inside text-[var(--color-ink-mid)]">
        <li>{__('username')}</li>
        <li>{__('email address')}</li>
        <li>{__('password')}</li>
        <li>{__('shipping address')}</li>
        <li>{__('order history')}</li>
        <li>{__('credit balance and credit transaction history')}</li>
    </ul>

    <p>
        {__('This information is used only to provide the functionality of the demo webshop, such as user accounts, shopping carts, orders and the fictional credit system.')}
    </p>

    <h3>2. {__('You do not need to provide real information')}</h3>

    <p>
        {__('Because this is a fictional demonstration webshop, you do not need to provide real personal information. You may use a fictional username, a non-personal or otherwise suitable email address, and a fictional shipping address when testing the website. There is no email verification, and the website does not require you to prove that the information belongs to you. Please do not enter sensitive, confidential or unnecessary personal information.')}
    </p>

    <h3>3. {__('Payments and deliveries')}</h3>

    <p>
        {__('This website does not process real payments. No credit card, bank account or other payment information is collected, and no money is charged from you. The credits displayed on the website are part of the fictional webshop system and have no real monetary value. The website also does not ship physical products. Any shipping address entered during checkout is used only as demonstration data.')}
    </p>

    <h3>4. {__('How we use your information')}</h3>

    <p>
        {__('Information stored by the application is used only for the functionality of this portfolio project, including:')}
    </p>

    <ul className="list-disc list-inside text-[var(--color-ink-mid)]">
        <li>{__('creating and managing user accounts')}</li>
        <li>{__('maintaining shopping carts')}</li>
        <li>{__('displaying orders')}</li>
        <li>{__('managing fictional credits')}</li>
        <li>{__('demonstrating webshop functionality')}</li>
    </ul>

    <p>
        {__('Your information is not sold, rented or used for advertising.')}
    </p>

    <h3>5. {__('Third parties')}</h3>

    <p>
        {__('The application does not intentionally provide your account, order or profile information to third parties. No external payment provider, shipping company, advertising network or email marketing service is used to process your information.')}
    </p>

    <h3>{__('Google Fonts')}</h3>

    <p>
        {__("The website uses fonts provided through Google Fonts. If Google Fonts are loaded directly from Google's servers, your browser may communicate with Google when requesting the font files. This may involve technical information such as your IP address and browser-related information. Google Fonts is used solely to provide the website's typography. No account, profile or webshop information is intentionally sent to Google through the application.")}
    </p>

    <h3>6. {__('Cookies and local storage')}</h3>

    <p>
        {__('The website may use technically necessary cookies or browser storage required for the application to function. These may be used for purposes such as:')}
    </p>

    <ul className="list-disc list-inside text-[var(--color-ink-mid)]">
        <li>{__('maintaining your login session')}</li>
        <li>{__('protecting forms and requests')}</li>
        <li>{__('remembering selected preferences such as language')}</li>
        <li>{__('maintaining the functionality of the shopping cart')}</li>
    </ul>

    <p>
        {__('The website does not use advertising cookies or third-party tracking cookies for targeted advertising. If additional analytics, advertising or non-essential third-party services are added in the future, this Privacy Policy will be updated accordingly.')}
    </p>

    <h3>7. {__('Data security')}</h3>

    <p>
        {__('Reasonable technical measures are used to protect information stored by the application. However, this is a demonstration project and should not be used to store sensitive or confidential information.')}
    </p>

    <h3>8. {__('Data retention')}</h3>

    <p>
        {__('Account and order information may remain stored in the application\'s database while the demo project is running. Because this is a portfolio project, data may be deleted, reset or recreated during development without prior notice.')}
    </p>

    <h3>9. {__('Your rights')}</h3>

    <p>
        {__('Where applicable under data protection law, you may have rights including access to your personal data, correction of inaccurate information, deletion of your data, restriction of processing and objection to certain processing activities. For questions about your data or this Privacy Policy, please contact the project owner using the contact details provided on this website.')}
    </p>

    <h3>10. {__('Changes to this Privacy Policy')}</h3>

    <p>
        {__('This Privacy Policy may be updated when the functionality of the website changes. The latest version will always be published on this page.')}
    </p>
</section>

        </>
    )
}
