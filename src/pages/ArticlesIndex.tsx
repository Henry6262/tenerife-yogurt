import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useLang, pick } from '@/i18n/LangContext';
import { articles } from '@/data/articles';
import FadeContent from '@/components/FadeContent';

export default function ArticlesIndex() {
  const { lang, t } = useLang();

  return (
    <>
      <Helmet>
        <title>{`${t('articles.title')} — Krava`}</title>
        <meta name="description" content={t('articles.subtitle')} />
        <html lang={lang} />
      </Helmet>

      <section className="relative z-10 pt-32 pb-16 lg:pt-40">
        <div className="container-landing">
          <FadeContent blur duration={1000}>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h1 className="font-heading text-4xl lg:text-6xl font-semibold text-foreground mb-4">
                {t('articles.title')}
              </h1>
              <p className="text-lg text-muted">{t('articles.subtitle')}</p>
            </div>
          </FadeContent>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {articles.map((a, i) => (
              <FadeContent key={a.id} blur duration={1000} delay={i * 120}>
                <Link
                  to={`/articles/${a.slug}`}
                  className="group block h-full rounded-3xl bg-card border border-border overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={a.image}
                      alt={pick(lang, a.title)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    <span className="label text-primary">{pick(lang, a.category)}</span>
                    <h2 className="font-heading text-xl font-semibold text-foreground mt-2 mb-2 leading-snug">
                      {pick(lang, a.title)}
                    </h2>
                    <p className="text-sm text-muted leading-relaxed">{pick(lang, a.excerpt)}</p>
                    <div className="text-xs text-muted mt-4">{a.readTime}</div>
                  </div>
                </Link>
              </FadeContent>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
