import { Helmet } from 'react-helmet-async';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, Clock, ChefHat } from 'lucide-react';
import { useLang, pick } from '@/i18n/LangContext';
import { recipes } from '@/data/recipes';
import FadeContent from '@/components/FadeContent';

export default function RecipeDetail() {
  const { slug } = useParams();
  const { lang, t } = useLang();
  const recipe = recipes.find((r) => r.slug === slug);

  if (!recipe) return <Navigate to="/recipes" replace />;

  const title = pick(lang, recipe.title);
  const description = pick(lang, recipe.description);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: title,
    description,
    image: recipe.image,
    recipeIngredient: pick(lang, recipe.ingredients),
    totalTime: recipe.prepTime,
    author: { '@type': 'Organization', name: 'Krava' },
  };

  return (
    <>
      <Helmet>
        <title>{`${title} — Krava`}</title>
        <meta name="description" content={description} />
        <html lang={lang} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <article className="relative z-10 pt-32 pb-24 lg:pt-40">
        <div className="container-landing max-w-3xl mx-auto">
          <FadeContent blur duration={800}>
            <Link to="/recipes" className="inline-flex items-center gap-2 text-sm font-medium text-primary mb-8 hover:gap-3 transition-all">
              <ArrowLeft size={16} />
              {t('common.back')}
            </Link>

            <h1 className="font-heading text-3xl lg:text-5xl font-semibold text-foreground mb-4 leading-tight">
              {title}
            </h1>
            <p className="text-lg text-muted mb-6">{description}</p>

            <div className="flex flex-wrap gap-6 mb-10 text-sm">
              <span className="inline-flex items-center gap-2 text-muted">
                <Clock size={16} className="text-primary" />
                {t('recipes.prep')}: {recipe.prepTime}
              </span>
              <span className="inline-flex items-center gap-2 text-muted">
                <ChefHat size={16} className="text-primary" />
                {t('recipes.difficulty')}: {pick(lang, recipe.difficulty)}
              </span>
            </div>

            <div className="aspect-[16/9] rounded-2xl overflow-hidden mb-10">
              <img src={recipe.image} alt={title} className="w-full h-full object-cover" />
            </div>

            <div className="grid md:grid-cols-5 gap-10">
              <div className="md:col-span-2">
                <h2 className="font-heading text-xl font-semibold text-foreground mb-4">
                  {t('recipes.ingredients')}
                </h2>
                <ul className="space-y-2">
                  {pick(lang, recipe.ingredients).map((ing) => (
                    <li key={ing} className="flex gap-2 text-muted">
                      <span className="text-primary">•</span>
                      {ing}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="md:col-span-3">
                <h2 className="font-heading text-xl font-semibold text-foreground mb-4">
                  {t('recipes.method')}
                </h2>
                <ol className="space-y-4">
                  {pick(lang, recipe.method).map((step, i) => (
                    <li key={i} className="flex gap-3 text-muted">
                      <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary/10 text-primary font-semibold text-sm flex items-center justify-center">
                        {i + 1}
                      </span>
                      <span className="pt-0.5">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </FadeContent>
        </div>
      </article>
    </>
  );
}
