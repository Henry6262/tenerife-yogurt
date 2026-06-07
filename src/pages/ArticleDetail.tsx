import { Helmet } from 'react-helmet-async';
import { Link, Navigate, useParams } from 'react-router-dom';
import { marked } from 'marked';
import { ArrowLeft } from 'lucide-react';
import { useLang, pick } from '@/i18n/LangContext';
import { articles } from '@/data/articles';
import FadeContent from '@/components/FadeContent';

export default function ArticleDetail() {
  const { slug } = useParams();
  const { lang, t } = useLang();
  const article = articles.find((a) => a.slug === slug);

  if (!article) return <Navigate to="/articles" replace />;

  const title = pick(lang, article.title);
  const description = pick(lang, article.excerpt);
  const html = marked.parse(pick(lang, article.content), { async: false }) as string;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image: article.image,
    datePublished: article.datePublished,
    author: { '@type': 'Organization', name: article.author },
    keywords: article.keywords.join(', '),
  };

  return (
    <>
      <Helmet>
        <title>{`${title} — Krava`}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={article.keywords.join(', ')} />
        <html lang={lang} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <article className="relative z-10 pt-32 pb-24 lg:pt-40">
        <div className="container-landing max-w-3xl mx-auto">
          <FadeContent blur duration={800}>
            <Link to="/articles" className="inline-flex items-center gap-2 text-sm font-medium text-primary mb-8 hover:gap-3 transition-all">
              <ArrowLeft size={16} />
              {t('common.back')}
            </Link>

            <span className="label text-primary">{pick(lang, article.category)}</span>
            <h1 className="font-heading text-3xl lg:text-5xl font-semibold text-foreground mt-3 mb-4 leading-tight">
              {title}
            </h1>
            <div className="text-sm text-muted mb-8">
              {article.author} · {article.readTime}
            </div>

            <div className="aspect-[16/9] rounded-2xl overflow-hidden mb-10">
              <img src={article.image} alt={title} className="w-full h-full object-cover" />
            </div>

            <div
              className="prose prose-stone max-w-none prose-headings:font-heading prose-a:text-primary"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </FadeContent>
        </div>
      </article>
    </>
  );
}
