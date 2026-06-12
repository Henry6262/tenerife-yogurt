import { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { CheckCircle } from 'lucide-react';
import { useLang } from '@/i18n/LangContext';
import { track } from '@/lib/analytics';
import { PENDING_PURCHASE_KEY } from '@/lib/checkout';

export default function PreorderSuccess() {
  const { lang, t } = useLang();
  const [searchParams] = useSearchParams();
  const isSubscription = searchParams.get('type') === 'subscription';

  // Fire the Purchase conversion once, using the value stashed before the
  // Stripe redirect. Guard against double-fire (StrictMode / refresh).
  useEffect(() => {
    let value: number | undefined;
    let currency = 'CHF';
    try {
      const raw = sessionStorage.getItem(PENDING_PURCHASE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        value = parsed.value;
        currency = parsed.currency || 'CHF';
        sessionStorage.removeItem(PENDING_PURCHASE_KEY);
      }
    } catch {
      /* ignore */
    }
    track('purchase', value != null ? { value, currency } : { currency });
  }, []);

  return (
    <section className="relative z-10 min-h-[70vh] flex items-center justify-center py-24">
      <Helmet>
        <title>Krava — {t('success.title')}</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div className="container-landing text-center max-w-xl">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-8">
          <CheckCircle size={40} className="text-primary" />
        </div>
        <h1 className="font-heading text-4xl lg:text-5xl font-semibold text-foreground mb-4">
          {isSubscription
            ? (lang === 'de' ? 'Abo bestätigt!' : 'Subscription confirmed!')
            : t('success.title')}
        </h1>
        <p className="text-lg text-muted mb-8">
          {isSubscription
            ? (lang === 'de'
                ? 'Dein Abo ist aktiv. Wir liefern dir ab der ersten Charge jede Woche frischen Joghurt an die Tür.'
                : 'Your subscription is active. We will deliver fresh yogurt to your door every week starting with the first batch.')
            : t('success.body')}
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center px-8 py-4 rounded-2xl bg-primary text-white font-semibold text-lg shadow-lg shadow-primary/25 hover:-translate-y-0.5 transition-all"
        >
          {t('success.home')}
        </Link>
      </div>
    </section>
  );
}
