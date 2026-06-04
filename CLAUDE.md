# CLAUDE.md — yogurt-landing

> Read `~/Documents/Gazillion-dollars/AGENTS.md` first.

## What it is

Landing page for Bulgarian Yogurt Tenerife — artisanal yogurt delivery in Santa Cruz & La Laguna.

## Tech stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- GSAP + ScrollTrigger (scroll animations)
- React Three Fiber + OGL (WebGL effects — SoftAurora, Grainient, ChromaCard)
- react-helmet-async (SEO meta tags & JSON-LD)
- lucide-react (icons)

## Key folder structure

```
yogurt-landing/
  index.html              # HTML shell with base meta tags
  src/
    App.tsx               # Page shell — renders all sections
    main.tsx              # Entry point
    index.css             # Tailwind directives + custom utilities
    sections/
      Navbar.tsx
      Hero.tsx
      Story.tsx
      Benefits.tsx
      Articles.tsx
      Recipes.tsx
      Athletes.tsx
      Pricing.tsx
      OrderForm.tsx
      Footer.tsx
    components/
      FadeContent.tsx     # GSAP scroll-reveal wrapper
      SoftAurora.tsx      # WebGL background (lazy)
      Grainient.tsx       # WebGL background (lazy)
      ChromaCard.tsx      # WebGL image card with hover FX (lazy)
      ScrollToTop.tsx
    data/
      articles.ts
      athletes.ts
      recipes.ts
    lib/
      utils.ts
```

## Design tokens (Tailwind)

- Primary: `#2563EB` (blue)
- Accent: `#059669` (green)
- Background: `#FAFAF9` (warm off-white)
- Foreground: `#1C1917` (near-black)
- Muted: `#78716C`
- Border: `#E7E5E4`
- Fonts: Inter (body), Space Grotesk (headings), Playfair Display (serif accents)

## Notes

- WebGL components are lazy-loaded with `React.lazy` + `Suspense` to avoid blocking initial paint.
- Order form submits to `/yogurt` (relative path). The backend is handled by the separate `tenerife-services` project.
- All images are Unsplash URLs for now.
- Articles include JSON-LD schema via `react-helmet-async` for SEO.

## Status

Active.

## Last updated

2026-06-02
