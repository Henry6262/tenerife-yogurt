import { ExternalLink, Clock, Flame, ChefHat } from 'lucide-react';
import { recipes } from '@/data/recipes';
import FadeContent from '@/components/FadeContent';

export default function Recipes() {
  return (
    <section id="recipes" className="relative z-10 py-24 lg:py-32 bg-white">
      <div className="section-container">
        <FadeContent blur duration={1000}>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold uppercase tracking-wider mb-4">
              Recetas
            </span>
            <h2 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-4">
              Cocina con Yogurt Búlgaro
            </h2>
            <p className="text-xl lg:text-2xl text-muted">
              Desde smoothies post-entreno hasta postres gourmet. Descubre lo versátil que es.
            </p>
          </div>
        </FadeContent>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recipes.map((recipe, i) => (
            <FadeContent key={recipe.id} blur duration={1000} delay={i * 150}>
              <div className="group flex flex-col h-full rounded-3xl border border-border bg-background overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
                    {recipe.tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 rounded-lg bg-white/90 backdrop-blur-sm text-xs font-medium text-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col flex-1 p-6">
                  <div className="flex items-center gap-4 text-xs text-muted mb-3">
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {recipe.prepTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <Flame size={14} />
                      {recipe.calories}
                    </span>
                    <span className="flex items-center gap-1">
                      <ChefHat size={14} />
                      {recipe.difficulty}
                    </span>
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {recipe.title}
                  </h3>
                  <p className="text-base lg:text-lg text-muted mb-6 flex-1">{recipe.description}</p>
                  <a
                    href={recipe.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-red-600 text-white font-semibold text-sm hover:bg-red-700 transition-colors"
                  >
                    <ExternalLink size={16} />
                    Ver receta en YouTube
                  </a>
                </div>
              </div>
            </FadeContent>
          ))}
        </div>
      </div>
    </section>
  );
}
