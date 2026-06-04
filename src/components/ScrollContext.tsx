import { createContext, useContext, useRef, useEffect, useCallback, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface SectionState {
  progress: number;   // 0 → 1 within the section's scroll range
  isActive: boolean;  // section is currently in the active trigger zone
  direction: number;  // 1 = down, -1 = up
}

interface ScrollContextValue {
  global: { progress: number; y: number };
  sections: Map<string, SectionState>;
  registerSection: (id: string, el: HTMLElement | null, start?: string, end?: string) => () => void;
}

const ScrollContext = createContext<ScrollContextValue>({
  global: { progress: 0, y: 0 },
  sections: new Map(),
  registerSection: () => () => {},
});

export function ScrollProvider({ children }: { children: ReactNode }) {
  const globalRef = useRef({ progress: 0, y: 0 });
  const sectionsRef = useRef(new Map<string, SectionState>());
  const triggersRef = useRef<ScrollTrigger[]>([]);

  // Global scroll listener
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      globalRef.current = {
        y,
        progress: max > 0 ? Math.min(1, Math.max(0, y / max)) : 0,
      };
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const registerSection = useCallback(
    (id: string, el: HTMLElement | null, start = 'top 80%', end = 'bottom 20%') => {
      // Clean up old trigger for this id
      const old = triggersRef.current.find((t) => t.vars.id === id);
      if (old) {
        old.kill();
        triggersRef.current = triggersRef.current.filter((t) => t.vars.id !== id);
      }

      if (!el) return () => {};

      // Initialize state
      sectionsRef.current.set(id, { progress: 0, isActive: false, direction: 1 });

      const st = ScrollTrigger.create({
        id,
        trigger: el,
        start,
        end,
        scrub: 0.5,
        onUpdate: (self) => {
          sectionsRef.current.set(id, {
            progress: self.progress,
            isActive: self.isActive,
            direction: self.direction,
          });
        },
        onLeave: () => {
          sectionsRef.current.set(id, { progress: 1, isActive: false, direction: 1 });
        },
        onEnterBack: () => {
          sectionsRef.current.set(id, { progress: 1, isActive: true, direction: -1 });
        },
      });

      triggersRef.current.push(st);

      return () => {
        st.kill();
        triggersRef.current = triggersRef.current.filter((t) => t !== st);
        sectionsRef.current.delete(id);
      };
    },
    []
  );

  useEffect(() => {
    return () => {
      triggersRef.current.forEach((t) => t.kill());
      triggersRef.current = [];
    };
  }, []);

  const valueRef = useRef<ScrollContextValue>({
    get global() {
      return globalRef.current;
    },
    get sections() {
      return sectionsRef.current;
    },
    registerSection,
  });

  return (
    <ScrollContext.Provider value={valueRef.current}>
      {children}
    </ScrollContext.Provider>
  );
}

export function useScrollRef() {
  return useContext(ScrollContext);
}

export function useSection(id: string): SectionState {
  const ctx = useContext(ScrollContext);
  const stateRef = useRef<SectionState>({ progress: 0, isActive: false, direction: 1 });

  useEffect(() => {
    // Poll for section state updates
    let raf: number;
    const tick = () => {
      const s = ctx.sections.get(id);
      if (s) stateRef.current = s;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [ctx, id]);

  return stateRef.current;
}
