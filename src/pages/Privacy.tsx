import { Helmet } from 'react-helmet-async';
import { useLang, pick } from '@/i18n/LangContext';
import { BRAND } from '@/data/brand';
import FadeContent from '@/components/FadeContent';
import { CONSENT_KEY } from '@/lib/analytics';

type L = { de: string; en: string };

const COPY: { title: L; updated: L; sections: { heading: L; body: L }[] } = {
  title: { de: 'Datenschutzerklärung', en: 'Privacy Notice' },
  updated: { de: 'Stand: Juni 2026', en: 'Last updated: June 2026' },
  sections: [
    {
      heading: { de: '1. Verantwortlicher', en: '1. Controller' },
      body: {
        de: `Verantwortlich für die Datenbearbeitung auf dieser Website ist ${BRAND.impressum.legalName}, ${BRAND.impressum.address}, ${BRAND.impressum.city}, Schweiz. Kontakt: ${BRAND.impressum.email}. Diese Erklärung richtet sich nach dem schweizerischen Datenschutzgesetz (revDSG) und, soweit anwendbar, der EU-DSGVO.`,
        en: `The controller responsible for data processing on this website is ${BRAND.impressum.legalName}, ${BRAND.impressum.address}, ${BRAND.impressum.city}, Switzerland. Contact: ${BRAND.impressum.email}. This notice follows the Swiss Federal Act on Data Protection (revFADP) and, where applicable, the EU GDPR.`,
      },
    },
    {
      heading: { de: '2. Welche Daten wir erheben', en: '2. What data we collect' },
      body: {
        de: 'Wenn du ein Formular absendest (Abo-Interesse, Bestellung oder Gastronomie-Anfrage), erheben wir die Angaben, die du eingibst: Name, E-Mail, Telefonnummer, bei Gastronomie-Anfragen zusätzlich Restaurantname, Funktion und ungefähres Wochenvolumen. Bei Vorbestellungen verarbeitet unser Zahlungsdienstleister Stripe deine Zahlungsdaten — wir selbst speichern keine Kartendaten. Server-Logs (IP-Adresse, Zeitpunkt, aufgerufene Seite) fallen beim Hosting-Anbieter technisch bedingt an.',
        en: 'When you submit a form (subscription interest, order, or restaurant enquiry), we collect what you enter: name, email, phone number, and for restaurant enquiries additionally the restaurant name, your role, and approximate weekly volume. For pre-orders, our payment provider Stripe processes your payment details — we never store card data ourselves. Server logs (IP address, timestamp, page requested) arise technically at our hosting provider.',
      },
    },
    {
      heading: { de: '3. Wofür wir die Daten nutzen', en: '3. How we use your data' },
      body: {
        de: 'Formulardaten nutzen wir ausschliesslich, um deine Anfrage zu beantworten — etwa um Probelieferungen für deine Küche zu organisieren oder dein Abo einzurichten (Vertragsanbahnung bzw. -erfüllung). Wir verkaufen keine Daten und versenden keine Werbung ohne deine Einwilligung.',
        en: 'We use form data exclusively to respond to your request — for example to arrange sample deliveries for your kitchen or to set up your subscription (pre-contractual measures or contract performance). We never sell data and never send marketing without your consent.',
      },
    },
    {
      heading: { de: '4. Marketing-Pixel (Meta, TikTok)', en: '4. Marketing pixels (Meta, TikTok)' },
      body: {
        de: 'Nur wenn du im Cookie-Banner «Akzeptieren» wählst, laden wir das Meta-Pixel (Meta Platforms Ireland Ltd., für Facebook & Instagram) und ggf. das TikTok-Pixel (TikTok Technology Ltd.). Diese messen, ob unsere Anzeigen wirken (z. B. Seitenaufrufe, abgesendete Formulare), und können dafür Cookies setzen und Daten in Länder ausserhalb der Schweiz/EU übertragen (insb. USA), gestützt auf EU-Standardvertragsklauseln. Ohne deine Einwilligung werden diese Pixel nicht geladen. Du kannst deine Einwilligung jederzeit widerrufen (siehe Abschnitt 7).',
        en: 'Only if you choose "Accept" in the cookie banner do we load the Meta pixel (Meta Platforms Ireland Ltd., for Facebook & Instagram) and, if configured, the TikTok pixel (TikTok Technology Ltd.). These measure whether our ads work (e.g. page views, submitted forms) and may set cookies and transfer data outside Switzerland/the EU (notably the USA), based on EU standard contractual clauses. Without your consent these pixels are never loaded. You can withdraw consent at any time (see section 7).',
      },
    },
    {
      heading: { de: '5. Empfänger und Auftragsbearbeiter', en: '5. Recipients and processors' },
      body: {
        de: 'Wir setzen folgende Dienstleister ein: Vercel Inc. (Hosting), Stripe Payments Europe Ltd. (Zahlungen), Resend (Transaktions-E-Mails) sowie — nur mit Einwilligung — Meta und TikTok (Werbemessung). Mit allen bestehen Auftragsverarbeitungs- bzw. Datenschutzvereinbarungen.',
        en: 'We use the following service providers: Vercel Inc. (hosting), Stripe Payments Europe Ltd. (payments), Resend (transactional email), and — only with consent — Meta and TikTok (ad measurement). Data processing agreements are in place with all of them.',
      },
    },
    {
      heading: { de: '6. Speicherdauer', en: '6. Retention' },
      body: {
        de: 'Anfrage-Daten bewahren wir so lange auf, wie es für die Bearbeitung nötig ist, längstens 24 Monate ohne aktive Kundenbeziehung. Buchhaltungsrelevante Daten (Bestellungen) unterliegen der gesetzlichen Aufbewahrungspflicht von 10 Jahren.',
        en: 'Enquiry data is kept as long as needed to handle your request, at most 24 months without an active customer relationship. Accounting-relevant data (orders) is subject to the statutory 10-year retention period.',
      },
    },
    {
      heading: { de: '7. Deine Rechte & Widerruf', en: '7. Your rights & withdrawal' },
      body: {
        de: `Du hast das Recht auf Auskunft, Berichtigung, Löschung und Datenherausgabe sowie das Recht, eine erteilte Einwilligung jederzeit zu widerrufen. Schreib dazu einfach an ${BRAND.impressum.email}. Deine Pixel-Einwilligung kannst du auch direkt hier zurücksetzen:`,
        en: `You have the right to access, rectify, delete, and export your data, and to withdraw any consent at any time. Just write to ${BRAND.impressum.email}. You can also reset your pixel consent directly here:`,
      },
    },
  ],
};

const RESET = {
  de: { label: 'Cookie-Einwilligung zurücksetzen', done: 'Zurückgesetzt — beim nächsten Seitenaufruf wirst du erneut gefragt.' },
  en: { label: 'Reset cookie consent', done: 'Reset — you will be asked again on your next visit.' },
};

export default function Privacy() {
  const { lang } = useLang();
  const r = RESET[lang === 'de' ? 'de' : 'en'];

  return (
    <>
      <Helmet>
        <title>{`${pick(lang, COPY.title)} — Krava`}</title>
        <meta name="robots" content="noindex" />
        <html lang={lang} />
      </Helmet>

      <section className="relative z-10 pt-32 pb-24 lg:pt-40">
        <div className="container-landing">
          <FadeContent blur duration={800}>
            <div className="max-w-3xl mx-auto">
              <h1 className="font-heading text-4xl lg:text-5xl font-semibold text-foreground mb-2">
                {pick(lang, COPY.title)}
              </h1>
              <p className="text-sm text-muted mb-12">{pick(lang, COPY.updated)}</p>

              <div className="space-y-10">
                {COPY.sections.map((s) => (
                  <div key={s.heading.en}>
                    <h2 className="font-heading text-xl font-semibold text-foreground mb-3">
                      {pick(lang, s.heading)}
                    </h2>
                    <p className="text-base leading-relaxed text-ink/80">{pick(lang, s.body)}</p>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={(e) => {
                    localStorage.removeItem(CONSENT_KEY);
                    (e.currentTarget as HTMLButtonElement).textContent = r.done;
                  }}
                  className="rounded-full border border-border px-5 py-2.5 text-sm text-ink/70 transition-colors hover:bg-ink/5"
                >
                  {r.label}
                </button>
              </div>
            </div>
          </FadeContent>
        </div>
      </section>
    </>
  );
}
