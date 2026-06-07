import { Link } from 'react-router-dom';
import { Home, ChefHat, ArrowRight } from 'lucide-react';
import { useLang } from '@/i18n/LangContext';
import FadeContent from '@/components/FadeContent';

export default function DualGateway() {
  const { t } = useLang();

  return (
    <section id="gateway" className="relative z-10 py-24 lg:py-28">
      <div className="container-landing">
        <FadeContent blur duration={1000}>
          <h2 className="text-center font-heading text-4xl lg:text-5xl font-semibold text-foreground mb-14">
            {t('gateway.title')}
          </h2>
        </FadeContent>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
          {/* D2C */}
          <FadeContent blur duration={1000}>
            <div className="h-full flex flex-col rounded-3xl bg-card border border-border p-8 lg:p-10 hover:shadow-xl hover:shadow-primary/5 transition-all">
              <Home className="text-primary mb-5" size={32} />
              <h3 className="font-heading text-2xl font-semibold text-foreground mb-3">
                {t('gateway.d2c.title')}
              </h3>
              <p className="text-muted leading-relaxed mb-8 flex-1">{t('gateway.d2c.body')}</p>
              <a
                href="#subscribe"
                className="group inline-flex items-center gap-2 font-semibold text-primary hover:gap-3 transition-all"
              >
                {t('gateway.d2c.cta')}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </FadeContent>

          {/* B2B */}
          <FadeContent blur duration={1000} delay={120}>
            <div className="h-full flex flex-col rounded-3xl bg-foreground text-white border border-foreground p-8 lg:p-10 hover:shadow-xl hover:shadow-primary/20 transition-all">
              <ChefHat className="text-primary-light mb-5" size={32} />
              <h3 className="font-heading text-2xl font-semibold mb-3">{t('gateway.b2b.title')}</h3>
              <p className="text-white/70 leading-relaxed mb-8 flex-1">{t('gateway.b2b.body')}</p>
              <Link
                to="/chefs"
                className="group inline-flex items-center gap-2 font-semibold text-primary-light hover:gap-3 transition-all"
              >
                {t('gateway.b2b.cta')}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </FadeContent>
        </div>
      </div>
    </section>
  );
}
