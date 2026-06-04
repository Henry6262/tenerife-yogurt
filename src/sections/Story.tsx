import { lazy, Suspense } from 'react';
import { BUSINESS } from '@/data/business';
import FadeContent from '@/components/FadeContent';
import SectionTrigger from '@/components/SectionTrigger';

const Grainient = lazy(() => import('@/components/Grainient'));

export default function Story() {
  return (
    <SectionTrigger id="story" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={<div className="w-full h-full bg-gradient-to-br from-primary-light/10 to-background" />}>
          <Grainient
            color1="#DBEAFE"
            color2="#2563EB"
            color3="#FAFAF9"
            grainAmount={0.05}
            contrast={1.2}
            warpStrength={0.5}
            className="opacity-40"
          />
        </Suspense>
      </div>

      <div className="section-container relative z-10 pointer-events-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <FadeContent blur duration={1200}>
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
                Nuestra Historia
              </span>
              <h2 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-6">
                4.000 años de tradición en cada cucharada
              </h2>
              <div className="space-y-4 text-muted leading-relaxed">
                <p>
                  En los montes Ródope de Bulgaria, donde el aire es puro y los pastos son exuberantes,
                  nació una tradición que ha sobrevivido milenios. Los pastores búlgaros descubrieron
                  que la leche fermentada naturalmente en sus pieles de cabra creaba un alimento
                  extraordinario: <strong className="text-foreground">el yogurt búlgaro</strong>.
                </p>
                <p>
                  En 1905, el médico <strong className="text-foreground">Stamen Grigorov</strong>{' '}
                  identificó la bacteria responsable:{' '}
                  <em className="text-foreground">Lactobacillus bulgaricus</em>. Una cepa única,
                  nativa de Bulgaria, que no se encuentra en ningún otro lugar del mundo con la
                  misma potencia.
                </p>
                <p>
                  Hoy traemos esa tradición a Tenerife. Fermentamos lentamente con cultivos auténticos
                  importados de Bulgaria, usando leche local de cabras y vacas de la isla.
                  Cada tarro es una conexión directa con 4.000 años de sabiduría.
                </p>
              </div>
            </div>
          </FadeContent>

          <FadeContent blur duration={1200} delay={200}>
            {/* 3D bowl replaces this image on desktop */}
            <div className="relative lg:hidden">
              <div className="rounded-3xl overflow-hidden shadow-2xl shadow-primary/10">
                <img
                  src="https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=800&h=1000&fit=crop"
                  alt="Tradición del yogurt búlgaro"
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              </div>
              {/* Floating stat card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-5 border border-border">
                <div className="text-4xl font-bold text-primary">4.000+</div>
                <div className="text-sm text-muted">Años de tradición</div>
              </div>
              <div className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-xl p-5 border border-border">
                <div className="text-4xl font-bold text-primary">{BUSINESS.product.proteinPerJar}</div>
                <div className="text-sm text-muted">Proteína / tarro</div>
              </div>
            </div>
          </FadeContent>
        </div>
      </div>
    </SectionTrigger>
  );
}
