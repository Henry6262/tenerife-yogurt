# Yogurt Landing — Redesign Plan (Warm Cream Premium · Rich motion)

Direction chosen by Henry: **Warm Cream Premium** palette + **Rich** interactivity.
Blueprint: `normie-apps/sauce-empire` (same Vite+R3F+GSAP+Lenis+motion stack). Components vendored from sauce-empire `/src/free` + react-bits-vault.

## Design system
- **Palette** (Tailwind tokens): `cream #FAF6EF` bg · `ink #1C1917` text · `accent/terracotta #C36A4C` · `gold #C9A961` · `sage #7A8A6F` · `muted #8A817C` · `card #FFFFFF` · `line #EBE4D8`
- **Type**: Display = **Fraunces** (warm organic serif) · Body = **Inter**. Big editorial scale: hero `text-7xl/8xl`, `leading-[0.95]`, `tracking-tight`.
- **Texture**: film **Grain** overlay (fixed, 4%), warm **Silk** shader in hero.
- **Motion**: **Lenis** smooth scroll · scroll-reveal on every section · **CountUp** stats · **SpotlightCard/TiltedCard** products · **ShinyText/GradientText** accents · **StarBorder** CTAs · keep 3D jar + fruit-drop.

## Build phases
1. **Foundation** — lenis dep; copy `/src/free` (Silk, StarBorder, SpotlightCard, ShinyText, CountUp, ScrollReveal, SplitText, AnimatedContent) + Grain/SmoothScroll/Divider; new palette in tailwind.config + index.css; load Fraunces/Inter; wire SmoothScroll + Grain in App.
2. **Hero** — huge Fraunces headline (2-line staggered), warm Silk bg, grain, jar right (HeroJar), StarBorder CTA, CountUp stat strip.
3. **Sections** — scroll-reveal wrappers; Story (keep bowl drop) + big type; Benefits → SpotlightCard grid; new Stats band (CountUp); Pricing → highlighted tier + StarBorder; Articles/Recipes/Athletes → TiltedCard galleries; Nav/Footer palette; Roman-numeral Dividers.
4. **Verify + ship** — build, screenshot hero + 2 sections, deploy prod.

## Notes
- Hero background image: Henry supplying; layer as `<img>`/video under Silk+grain+jar.
- Tailwind v3 (config-based), `@` → `src`.
