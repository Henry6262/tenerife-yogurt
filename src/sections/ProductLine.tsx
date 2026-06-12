import { useState } from 'react';
import { useLang } from '@/i18n/LangContext';
import { BRAND, fmtCHF, p } from '@/data/brand';
import { type Sku } from '@/lib/checkout';
import FadeContent from '@/components/FadeContent';
import OrderModal from '@/components/OrderModal';

export default function ProductLine() {
  const { lang, t } = useLang();
  const [orderSku, setOrderSku] = useState<Sku | null>(null);

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
                    onClick={() => setOrderSku(product.id as Sku)}
                    className={`block w-full text-center py-3 rounded-xl font-semibold transition-all ${
                      isReserve
                        ? 'bg-primary text-white hover:bg-primary-dark'
                        : 'bg-foreground text-white hover:bg-foreground/90'
                    }`}
                  >
                    {t('cta.preorder')}
                  </button>
                </div>
              </FadeContent>
            );
          })}
        </div>

        <FadeContent blur duration={1000}>
          <p className="text-center text-sm text-muted mt-8">
            {t('reserve.trust')}
          </p>
        </FadeContent>
      </div>

      <OrderModal sku={orderSku} onClose={() => setOrderSku(null)} />
    </section>
  );
}
