import { lazy, Suspense } from 'react';
import { ArrowRight } from 'lucide-react';
import { BUSINESS } from '@/data/business';
import HeroJar from '@/components/HeroJar';

const SoftAurora = lazy(() => import('@/components/SoftAurora'));

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen overflow-hidden pt-16">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={<div className="w-full h-full bg-gradient-to-b from-primary-light/20 to-background" />}>
          <SoftAurora
            speed={0.4}
            scale={1.8}
            brightness={0.8}
            color1="#DBEAFE"
            color2="#2563EB"
            noiseFrequency={2.0}
            enableMouseInteraction={true}
          />
        </Suspense>
      </div>

      {/* Two-column hero: text left, 3D jar right */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-10 min-h-[calc(100vh-4rem)] grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* LEFT — text */}
        <div className="text-center lg:text-left order-2 lg:order-1">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Entregas activas en {BUSINESS.deliveryAreas.join(' & ')}
          </div>

          <h1 className="font-heading text-5xl sm:text-6xl xl:text-7xl font-bold text-foreground mb-6 tracking-tight">
            Yogurt Búlgaro{' '}
            <span className="text-primary">Artesanal</span>
          </h1>

          <p className="text-lg sm:text-xl lg:text-2xl text-muted mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0">
            4.000 años de tradición en cada tarro. Fermentado con{' '}
            <span className="font-semibold text-foreground">Lactobacillus bulgaricus</span>,
            la cepa probiótica original. Hecho en Tenerife con leche local.
            Sin aditivos. Alto en proteína.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <a
              href="#order"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-primary text-white font-semibold text-lg shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 transition-all"
            >
              Hacer pedido — {BUSINESS.prices.currency}{BUSINESS.prices.oneTime}
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#story"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl border-2 border-primary text-primary font-semibold text-lg hover:bg-primary hover:text-white transition-all"
            >
              Conocer más
            </a>
          </div>
        </div>

        {/* RIGHT — 3D jar in its own canvas */}
        <div className="relative order-1 lg:order-2 h-[42vh] sm:h-[50vh] lg:h-[78vh] w-full">
          <HeroJar />
        </div>
      </div>
    </section>
  );
}
