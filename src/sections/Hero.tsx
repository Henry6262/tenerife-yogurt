import { type ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import { BUSINESS } from '@/data/business';
import HeroJar from '@/components/HeroJar';
import ShinyText from '@/free/TextAnimations/ShinyText/ShinyText';
import CountUp from '@/free/TextAnimations/CountUp/CountUp';
import AnimatedContent from '@/free/Animations/AnimatedContent/AnimatedContent';

function Stat({ value, label }: { value: ReactNode; label: string }) {
  return (
    <div className="text-center lg:text-left">
      <div className="font-heading text-3xl sm:text-4xl font-semibold text-foreground leading-none">
        {value}
      </div>
      <div className="label text-muted mt-2">{label}</div>
    </div>
  );
}

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen overflow-hidden pt-16">
      {/* Two-column hero: text left, 3D jar right (global Silk shows through) */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-10 min-h-[calc(100vh-4rem)] grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* LEFT — text */}
        <AnimatedContent distance={60} duration={1} ease="power3.out" className="text-center lg:text-left order-2 lg:order-1">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-7 label">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Entregas en {BUSINESS.deliveryAreas.join(' & ')}
          </div>

          <h1 className="font-heading text-6xl sm:text-7xl xl:text-[5.5rem] font-semibold text-foreground leading-[0.95] tracking-tight mb-6">
            Yogurt Búlgaro
            <span className="block mt-1">
              <ShinyText text="Artesanal" speed={4} color="#C36A4C" shineColor="#E4D2A6" className="font-semibold" />
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-muted leading-relaxed max-w-xl mx-auto lg:mx-0 mb-9">
            4.000 años de tradición en cada tarro. Fermentado con{' '}
            <span className="font-semibold text-foreground">Lactobacillus bulgaricus</span>,
            la cepa probiótica original. Hecho en Tenerife con leche local. Sin aditivos.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-12">
            <a
              href="#order"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-primary text-white font-semibold text-lg shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/35 hover:-translate-y-0.5 transition-all"
            >
              Hacer pedido — {BUSINESS.prices.currency}{BUSINESS.prices.oneTime}
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#story"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl border-2 border-primary/35 text-primary font-semibold text-lg hover:bg-primary hover:text-white hover:border-primary transition-all"
            >
              Conocer más
            </a>
          </div>

          {/* Animated stat strip */}
          <div className="flex items-center justify-center lg:justify-start gap-8 sm:gap-10">
            <Stat value={<CountUp to={4000} separator="." />} label="años de tradición" />
            <div className="h-10 w-px bg-border" />
            <Stat value={<><CountUp to={15} />g</>} label="proteína / tarro" />
            <div className="h-10 w-px bg-border" />
            <Stat value={<><CountUp to={100} />%</>} label="natural" />
          </div>
        </AnimatedContent>

        {/* RIGHT — 3D jar in its own canvas */}
        <div className="relative order-1 lg:order-2 h-[42vh] sm:h-[50vh] lg:h-[78vh] w-full">
          <HeroJar />
        </div>
      </div>
    </section>
  );
}
