import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useLang, pick } from '@/i18n/LangContext';
import { recipes } from '@/data/recipes';
import FadeContent from '@/components/FadeContent';

export default function RecipesIndex() {
  const { lang, t } = useLang();

  return (
    <>
      <Helmet>
        <title>{`${t('recipes.title')} — Krava`}</title>
        <meta name="description" content={t('recipes.subtitle')} />
        <html lang={lang} />
      </Helmet>

      <section className="relative z-10 pt-32 pb-16 lg:pt-40">
        <div className="container-landing">
          <FadeContent blur duration={1000}>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h1 className="font-heading text-4xl lg:text-6xl font-semibold text-foreground mb-4">
                {t('recipes.title')}
              </h1>
              <p className="text-lg text-muted">{t('recipes.subtitle')}</p>
            </div>
          </FadeContent>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
            {recipes.map((r, i) => (
              <FadeContent key={r.id} blur duration={1000} delay={i * 100}>
                <Link
                  to={`/recipes/${r.slug}`}
                  className="group flex h-full rounded-3xl bg-card border border-border overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all"
                >
                  <div className="w-2/5 overflow-hidden">
                    <img
                      src={r.image}
                      alt={pick(lang, r.title)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="w-3/5 p-6">
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {pick(lang, r.tags).map((tag) => (
                        <span key={tag} className="label text-primary text-[0.6rem]">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h2 className="font-heading text-lg font-semibold text-foreground mb-2 leading-snug">
                      {pick(lang, r.title)}
                    </h2>
                    <p className="text-sm text-muted leading-relaxed line-clamp-3">
                      {pick(lang, r.description)}
                    </p>
                    <div className="text-xs text-muted mt-3">{r.prepTime}</div>
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
