import { Milk, FlaskConical, Snowflake } from 'lucide-react';
import { useLang } from '@/i18n/LangContext';
import { BRAND, p } from '@/data/brand';
import FadeContent from '@/components/FadeContent';

export default function Transparency() {
  const { lang, t } = useLang();

  const points = [
    { icon: Milk, title: t('transparency.milk'), body: p(lang, BRAND.sourcing.milk) },
    { icon: FlaskConical, title: t('transparency.culture'), body: p(lang, BRAND.sourcing.culture) },
    { icon: Snowflake, title: t('transparency.process'), body: p(lang, BRAND.sourcing.process) },
  ];

  return (
    <section id="transparency" className="relative z-10 py-24 lg:py-32">
      <div className="container-landing">
        <FadeContent blur duration={1000}>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="label text-primary">{t('transparency.eyebrow')}</span>
            <h2 className="font-heading text-4xl lg:text-5xl xl:text-6xl font-semibold text-foreground mt-4 mb-4">
              {t('transparency.title')}
            </h2>
            <p className="text-lg text-muted">{t('transparency.heritage')}</p>
          </div>
        </FadeContent>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {points.map((pt, i) => (
            <FadeContent key={pt.title} blur duration={1000} delay={i * 120}>
              <div className="h-full rounded-3xl bg-card border border-border p-8">
                <pt.icon className="text-primary mb-5" size={32} />
                <h3 className="font-heading text-xl font-semibold text-foreground mb-3">{pt.title}</h3>
                <p className="text-muted leading-relaxed">{pt.body}</p>
              </div>
            </FadeContent>
          ))}
        </div>
      </div>
    </section>
  );
}
