import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Lenis smooth scroll, wired into GSAP's ticker so every ScrollTrigger
 *  (scroll-reveals + the section-2 fruit-drop) stays perfectly in sync. */
export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2 });

    lenis.on("scroll", ScrollTrigger.update);

    const update = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, []);

  return null;
}
