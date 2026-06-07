import { Helmet } from 'react-helmet-async';
import { Recycle, ThermometerSun, ScrollText } from 'lucide-react';
import { useLang } from '@/i18n/LangContext';
import { BRAND, fmtCHF, p } from '@/data/brand';
import FadeContent from '@/components/FadeContent';
import ChefForm from '@/sections/ChefForm';

export default function Chefs() {
  const { lang, t } = useLang();

  return (
    <>
      <Helmet>
        <title>{lang === 'de' ? 'Krava für Köche — Gastronomie' : "Krava for Chefs — Gastronomy"}</title>
        <meta
          name="description"
          content={
            lang === 'de'
              ? 'Hochdichter, gesiebter Joghurt für die Profiküche in Zürich. Kistentausch, null Verpackungsmüll. Koch-Tasting anfragen.'
              : 'High-density strained yogurt for professional kitchens in Zürich. Crate swap, zero packaging waste. Request a tasting.'
          }
        />
        <html lang={lang} />
      </Helmet>

      {/* Hero band */}
      <section className="relative z-10 pt-32 pb-16 lg:pt-40 lg:pb-20">
        <div className="container-landing text-center max-w-3xl mx-auto">
          <FadeContent blur duration={1000}>
            <span className="label text-primary">{t('nav.chefs')}</span>
            <h1 className="font-heading text-4xl lg:text-6xl font-semibold text-foreground mt-4 mb-5">
              {t('chefs.headline')}
            </h1>
            <p className="text-lg lg:text-xl text-muted leading-relaxed">{t('chefs.sub')}</p>
          </FadeContent>
        </div>
      </section>

      {/* Value props */}
      <section className="relative z-10 pb-16">
        <div className="container-landing grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          <FadeContent blur duration={1000}>
            <div className="h-full rounded-3xl bg-card border border-border p-8">
              <ThermometerSun className="text-primary mb-5" size={30} />
              <h3 className="font-heading text-xl font-semibold text-foreground mb-3">
                {lang === 'de' ? 'Stabil unter Hitze' : 'Stable under heat'}
              </h3>
              <p className="text-muted leading-relaxed">{p(lang, BRAND.products[1].blurb)}</p>
            </div>
          </FadeContent>
          <FadeContent blur duration={1000} delay={120}>
            <div className="h-full rounded-3xl bg-card border border-border p-8">
              <ScrollText className="text-primary mb-5" size={30} />
              <h3 className="font-heading text-xl font-semibold text-foreground mb-3">
                {lang === 'de' ? 'Herkunft & Reinheit' : 'Provenance & purity'}
              </h3>
              <p className="text-muted leading-relaxed">{p(lang, BRAND.sourcing.milk)}</p>
            </div>
          </FadeContent>
          <FadeContent blur duration={1000} delay={240}>
            <div className="h-full rounded-3xl bg-card border border-border p-8">
              <Recycle className="text-primary mb-5" size={30} />
              <h3 className="font-heading text-xl font-semibold text-foreground mb-3">{t('chefs.crateTitle')}</h3>
              <p className="text-muted leading-relaxed">{t('chefs.crateBody')}</p>
            </div>
          </FadeContent>
        </div>
      </section>

      {/* Crate credit highlight */}
      <section className="relative z-10 pb-16">
        <div className="container-landing">
          <FadeContent blur duration={1000}>
            <div className="max-w-3xl mx-auto rounded-3xl bg-foreground text-white p-8 lg:p-10 text-center">
              <p className="text-lg lg:text-xl leading-relaxed">
                {lang === 'de' ? 'Empfohlene Menge: ' : 'Recommended volume: '}
                <span className="font-semibold text-primary-light">15–30 kg</span>
                {lang === 'de' ? ' pro Woche · Gutschrift ' : ' per week · '}
                <span className="font-semibold text-primary-light">{fmtCHF(BRAND.circle.b2bCreditPerJar)}</span>
                {lang === 'de' ? ' pro zurückgegebenem Glas.' : ' credit per returned jar.'}
              </p>
            </div>
          </FadeContent>
        </div>
      </section>

      {/* Tasting request form */}
      <section className="relative z-10 pb-24 lg:pb-32">
        <div className="container-landing">
          <ChefForm />
        </div>
      </section>
    </>
  );
}
