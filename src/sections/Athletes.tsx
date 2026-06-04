import { Suspense, lazy } from 'react';
import { athletes } from '@/data/athletes';
import FadeContent from '@/components/FadeContent';

const ChromaCard = lazy(() => import('@/components/ChromaCard'));

export default function Athletes() {
  return (
    <section id="athletes" className="relative z-10 py-24 lg:py-32">
      <div className="section-container">
        <FadeContent blur duration={1000}>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
              Nuestros Atletas
            </span>
            <h2 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-4">
              Fuerza, recuperación y rendimiento
            </h2>
            <p className="text-xl lg:text-2xl text-muted">
              Atletas de élite que confían en el Yogurt Búlgaro para su recuperación y rendimiento.
            </p>
          </div>
        </FadeContent>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {athletes.map((athlete, i) => (
            <FadeContent key={athlete.id} blur duration={1000} delay={i * 200}>
              <div className="flex flex-col items-center">
                <div className="w-full aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl shadow-primary/10">
                  <Suspense
                    fallback={
                      <div className="w-full h-full bg-border animate-pulse flex items-center justify-center">
                        <span className="text-muted text-sm">Cargando...</span>
                      </div>
                    }
                  >
                    <ChromaCard
                      width="100%"
                      height="100%"
                      imageSrc={athlete.image}
                      imageAspectRatio={0.75}
                      cardWidth={5}
                      cardHeight={7}
                      zoomLevel={0.25}
                      rgbShiftAmount={0.025}
                      pixelDisplaceAmount={0.1}
                      hoverDuration={2.5}
                      rotationIntensity={0.15}
                      scaleIntensity={0.08}
                      borderRadius={24}
                    />
                  </Suspense>
                </div>
                <div className="mt-6 text-center">
                  <h3 className="text-2xl lg:text-3xl font-bold text-foreground">{athlete.name}</h3>
                  <p className="text-base lg:text-lg text-primary font-semibold uppercase tracking-wider mt-1">
                    {athlete.sport}
                  </p>
                  <p className="text-sm lg:text-base text-muted mt-1">{athlete.stats}</p>
                  <blockquote className="mt-4 text-base lg:text-lg text-muted italic max-w-xs mx-auto">
                    "{athlete.quote}"
                  </blockquote>
                </div>
              </div>
            </FadeContent>
          ))}
        </div>
      </div>
    </section>
  );
}
