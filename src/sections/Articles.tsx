import { useState } from 'react';
import { ArrowRight, Clock, Tag } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { articles } from '@/data/articles';
import type { Article } from '@/data/articles';
import FadeContent from '@/components/FadeContent';
import ArticleModal from '@/components/ArticleModal';

export default function Articles() {
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);

  const articleSchemas = articles.map((article) => ({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: article.image,
    author: {
      '@type': 'Organization',
      name: article.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Yogurt Búlgaro Artesanal Tenerife',
    },
    datePublished: article.datePublished,
    keywords: article.keywords.join(', '),
  }));

  return (
    <section id="articles" className="relative z-10 py-24 lg:py-32 bg-background">
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(articleSchemas)}
        </script>
      </Helmet>

      <ArticleModal article={activeArticle} onClose={() => setActiveArticle(null)} />
      <div className="section-container">
        <FadeContent blur duration={1000}>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
              Blog & Ciencia
            </span>
            <h2 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-4">
              Beneficios del Yogurt Búlgaro
            </h2>
            <p className="text-xl lg:text-2xl text-muted">
              Historias reales, ciencia probada y todo lo que necesitas saber sobre el yogurt más saludable del mundo.
            </p>
          </div>
        </FadeContent>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, i) => (
            <FadeContent key={article.id} blur duration={1000} delay={i * 150}>
              <article className="group flex flex-col h-full rounded-3xl border border-border bg-white overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-semibold text-primary">
                      {article.category}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col flex-1 p-6">
                  <div className="flex items-center gap-4 text-xs text-muted mb-3">
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {article.readTime}
                    </span>
                    <span>{article.datePublished}</span>
                  </div>
                  <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-base text-muted line-clamp-3 mb-4 flex-1">{article.excerpt}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {article.keywords.slice(0, 2).map((kw) => (
                      <span key={kw} className="flex items-center gap-1 text-xs text-muted bg-border/50 px-2 py-1 rounded-lg">
                        <Tag size={10} />
                        {kw}
                      </span>
                    ))}
                  </div>
                  <div className="pt-4 border-t border-border">
                    <button
                      onClick={() => setActiveArticle(article)}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all"
                    >
                      Leer artículo <ArrowRight size={16} />
                    </button>
                  </div>
                </div>

              </article>
            </FadeContent>
          ))}
        </div>
      </div>
    </section>
  );
}
