import { useState } from 'react';
import { Check, Sparkles, CreditCard, Loader2 } from 'lucide-react';
import { useLang } from '@/i18n/LangContext';
import { BRAND, fmtCHF, p } from '@/data/brand';
import { startSubscriptionCheckout, type SubscriptionPlan } from '@/lib/checkout';
import FadeContent from '@/components/FadeContent';

export default function Subscriptions() {
  const { lang, t } = useLang();
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const subscribe = async (planId: SubscriptionPlan) => {
    setError(null);
    setLoadingId(planId);
    try {
      await startSubscriptionCheckout(planId, lang);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Checkout failed');
      setLoadingId(null);
    }
  };

  return (
    <section id="subscribe" className="relative z-10 py-24 lg:py-32 scroll-mt-20">
      <div className="container-landing">
        <FadeContent blur duration={1000}>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="label text-primary">{t('subs.eyebrow')}</span>
            <h2 className="font-heading text-4xl lg:text-5xl xl:text-6xl font-semibold text-foreground mt-4 mb-4">
              {t('subs.title')}
            </h2>
            <p className="text-lg text-muted">{t('subs.subtitle')}</p>
          </div>
        </FadeContent>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {BRAND.plans.map((plan, i) => (
            <FadeContent key={plan.id} blur duration={1000} delay={i * 150}>
              <div
                className={`relative h-full flex flex-col rounded-3xl p-8 transition-all duration-300 ${
                  plan.popular
                    ? 'bg-foreground text-white border-2 border-primary shadow-lg shadow-primary/10'
                    : 'bg-card border border-border hover:shadow-xl hover:shadow-primary/5'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full bg-primary text-white text-xs font-bold uppercase tracking-wider">
                      <Sparkles size={14} />
                      {lang === 'de' ? 'Beliebt' : 'Popular'}
                    </span>
                  </div>
                )}

                <h3 className="font-heading text-2xl font-semibold mb-2">{p(lang, plan.name)}</h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="font-heading text-4xl font-semibold">{fmtCHF(plan.price)}</span>
                  <span className={plan.popular ? 'text-white/60' : 'text-muted'}>{p(lang, plan.cadence)}</span>
                </div>
                <p className={`text-sm mb-6 ${plan.popular ? 'text-white/70' : 'text-muted'}`}>
                  {p(lang, plan.contents)}
                </p>

                <ul className="space-y-3 mb-8 flex-1">
                  {p(lang, plan.features).map((f) => (
                    <li key={f} className="flex items-center gap-3">
                      <Check size={18} className={plan.popular ? 'text-primary-light' : 'text-primary'} />
                      <span className={`text-sm ${plan.popular ? 'text-white/90' : 'text-muted'}`}>{f}</span>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => subscribe(plan.id as SubscriptionPlan)}
                  disabled={loadingId === plan.id}
                  className={`block w-full text-center py-3.5 rounded-xl font-semibold transition-all disabled:opacity-60 disabled:cursor-wait ${
                    plan.popular
                      ? 'bg-primary text-white hover:bg-primary-dark'
                      : 'bg-foreground text-white hover:bg-foreground/90'
                  }`}
                >
                  {loadingId === plan.id ? (
                    <span className="inline-flex items-center gap-2">
                      <Loader2 size={16} className="animate-spin" />
                      {lang === 'de' ? 'Weiter…' : 'Proceed…'}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2">
                      <CreditCard size={16} />
                      {lang === 'de' ? 'Jetzt abonnieren' : 'Subscribe now'}
                    </span>
                  )}
                </button>
              </div>
            </FadeContent>
          ))}
        </div>

        {error && (
          <p className="text-center text-sm text-primary mt-6">{error}</p>
        )}
      </div>
    </section>
  );
}
