# Krava

Landing site for **Krava** — premium Bulgarian yogurt in **Zürich** ("Swiss Purity, Bulgarian Soul").
Bilingual DE/EN, three channels: direct-to-consumer, subscription, and B2B gastronomy.

## Quick start

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Output goes to `dist/`.

## Tech stack

- React 18 + TypeScript + Vite
- react-router-dom (routed: `/`, `/chefs`, `/articles[/:slug]`, `/recipes[/:slug]`)
- Tailwind CSS (nosiya-red / cream / ink)
- GSAP + ScrollTrigger, React Three Fiber + OGL (3D jar + Silk background)
- react-helmet-async (per-route SEO + JSON-LD)
- marked + @tailwindcss/typography
- lucide-react

## Project structure

```
yogurt-landing/
  index.html
  src/
    main.tsx        # RouterProvider + LangProvider + HelmetProvider
    router.tsx
    layout/         # RootLayout (shared chrome)
    i18n/           # DE/EN dictionary + LangContext
    data/           # brand.ts, articles.ts, recipes.ts
    lib/            # leads.ts (single endpoint, channel field)
    pages/          # Home, Chefs, Articles*, Recipes*
    sections/       # Hero, DualGateway, ProductLine, Subscriptions, CircleProtocol, …
    components/     # FadeContent, LangToggle, WebGL, …
```

See `CLAUDE.md` for the full architecture, i18n, and lead-flow notes.
