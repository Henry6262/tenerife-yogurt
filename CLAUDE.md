# CLAUDE.md — yogurt-landing (Krava)

> Read `~/Documents/Gazillion-dollars/AGENTS.md` first.

## What it is

**Krava** — landing site for a premium Bulgarian yogurt brand in **Zürich, Switzerland**.
Tagline: *"Swiss Purity, Bulgarian Soul"* / *"Schweizer Reinheit, bulgarische Seele"*.
Three sales channels: **D2C** (one-time jars), **Subscription**, and **B2B gastronomy** (restaurants).
Bilingual **DE + EN**. Lead-capture only (no payment yet); Twint shown as a trust badge.

> History: this repo began as a Spanish "Bulgarian Yogurt Tenerife" site. The Tenerife
> version lives in git history before the `feat/krava-swiss-pivot` work.

## Tech stack

- React 18 + TypeScript + Vite
- **react-router-dom** — routed (see Routes)
- Tailwind CSS (nosiya-red / cream / ink palette)
- GSAP + ScrollTrigger (scroll reveals via `FadeContent`)
- React Three Fiber + OGL (3D hero jar, Silk background)
- react-helmet-async (per-route SEO + JSON-LD)
- marked + @tailwindcss/typography (article rendering)
- lucide-react (icons)

## Routes

- `/` — lean home: Hero · DualGateway · ProductLine · Subscriptions · CircleProtocol · Transparency · SubscribeForm
- `/chefs` — B2B portal (value props, crate-credit loop, ChefForm)
- `/articles`, `/articles/:slug` — bilingual journal
- `/recipes`, `/recipes/:slug` — bilingual serving ideas
- `*` → redirect to `/`

## Key folders

```
src/
  main.tsx                # RouterProvider + LangProvider + HelmetProvider
  router.tsx              # route table
  layout/RootLayout.tsx   # shared chrome (bg, Navbar, Outlet, Footer, ScrollToTop)
  i18n/
    strings.ts            # DE/EN chrome dictionary + StringKey
    LangContext.tsx       # LangProvider, useLang(), t(), pick()
  data/
    brand.ts              # BRAND config: products, plans, circle, sourcing, impressum, fmtCHF, p()
    articles.ts           # bilingual Article[]
    recipes.ts            # bilingual Recipe[]
  lib/leads.ts            # submitLead() → single endpoint w/ channel discriminator
  pages/                  # Home, Chefs, ArticlesIndex, ArticleDetail, RecipesIndex, RecipeDetail
  sections/               # Navbar, Hero, DualGateway, ProductLine, Subscriptions,
                          # CircleProtocol, Transparency, SubscribeForm, ChefForm, Footer
  components/             # FadeContent, LangToggle, ScrollToTop, Silk/Grain/Scene3D, HeroJar, …
```

## i18n

Library-free. All chrome copy via `t('key')`; content records are `{ de, en }` resolved
with `pick(lang, …)` (from LangContext) or `p(lang, …)` (data-layer helper in brand.ts).
Lang persisted to `localStorage['krava.lang']` (default `de`), sets `<html lang>`.
Swiss High German: always `ss`, never `ß`.

## Leads

`lib/leads.ts` `submitLead()` POSTs to `VITE_API_URL || http://localhost:3000/api/yogurt-leads`
with `channel: 'subscription' | 'one-time' | 'b2b'`. B2B adds `restaurant`, `weeklyVolumeKg`.
Backend (separate `tenerife-services` project) must accept these fields.

## Brand assets

- Logo: `public/krava-logo.jpg` (cow in nosiya bandana) — used as favicon, navbar, footer.
- `public/krava-cow.svg` — earlier placeholder mascot (superseded by the real logo).

## Design tokens (Tailwind)

- Primary: `#B3242B` (nosiya red), light `#E8B4B0`, dark `#8E1A20`
- Background/cream: `#FAF6EF` · Foreground/ink: `#1C1917` · Muted: `#8A817C` · Border: `#EBE4D8`
- Gold `#C9A961`, sage `#7A8A6F` retained as secondaries
- Fonts: Inter (body), Fraunces (headings/serif)

## Notes

- Home sections use GSAP `FadeContent` (opacity-0 until scrolled into view) — a static
  full-page screenshot shows them blank; they reveal on real scroll. Not a bug.
- Prices are CHF: Daily 8.50 / Strained 15 / Reserve 1L 24; subs Performance 65, Elite 95 /mo.

## Status

Active — Swiss Krava pivot on branch `feat/krava-swiss-pivot`.

## Last updated

2026-06-07
