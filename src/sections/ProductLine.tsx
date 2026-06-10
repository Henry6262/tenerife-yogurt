import { useState } from 'react';
import { useLang } from '@/i18n/LangContext';
import { BRAND, fmtCHF, p } from '@/data/brand';
import { startCheckout, type Sku } from '@/lib/checkout';
import FadeContent from '@/components/FadeContent';

export default function ProductLine() {
  const { lang, t } = useLang();
  const [loadingSku, setLoadingSku] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const payNow = async (sku: Sku) => {
    setError(null);
    setLoadingSku(sku);
    try {
      await startCheckout([{ sku, quantity: 1 }], lang);
      // On success the browser is redirected to Stripe — no need to reset state.
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Checkout failed');
      setLoadingSku(null);
    }
  };

  return (
    <section id="products" className="relative z-10 py-24 lg:py-32">
      <div className="container-landing">
        <FadeContent blur duration={1000}>
          <div className="text-center max-w-2xl mx-auto mb-6">
            <span className="label text-primary">{t('products.eyebrow')}</span>
            <h2 className="font-heading text-4xl lg:text-5xl xl:text-6xl font-semibold text-foreground mt-4 mb-4">
              {t('products.title')}
            </h2>
            <p className="text-lg text-muted">{t('products.subtitle')}</p>
          </div>
        </FadeContent>

        <FadeContent blur duration={1000}>
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-4 py-1.5 text-sm font-semibold">
              {t('products.preorderBadge')}
            </span>
          </div>
        </FadeContent>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {BRAND.products.map((product, i) => {
            const isReserve = product.tier === 'reserve';
            const loading = loadingSku === product.id;
            return (
              <FadeContent key={product.id} blur duration={1000} delay={i * 120}>
                <div
                  className={`h-full flex flex-col rounded-3xl p-8 transition-all duration-300 ${
                    isReserve
                      ? 'bg-foreground text-white border-2 border-primary shadow-xl shadow-primary/10'
                      : 'bg-card border border-border hover:shadow-xl hover:shadow-primary/5'
                  }`}
                >
                  <span className={`label ${isReserve ? 'text-primary-light' : 'text-primary'}`}>
                    {p(lang, product.tagline)}
                  </span>
                  <h3 className="font-heading text-2xl font-semibold mt-3 mb-1">{product.name}</h3>
                  <p className={`text-sm mb-5 ${isReserve ? 'text-white/60' : 'text-muted'}`}>
                    {p(lang, product.size)}
                  </p>
                  <div className="font-heading text-4xl font-semibold mb-5">{fmtCHF(product.price)}</div>
                  <p className={`leading-relaxed mb-8 flex-1 ${isReserve ? 'text-white/70' : 'text-muted'}`}>
                    {p(lang, product.blurb)}
                  </p>
                  <button
                    type="button"
                    onClick={() => payNow(product.id as Sku)}
                    disabled={loading}
                    className={`block w-full text-center py-3 rounded-xl font-semibold transition-all disabled:opacity-60 disabled:cursor-wait ${
                      isReserve
                        ? 'bg-primary text-white hover:bg-primary-dark'
                        : 'bg-foreground text-white hover:bg-foreground/90'
                    }`}
                  >
                    {loading ? t('cta.processing') : t('cta.preorder')}
                  </button>
                </div>
              </FadeContent>
            );
          })}
        </div>

        {error && (
          <p className="text-center text-sm text-primary mt-6">{error}</p>
        )}

        <FadeContent blur duration={1000}>
          <p className="text-center text-sm text-muted mt-8">
            {t('products.payOnDeliveryPrompt')}{' '}
            <a href="#reserve" className="text-primary font-semibold underline underline-offset-4 hover:text-primary-dark">
              {t('cta.payOnDelivery')}
            </a>
          </p>
        </FadeContent>
      </div>
    </section>
  );
}
