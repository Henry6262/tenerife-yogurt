import { lazy, Suspense } from 'react';
import { ArrowRight, MapPin } from 'lucide-react';
import { BUSINESS } from '@/data/business';

const SoftAurora = lazy(() => import('@/components/SoftAurora'));

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
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

      {/* Content */}
      <div className="relative z-10 text-center lg:text-left px-4 max-w-4xl mx-auto lg:mx-0 lg:ml-[5%] lg:max-w-xl xl:max-w-2xl">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          Entregas activas en {BUSINESS.deliveryAreas.join(' & ')}
        </div>

        <h1 className="font-heading text-6xl sm:text-7xl lg:text-7xl xl:text-8xl font-bold text-foreground mb-6 tracking-tight">
          Yogurt Búlgaro{' '}
          <span className="text-primary">Artesanal</span>
        </h1>

        <p className="text-xl sm:text-2xl lg:text-3xl text-muted max-w-3xl mx-auto mb-10 leading-relaxed">
          4.000 años de tradición en cada tarro. Fermentado con{' '}
          <span className="font-semibold text-foreground">Lactobacillus bulgaricus</span>,
          la cepa probiótica original. Hecho en Tenerife con leche local.
          Sin aditivos. Alto en proteína.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-16">
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

        {/* Hero image — hidden on lg since 3D jar replaces it */}
        <div className="relative max-w-lg mx-auto lg:hidden rounded-3xl overflow-hidden shadow-2xl shadow-primary/10">
          <img
            src="https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&h=600&fit=crop"
            alt="Yogurt Búlgaro Artesanal"
            className="w-full h-auto"
            loading="eager"
          />
          <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 px-4 py-2 rounded-xl bg-white/90 backdrop-blur-sm text-sm text-muted">
            <MapPin size={16} className="text-primary" />
            Hecho a mano en {BUSINESS.location.split(',')[0]} · Km 0
          </div>
        </div>
      </div>
    </section>
  );
}
