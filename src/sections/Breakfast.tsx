import { useEffect, useRef } from 'react';
import { useLang } from '@/i18n/LangContext';
import type { StringKey } from '@/i18n/strings';
import BreakfastBowl from '@/components/BreakfastBowl';

const TOPPINGS: { key: StringKey; color: string }[] = [
  { key: 'breakfast.t1', color: '#D7263D' }, // strawberry
  { key: 'breakfast.t2', color: '#3A5BA0' }, // blueberry
  { key: 'breakfast.t3', color: '#D8B384' }, // almond
  { key: 'breakfast.t4', color: '#8A5A2B' }, // hazelnut
];

export default function Breakfast() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef(0);

  // Drive the bowl from this section's own scroll position (rect-based —
  // no GSAP/context dependency, and the ref crosses the R3F canvas boundary).
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const el = sectionRef.current;
      if (el) {
        const r = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const range = vh * 0.6 + r.height; // top@80% → bottom@20%
        const scrolled = vh * 0.8 - r.top;
        progressRef.current = Math.min(1, Math.max(0, scrolled / range));
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section ref={sectionRef} id="breakfast" className="relative z-10 min-h-[210vh]">
      <div className="container-landing">
        <div className="sticky top-0 flex min-h-screen items-center">
          <div className="grid w-full items-center gap-8 lg:grid-cols-2">
            {/* text */}
            <div className="order-2 lg:order-1 max-w-md">
              <span className="label text-primary">{t('breakfast.eyebrow')}</span>
              <h2 className="font-heading text-4xl lg:text-5xl xl:text-6xl font-semibold text-foreground mt-4 mb-5">
                {t('breakfast.title')}
              </h2>
              <p className="text-lg text-muted leading-relaxed mb-8">{t('breakfast.body')}</p>

              <ul className="flex flex-wrap gap-x-6 gap-y-3">
                {TOPPINGS.map((top) => (
                  <li key={top.key} className="inline-flex items-center gap-2.5 text-foreground">
                    <span className="h-3 w-3 rounded-full" style={{ background: top.color }} />
                    <span className="text-sm font-medium">{t(top.key)}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 3D bowl filling as you scroll */}
            <div className="order-1 lg:order-2 relative h-[44vh] sm:h-[52vh] lg:h-[80vh] w-full">
              <BreakfastBowl progressRef={progressRef} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
