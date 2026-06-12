import { Milk, ArrowRight, FlaskConical, Leaf, Droplets } from 'lucide-react';
import { useLang } from '@/i18n/LangContext';
import type { StringKey } from '@/i18n/strings';
import FadeContent from '@/components/FadeContent';

const FLOW: { key: StringKey; icon: typeof Milk; hero?: boolean }[] = [
  { key: 'culture.step1.label', icon: Milk },
  { key: 'culture.step2.label', icon: FlaskConical, hero: true },
  { key: 'culture.step3.label', icon: Droplets },
];

const TILES: { titleKey: StringKey; bodyKey: StringKey; icon: typeof Milk }[] = [
  { titleKey: 'culture.t1.title', bodyKey: 'culture.t1.body', icon: Milk },
  { titleKey: 'culture.t2.title', bodyKey: 'culture.t2.body', icon: FlaskConical },
  { titleKey: 'culture.t3.title', bodyKey: 'culture.t3.body', icon: Leaf },
];

export default function LivingCulture() {
  const { t } = useLang();

  return (
    <section id="culture" className="relative z-10 py-24 lg:py-32 scroll-mt-20">
      <div className="container-landing">
        <FadeContent blur duration={1000}>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="label text-primary">{t('culture.eyebrow')}</span>
            <h2 className="font-heading text-4xl lg:text-5xl xl:text-6xl font-semibold text-foreground mt-4 mb-6">
              {t('culture.title')}
            </h2>
            <p className="text-lg lg:text-xl text-muted leading-relaxed">{t('culture.lead')}</p>
          </div>
        </FadeContent>

        {/* Flow: Real milk -> L. bulgaricus -> Yogurt */}
        <FadeContent blur duration={1000} delay={120}>
          <div className="flex items-center justify-center gap-3 sm:gap-6 lg:gap-10 mb-16 flex-wrap">
            {FLOW.map((step, i) => (
              <div key={step.key} className="flex items-center gap-3 sm:gap-6 lg:gap-10">
                <div className="flex flex-col items-center gap-3">
                  <div
                    className={`flex items-center justify-center rounded-full transition-all ${
                      step.hero
                        ? 'h-24 w-24 lg:h-28 lg:w-28 bg-primary text-white shadow-xl shadow-primary/25 ring-4 ring-primary/15'
                        : 'h-16 w-16 lg:h-20 lg:w-20 bg-card border border-border text-primary'
                    }`}
                  >
                    <step.icon size={step.hero ? 40 : 28} />
                  </div>
                  <span
                    className={`text-sm font-semibold text-center ${
                      step.hero ? 'text-primary italic' : 'text-foreground'
                    }`}
                  >
                    {t(step.key)}
                  </span>
                </div>
                {i < FLOW.length - 1 && (
                  <ArrowRight className="text-muted shrink-0" size={24} />
                )}
              </div>
            ))}
          </div>
        </FadeContent>

        {/* Supporting tiles */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {TILES.map((tile, i) => (
            <FadeContent key={tile.titleKey} blur duration={1000} delay={i * 120}>
              <div className="h-full rounded-3xl bg-card border border-border p-8">
                <tile.icon className="text-primary mb-5" size={32} />
                <h3 className="font-heading text-xl font-semibold text-foreground mb-3">{t(tile.titleKey)}</h3>
                <p className="text-muted leading-relaxed">{t(tile.bodyKey)}</p>
              </div>
            </FadeContent>
          ))}
        </div>
      </div>
    </section>
  );
}
