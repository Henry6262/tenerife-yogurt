import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { XCircle } from 'lucide-react';
import { useLang } from '@/i18n/LangContext';

export default function PreorderCancel() {
  const { t } = useLang();
  return (
    <section className="relative z-10 min-h-[70vh] flex items-center justify-center py-24">
      <Helmet>
        <title>Krava — {t('cancel.title')}</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div className="container-landing text-center max-w-xl">
        <div className="w-20 h-20 rounded-full bg-muted/10 flex items-center justify-center mx-auto mb-8">
          <XCircle size={40} className="text-muted" />
        </div>
        <h1 className="font-heading text-4xl lg:text-5xl font-semibold text-foreground mb-4">
          {t('cancel.title')}
        </h1>
        <p className="text-lg text-muted mb-8">{t('cancel.body')}</p>
        <Link
          to="/#products"
          className="inline-flex items-center justify-center px-8 py-4 rounded-2xl bg-primary text-white font-semibold text-lg shadow-lg shadow-primary/25 hover:-translate-y-0.5 transition-all"
        >
          {t('cancel.retry')}
        </Link>
      </div>
    </section>
  );
}
