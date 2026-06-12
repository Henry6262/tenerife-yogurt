import { useState } from 'react';
import { useLang } from '@/i18n/LangContext';
import FadeContent from '@/components/FadeContent';
import SubscribeForm from '@/sections/SubscribeForm';
import PreorderReserve from '@/sections/PreorderReserve';

type Tab = 'subscribe' | 'onetime';

// Order hub: one lead-capture point at the end of the page — weekly
// subscription or one-time delivery, both pay-on-delivery (no Stripe).
export default function Order() {
  const { t } = useLang();
  const [tab, setTab] = useState<Tab>('subscribe');

  const tabClass = (active: boolean) =>
    `px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
      active ? 'bg-primary text-white shadow-md shadow-primary/20' : 'text-muted hover:text-foreground'
    }`;

  return (
    <section id="order" className="relative z-10 py-24 lg:py-32 scroll-mt-20">
      <div className="container-landing">
        <FadeContent blur duration={1000}>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="label text-primary">{t('orderhub.eyebrow')}</span>
            <h2 className="font-heading text-4xl lg:text-5xl font-semibold text-foreground mt-4 mb-4">
              {t('orderhub.title')}
            </h2>
            <p className="text-lg text-muted">{t('orderhub.subtitle')}</p>
          </div>
        </FadeContent>

        <FadeContent blur duration={1000} delay={100}>
          <div className="flex justify-center mb-10">
            <div className="inline-flex rounded-full border border-border bg-card p-1.5">
              <button type="button" onClick={() => setTab('subscribe')} className={tabClass(tab === 'subscribe')}>
                {t('orderhub.tab.subscribe')}
              </button>
              <button type="button" onClick={() => setTab('onetime')} className={tabClass(tab === 'onetime')}>
                {t('orderhub.tab.onetime')}
              </button>
            </div>
          </div>
        </FadeContent>

        {tab === 'subscribe' ? <SubscribeForm embedded /> : <PreorderReserve embedded />}
      </div>
    </section>
  );
}
