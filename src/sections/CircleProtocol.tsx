import { Recycle, Home, ChefHat } from 'lucide-react';
import { useLang } from '@/i18n/LangContext';
import { BRAND, p } from '@/data/brand';
import FadeContent from '@/components/FadeContent';

export default function CircleProtocol() {
  const { lang, t } = useLang();

  return (
    <section id="circle" className="relative z-10 py-24 lg:py-32 scroll-mt-20">
      <div className="container-landing">
        <FadeContent blur duration={1000}>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="label text-primary">{t('circle.eyebrow')}</span>
            <h2 className="font-heading text-4xl lg:text-5xl xl:text-6xl font-semibold text-foreground mt-4 mb-4 flex items-center justify-center gap-3">
              <Recycle size={40} className="text-primary" />
              {t('circle.title')}
            </h2>
            <p className="text-lg text-muted">{t('circle.subtitle')}</p>
          </div>
        </FadeContent>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
          <FadeContent blur duration={1000}>
            <div className="h-full rounded-3xl bg-card border border-border p-8 lg:p-10">
              <Home className="text-primary mb-5" size={30} />
              <h3 className="font-heading text-xl font-semibold text-foreground mb-3">
                {t('circle.d2c.title')}
              </h3>
              <p className="text-muted leading-relaxed">{p(lang, BRAND.circle.d2c)}</p>
            </div>
          </FadeContent>

          <FadeContent blur duration={1000} delay={120}>
            <div className="h-full rounded-3xl bg-card border border-border p-8 lg:p-10">
              <ChefHat className="text-primary mb-5" size={30} />
              <h3 className="font-heading text-xl font-semibold text-foreground mb-3">
                {t('circle.b2b.title')}
              </h3>
              <p className="text-muted leading-relaxed">{p(lang, BRAND.circle.b2b)}</p>
            </div>
          </FadeContent>
        </div>
      </div>
    </section>
  );
}
