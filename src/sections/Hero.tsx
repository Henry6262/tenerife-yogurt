import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLang } from '@/i18n/LangContext';
import { BRAND, p } from '@/data/brand';
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
  const { lang, t } = useLang();
  const [line1, line2] = p(lang, BRAND.tagline).split(',');

  return (
    <section id="hero" className="relative min-h-screen overflow-hidden pt-16">
      {/* Two-column hero: text left, 3D jar right (global Silk shows through) */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-10 min-h-[calc(100vh-4rem)] grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* LEFT — text */}
        <AnimatedContent distance={60} duration={1} ease="power3.out" className="text-center lg:text-left order-2 lg:order-1">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-7 label">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            {t('hero.badge')}
          </div>

          <h1 className="font-heading text-5xl sm:text-6xl lg:text-5xl xl:text-6xl font-semibold text-foreground leading-[1.02] tracking-tight mb-6">
            {/* Two balanced rows, two words each — keep each phrase whole on desktop */}
            <span className="block lg:whitespace-nowrap">{line1.trim()},</span>
            <span className="block mt-1 lg:whitespace-nowrap">
              <ShinyText text={line2.trim()} speed={4} color="#B3242B" shineColor="#E8B4B0" className="font-semibold" />
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-muted leading-relaxed max-w-xl mx-auto lg:mx-0 mb-9">
            {t('hero.sub')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-12">
            <a
              href="#subscribe"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-primary text-white font-semibold text-lg shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/35 hover:-translate-y-0.5 transition-all"
            >
              {t('cta.subscribe')}
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <Link
              to="/chefs"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl border-2 border-primary/35 text-primary font-semibold text-lg hover:bg-primary hover:text-white hover:border-primary transition-all"
            >
              {t('cta.chefTasting')}
            </Link>
          </div>

          {/* Animated stat strip */}
          <div className="flex items-center justify-center lg:justify-start gap-8 sm:gap-10">
            <Stat value={<CountUp to={4000} separator={lang === 'de' ? '.' : ','} />} label={t('hero.stat.tradition')} />
            <div className="h-10 w-px bg-border" />
            <Stat value={<>2:1</>} label={t('hero.stat.strained')} />
            <div className="h-10 w-px bg-border" />
            <Stat value={<><CountUp to={100} />%</>} label={t('hero.stat.natural')} />
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
