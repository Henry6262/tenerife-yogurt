import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLang } from '@/i18n/LangContext';
import type { StringKey } from '@/i18n/strings';
import BreakfastBowl from '@/components/BreakfastBowl';

gsap.registerPlugin(ScrollTrigger);

const TOPPINGS: { key: StringKey; color: string }[] = [
  { key: 'breakfast.t1', color: '#D7263D' }, // strawberry
  { key: 'breakfast.t2', color: '#3A5BA0' }, // blueberry
  { key: 'breakfast.t3', color: '#D8B384' }, // almond
  { key: 'breakfast.t4', color: '#8A5A2B' }, // hazelnut
  { key: 'breakfast.t5', color: '#C8893E' }, // granola
  { key: 'breakfast.t6', color: '#5B5B52' }, // seeds
];

export default function Breakfast() {
  const { t } = useLang();
  const pinRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);

  // Pin the section and scrub the fruit-drop with scroll. Once the animation
  // finishes the pin releases and the page scrolls on normally.
  useEffect(() => {
    const el = pinRef.current;
    if (!el) return;
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top top',
      end: () => '+=' + Math.round(window.innerHeight * 1.6),
      pin: true,
      pinSpacing: true,
      scrub: true,
      anticipatePin: 1,
      onUpdate: (self) => {
        progressRef.current = self.progress;
      },
    });
    return () => st.kill();
  }, []);

  return (
    <section id="breakfast" className="relative z-10">
      <div ref={pinRef} className="h-screen overflow-hidden">
        <div className="container-landing flex h-full items-center">
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

            {/* 3D bowl filling as you scroll (scrubbed while pinned) */}
            <div className="order-1 lg:order-2 relative h-[44vh] sm:h-[52vh] lg:h-[78vh] w-full">
              <BreakfastBowl progressRef={progressRef} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
