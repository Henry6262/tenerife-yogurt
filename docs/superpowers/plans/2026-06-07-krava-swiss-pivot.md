# Krava Swiss Pivot Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the Spanish Tenerife yogurt landing into **Krava** — a bilingual (DE/EN) Zürich premium-yogurt brand with three channels (D2C, subscription, B2B chefs), routed lean home, Circle Protocol jar-return loop, and Swiss compliance surface.

**Architecture:** React 18 + Vite + Tailwind + GSAP/R3F (existing engine, recolored). Add `react-router-dom` for a lean home + `/chefs`, `/articles[/:slug]`, `/recipes[/:slug]`. A library-free i18n layer (`{de,en}` dictionary + `LangContext`) drives all copy. A single `data/brand.ts` config holds products/plans/circle/sourcing/impressum. Forms POST to one leads endpoint with a `channel` discriminator.

**Tech Stack:** react-router-dom, React Context (i18n), Tailwind tokens, lucide-react, marked + @tailwindcss/typography (already installed), react-helmet-async.

**Testing note:** This repo has **no unit-test runner** and is a UI/content pilot. Per-task verification = `npm run build` passes (tsc typecheck + vite build) **and** the stated render/behavior check in the dev server. We do not add a test framework (YAGNI). Commit after each green task.

---

## File Structure

**Create:**
- `src/router.tsx` — route table
- `src/layout/RootLayout.tsx` — shared chrome (bg, Navbar, Outlet, Footer, ScrollToTop)
- `src/i18n/strings.ts` — chrome/UI dictionary `{de,en}`
- `src/i18n/LangContext.tsx` — `LangProvider`, `useLang()`, `t()`
- `src/components/LangToggle.tsx` — DE/EN pill
- `src/data/brand.ts` — Krava config (replaces `business.ts`)
- `src/sections/DualGateway.tsx`
- `src/sections/ProductLine.tsx` — replaces `Pricing.tsx`
- `src/sections/Subscriptions.tsx`
- `src/sections/CircleProtocol.tsx`
- `src/sections/Transparency.tsx` — replaces `Story.tsx` + `Benefits.tsx`
- `src/sections/SubscribeForm.tsx` — D2C/subscription lead (from `OrderForm.tsx`)
- `src/sections/ChefForm.tsx` — B2B lead
- `src/pages/Home.tsx`
- `src/pages/Chefs.tsx`
- `src/pages/ArticlesIndex.tsx`, `src/pages/ArticleDetail.tsx`
- `src/pages/RecipesIndex.tsx`, `src/pages/RecipeDetail.tsx`

**Modify:**
- `package.json` (add react-router-dom)
- `src/main.tsx` (wrap with RouterProvider + LangProvider)
- `src/App.tsx` (becomes Home composition or is replaced by pages/Home)
- `tailwind.config.ts`, `src/index.css` (nosiya-red token, html lang)
- `index.html` (Krava meta, fonts, favicon)
- `src/sections/Navbar.tsx`, `src/sections/Footer.tsx`, `src/sections/Hero.tsx`
- `src/data/articles.ts`, `src/data/recipes.ts` (bilingual records)
- `src/components/ScrollToTop.tsx` (aria-label via t())

**Delete:** `src/sections/Athletes.tsx`, `src/data/athletes.ts`, `src/data/business.ts`, `src/sections/Pricing.tsx`, `src/sections/Story.tsx`, `src/sections/Benefits.tsx`, `src/sections/OrderForm.tsx`, `index.html.backup`.

---

## Task 1: Install router + brand color tokens

**Files:**
- Modify: `package.json`
- Modify: `tailwind.config.ts`
- Modify: `src/index.css`

- [ ] **Step 1: Add react-router-dom**

Run: `npm install react-router-dom@^6`
Expected: adds `react-router-dom` to dependencies, no peer errors.

- [ ] **Step 2: Retune Tailwind primary → nosiya red, add cream/ink aliases**

In `tailwind.config.ts`, replace the `primary` block and add `nosiya`/`cream`/`ink` aliases (keep `gold`, `sage`, `background`, `foreground`, `muted`, `border` as-is):

```ts
primary: {
  DEFAULT: '#B3242B', // nosiya red
  light: '#E8B4B0',
  dark: '#8E1A20',
},
nosiya: { DEFAULT: '#B3242B', cream: '#FAF6EF', ink: '#1C1917' },
cream: '#FAF6EF',
ink: '#1C1917',
```

- [ ] **Step 3: Ensure `<html>` lang default + smooth color**

In `src/index.css`, confirm no hard-coded blue/green utility leaks; add at top of the base layer:

```css
html { scroll-behavior: smooth; }
```

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: PASS (tsc + vite build complete, no type errors).

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json tailwind.config.ts src/index.css
git commit -m "chore(krava): add react-router-dom, retune palette to nosiya red"
```

---

## Task 2: i18n layer (LangContext + chrome strings + toggle)

**Files:**
- Create: `src/i18n/strings.ts`, `src/i18n/LangContext.tsx`, `src/components/LangToggle.tsx`

- [ ] **Step 1: Create the chrome dictionary** — `src/i18n/strings.ts`

```ts
export type Lang = 'de' | 'en';

export const STRINGS = {
  de: {
    'nav.products': 'Produkte', 'nav.subscribe': 'Abo', 'nav.chefs': 'Für Köche',
    'nav.circle': 'Der Kreis', 'nav.articles': 'Journal', 'nav.recipes': 'Rezepte',
    'cta.subscribe': 'Abo entdecken', 'cta.chefTasting': 'Koch-Tasting anfragen',
    'cta.order': 'Jetzt bestellen', 'common.back': 'Zurück',
    'form.name': 'Name', 'form.email': 'E-Mail', 'form.address': 'Lieferadresse',
    'form.phone': 'Telefon', 'form.restaurant': 'Restaurant', 'form.volume': 'Menge pro Woche (kg)',
    'form.send': 'Absenden', 'form.sending': 'Wird gesendet…',
    'form.success': 'Danke! Wir melden uns in Kürze.', 'form.error': 'Etwas ist schiefgelaufen. Bitte erneut versuchen.',
    'form.required': 'Bitte alle Pflichtfelder ausfüllen.',
    'scrolltop': 'Nach oben',
  },
  en: {
    'nav.products': 'Products', 'nav.subscribe': 'Subscribe', 'nav.chefs': 'For Chefs',
    'nav.circle': 'The Circle', 'nav.articles': 'Journal', 'nav.recipes': 'Recipes',
    'cta.subscribe': 'Explore Subscriptions', 'cta.chefTasting': "Request Chef's Tasting",
    'cta.order': 'Order now', 'common.back': 'Back',
    'form.name': 'Name', 'form.email': 'Email', 'form.address': 'Delivery address',
    'form.phone': 'Phone', 'form.restaurant': 'Restaurant', 'form.volume': 'Weekly volume (kg)',
    'form.send': 'Send', 'form.sending': 'Sending…',
    'form.success': "Thank you! We'll be in touch shortly.", 'form.error': 'Something went wrong. Please try again.',
    'form.required': 'Please fill in all required fields.',
    'scrolltop': 'Back to top',
  },
} as const;

export type StringKey = keyof (typeof STRINGS)['de'];
```

- [ ] **Step 2: Create LangContext** — `src/i18n/LangContext.tsx`

```tsx
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { STRINGS, type Lang, type StringKey } from './strings';

interface LangCtx { lang: Lang; setLang: (l: Lang) => void; t: (k: StringKey) => string; }
const Ctx = createContext<LangCtx | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => (localStorage.getItem('krava.lang') as Lang) || 'de');
  useEffect(() => { localStorage.setItem('krava.lang', lang); document.documentElement.lang = lang; }, [lang]);
  const setLang = (l: Lang) => setLangState(l);
  const t = (k: StringKey) => STRINGS[lang][k] ?? k;
  return <Ctx.Provider value={{ lang, setLang, t }}>{children}</Ctx.Provider>;
}

export function useLang() {
  const c = useContext(Ctx);
  if (!c) throw new Error('useLang must be used within LangProvider');
  return c;
}

/** Helper for `{de,en}` content records. */
export function pick<T>(lang: Lang, v: { de: T; en: T }): T { return v[lang]; }
```

- [ ] **Step 3: Create LangToggle** — `src/components/LangToggle.tsx`

```tsx
import { useLang } from '@/i18n/LangContext';

export default function LangToggle() {
  const { lang, setLang } = useLang();
  return (
    <div className="inline-flex items-center rounded-full border border-border bg-card/60 text-xs font-semibold overflow-hidden">
      {(['de', 'en'] as const).map((l) => (
        <button key={l} onClick={() => setLang(l)}
          className={`px-3 py-1 transition-colors ${lang === l ? 'bg-primary text-white' : 'text-muted hover:text-foreground'}`}
          aria-pressed={lang === l}>{l.toUpperCase()}</button>
      ))}
    </div>
  );
}
```

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/i18n src/components/LangToggle.tsx
git commit -m "feat(krava): library-free DE/EN i18n layer + lang toggle"
```

---

## Task 3: Brand data model

**Files:**
- Create: `src/data/brand.ts`
- Delete: `src/data/business.ts` (after consumers migrated in later tasks)

- [ ] **Step 1: Create `src/data/brand.ts`**

```ts
import type { Lang } from '@/i18n/strings';
type L<T = string> = { de: T; en: T };

export interface Product { id: string; name: string; size: L; price: number; tagline: L; blurb: L; tier: 'daily' | 'strained' | 'reserve'; }
export interface Plan { id: string; name: L; price: number; cadence: L; contents: L; features: L<string[]>; popular?: boolean; }

export const BRAND = {
  name: 'Krava',
  tagline: { de: 'Schweizer Reinheit, bulgarische Seele', en: 'Swiss Purity, Bulgarian Soul' } as L,
  location: 'Zürich, Schweiz',
  currency: 'CHF',
  contact: { email: 'hallo@krava.ch', instagram: '', whatsapp: '' },
  impressum: { legalName: 'Krava (Einzelfirma)', address: 'Musterstrasse 1', city: '8000 Zürich', email: 'hallo@krava.ch' },
  products: [
    { id: 'daily', tier: 'daily', name: 'Krava Daily', size: { de: '500 ml', en: '500 ml' }, price: 8.5,
      tagline: { de: 'Der tägliche Begleiter', en: 'The daily driver' },
      blurb: { de: 'Klassisch, natürlich dick, lebendig fermentiert. Perfekt für Frühstück und Performance.', en: 'Classic, naturally thick, live-fermented. Perfect for breakfast and performance.' } },
    { id: 'strained', tier: 'strained', name: 'Krava Strained', size: { de: '500 ml · 2:1 gesiebt', en: '500 ml · 2:1 strained' }, price: 15,
      tagline: { de: 'Chef’s Selection', en: "Chef's Selection" },
      blurb: { de: 'Samtig dicht, keine Molkentrennung. Schlägt importierten griechischen Joghurt auf Reinheit und Textur.', en: 'Velvet-dense, zero syneresis. Beats imported Greek on purity and texture.' } },
    { id: 'reserve', tier: 'reserve', name: 'Krava Reserve', size: { de: '1 L · extra gesiebt', en: '1 L · extra-strained' }, price: 24,
      tagline: { de: 'Die Trophäe', en: 'The trophy jar' },
      blurb: { de: 'Limitierte Charge, pur oder mit lokalem Honig. Fast 2 Liter Schweizer Bio-Milch in einem Glas.', en: 'Limited batch, plain or local honey. Nearly 2 litres of Swiss organic milk in one jar.' } },
  ] as Product[],
  plans: [
    { id: 'performance', name: { de: 'Performance', en: 'Performance' }, price: 65, cadence: { de: '/Monat', en: '/month' },
      contents: { de: '2× 500 ml Daily pro Woche (8 Gläser · 4 kg/Monat)', en: '2× 500 ml Daily per week (8 jars · 4 kg/month)' },
      features: { de: ['Wöchentliche Lieferung an die Tür', 'Jederzeit pausieren oder kündigen', 'Glas-Rückgabe-Prämien inklusive'], en: ['Weekly doorstep delivery', 'Pause or cancel anytime', 'Jar-return rewards included'] } },
    { id: 'elite', name: { de: 'Elite Balkan Soul', en: 'Elite Balkan Soul' }, price: 95, cadence: { de: '/Monat', en: '/month' }, popular: true,
      contents: { de: '2× 500 ml Strained oder 1× 1 L Reserve pro Woche', en: '2× 500 ml Strained or 1× 1 L Reserve per week' },
      features: { de: ['Premium gesiebte Chargen', 'Wöchentliche Lieferung', 'Vorrang bei limitierten Reserve-Chargen'], en: ['Premium strained batches', 'Weekly delivery', 'Priority on limited Reserve batches'] } },
  ] as Plan[],
  circle: {
    b2bCreditPerJar: 0.5,
    d2c: { de: 'Leere, gespülte Gläser am Liefertag rausstellen → 1 Punkt pro Glas. 10 Punkte = ein gratis Spezial-Produkt.', en: 'Leave rinsed empties out on delivery morning → 1 point per jar. 10 points = a free special item.' } as L,
    b2b: { de: 'Gebrandete Krava-Kiste, 1:1-Tausch bei jeder Lieferung. 0.50 CHF Gutschrift pro Glas auf der Monatsrechnung.', en: 'Branded Krava crate, 1:1 swap on every delivery. 0.50 CHF credit per jar on the monthly invoice.' } as L,
  },
  sourcing: {
    milk: { de: 'Zertifizierte Schweizer Bio-Rohmilch von Familienhöfen im Kanton Zürich (Leimbihof, Bio Waidhof).', en: 'Certified Swiss organic raw milk from Canton Zürich family farms (Leimbihof, Bio Waidhof).' } as L,
    culture: { de: 'Original gefriergetrocknete Genesis-Kulturen aus Sofia — L. bulgaricus + S. thermophilus.', en: 'Original freeze-dried Genesis cultures from Sofia — L. bulgaricus + S. thermophilus.' } as L,
    process: { de: 'Von Hand 2:1 gesiebt, durchgehend gekühlt. Kein Pektin, kein Zucker, keine Verdickungsmittel.', en: 'Hand-strained 2:1, continuously refrigerated. No pectin, no sugar, no thickeners.' } as L,
  },
} as const;

export const fmtCHF = (n: number) => `CHF ${n.toFixed(2).replace(/\.00$/, '.–')}`;
export const p = <T,>(lang: Lang, v: { de: T; en: T }): T => v[lang];
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: PASS (file compiles even though not yet imported).

- [ ] **Step 3: Commit**

```bash
git add src/data/brand.ts
git commit -m "feat(krava): brand data model — products, plans, circle, sourcing, impressum"
```

---

## Task 4: Router + RootLayout + main.tsx wiring

**Files:**
- Create: `src/layout/RootLayout.tsx`, `src/router.tsx`, `src/pages/Home.tsx`
- Modify: `src/main.tsx`, `src/components/ScrollToTop.tsx`

- [ ] **Step 1: RootLayout** — `src/layout/RootLayout.tsx`

```tsx
import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { ScrollProvider } from '@/components/ScrollContext';
import { SmoothScroll } from '@/components/SmoothScroll';
import { Grain } from '@/components/Grain';
import SilkBackground from '@/components/SilkBackground';
import Scene3D from '@/components/Scene3D';
import Navbar from '@/sections/Navbar';
import Footer from '@/sections/Footer';
import ScrollToTop from '@/components/ScrollToTop';

export default function RootLayout() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return (
    <ScrollProvider>
      <SmoothScroll />
      <SilkBackground />
      <Grain />
      <Scene3D />
      <Navbar />
      <main><Outlet /></main>
      <Footer />
      <ScrollToTop />
    </ScrollProvider>
  );
}
```

- [ ] **Step 2: Router** — `src/router.tsx`

```tsx
import { createBrowserRouter, Navigate } from 'react-router-dom';
import RootLayout from '@/layout/RootLayout';
import Home from '@/pages/Home';
import Chefs from '@/pages/Chefs';
import ArticlesIndex from '@/pages/ArticlesIndex';
import ArticleDetail from '@/pages/ArticleDetail';
import RecipesIndex from '@/pages/RecipesIndex';
import RecipeDetail from '@/pages/RecipeDetail';

export const router = createBrowserRouter([
  { path: '/', element: <RootLayout />, children: [
    { index: true, element: <Home /> },
    { path: 'chefs', element: <Chefs /> },
    { path: 'articles', element: <ArticlesIndex /> },
    { path: 'articles/:slug', element: <ArticleDetail /> },
    { path: 'recipes', element: <RecipesIndex /> },
    { path: 'recipes/:slug', element: <RecipeDetail /> },
    { path: '*', element: <Navigate to="/" replace /> },
  ]},
]);
```

- [ ] **Step 3: Temporary Home** — `src/pages/Home.tsx` (sections added in later tasks)

```tsx
import Hero from '@/sections/Hero';
export default function Home() { return <><Hero /></>; }
```

- [ ] **Step 4: Wire main.tsx** — `src/main.tsx`

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { LangProvider } from '@/i18n/LangContext';
import { router } from '@/router';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <LangProvider>
        <RouterProvider router={router} />
      </LangProvider>
    </HelmetProvider>
  </React.StrictMode>,
);
```

- [ ] **Step 5: Localize ScrollToTop aria-label** — in `src/components/ScrollToTop.tsx`, replace `aria-label="Volver arriba"` with `useLang()` + `aria-label={t('scrolltop')}` (add `import { useLang } from '@/i18n/LangContext';` and `const { t } = useLang();`).

- [ ] **Step 6: Stub the not-yet-built pages** so the router compiles. Create minimal default-export stubs returning `null` for `src/pages/Chefs.tsx`, `ArticlesIndex.tsx`, `ArticleDetail.tsx`, `RecipesIndex.tsx`, `RecipeDetail.tsx`. These are fleshed out in Tasks 9–11.

- [ ] **Step 7: Verify build + dev render**

Run: `npm run build` → PASS. Then `npm run dev`, open `/` — Hero renders inside the shared chrome, no console errors; navigate to `/chefs` → blank page (stub) with Navbar/Footer present.

- [ ] **Step 8: Commit**

```bash
git add src/layout src/router.tsx src/pages src/main.tsx src/components/ScrollToTop.tsx
git commit -m "feat(krava): react-router shell — RootLayout, routes, page stubs"
```

---

## Task 5: Navbar (bilingual + routed + LangToggle)

**Files:**
- Modify: `src/sections/Navbar.tsx`

- [ ] **Step 1: Rebuild Navbar** — replace `BUSINESS`/Spanish links/`#` anchors with router `Link`s, `useLang`, brand name, and `<LangToggle>`. Links: Products (`/#products`), Subscribe (`/#subscribe`), For Chefs (`/chefs`), The Circle (`/#circle`), Journal (`/articles`), Recipes (`/recipes`). Logo → `Link to="/"` showing `Krava` (replace the 🥛 emoji). Primary CTA button → `t('cta.subscribe')` linking to `/#subscribe`. Keep the existing scroll/mobile-open behavior. Add `<LangToggle />` in both desktop and mobile menus.

Key bindings:
```tsx
import { Link } from 'react-router-dom';
import { useLang } from '@/i18n/LangContext';
import LangToggle from '@/components/LangToggle';
import { BRAND } from '@/data/brand';
// const { t } = useLang();
// logo: <Link to="/" className="font-heading font-bold text-lg text-primary">{BRAND.name}</Link>
```

- [ ] **Step 2: Verify build + render**

Run: `npm run build` → PASS. `npm run dev`: navbar shows Krava + DE/EN toggle; toggling flips link labels; `/chefs` link routes without full reload.

- [ ] **Step 3: Commit**

```bash
git add src/sections/Navbar.tsx
git commit -m "feat(krava): bilingual routed navbar with DE/EN toggle"
```

---

## Task 6: Hero (bilingual, dual CTA, repaint)

**Files:**
- Modify: `src/sections/Hero.tsx`

- [ ] **Step 1: Rewrite Hero copy + CTAs.** Headline = `p(lang, BRAND.tagline)`. Subhead (add to `strings.ts` as `hero.sub` for de/en): DE "Von Hand gesiebter, additivfreier Mikro-Molkerei-Joghurt aus Zürich — mit original Genesis-Kulturen." / EN "Hand-strained, additive-free micro-dairy yogurt crafted in Zürich — with original Genesis cultures." Two CTAs: primary `t('cta.subscribe')` → `/#subscribe` (anchor scroll), secondary `t('cta.chefTasting')` → `Link to="/chefs"`. Keep the R3F jar layout/right column. Ensure any hard-coded blue/green classes become `primary`/`ink`/`gold`.

Add to `strings.ts` both langs: `'hero.sub'`. (Update `StringKey` automatically via `keyof`.)

- [ ] **Step 2: Verify build + render**

Run: `npm run build` → PASS. Dev: hero shows tagline in active language, both CTAs work (primary scrolls to subscribe section once it exists; secondary routes to /chefs).

- [ ] **Step 3: Commit**

```bash
git add src/sections/Hero.tsx src/i18n/strings.ts
git commit -m "feat(krava): bilingual hero with dual D2C/B2B CTAs"
```

---

## Task 7: Home sections — DualGateway, ProductLine, Subscriptions, CircleProtocol, Transparency

Each section follows existing patterns: wrap content in `FadeContent`, use `section-container`/`container-landing` + `id` for anchor links, pull copy from `BRAND` via `p(lang, …)`. All sections are presentational; verify by render.

**Files:**
- Create: `src/sections/DualGateway.tsx`, `ProductLine.tsx`, `Subscriptions.tsx`, `CircleProtocol.tsx`, `Transparency.tsx`
- Delete: `src/sections/Pricing.tsx`, `Story.tsx`, `Benefits.tsx`

- [ ] **Step 1: DualGateway** — `src/sections/DualGateway.tsx`. Two-column split. Left card "Für Zürcher Haushalte / For Zürich Homes" → anchor `/#subscribe`, lists subscription value. Right card "Gastronomie & Köche / Gastronomy & Chefs" → `Link to="/chefs"`, lists wholesale/zero-syneresis value. Use `useLang`, `FadeContent`. `id="gateway"`.

- [ ] **Step 2: ProductLine** — `src/sections/ProductLine.tsx`, `id="products"`. Map `BRAND.products` into 3 cards: name, `p(lang, size)`, `fmtCHF(price)`, `p(lang, tagline)`, `p(lang, blurb)`. Reserve card visually emphasized (the anchor). Reuse the card styling from the old `Pricing.tsx` (popular-card look) but neutral — adapt, don't import. CTA per card → `/#subscribe`.

- [ ] **Step 3: Subscriptions** — `src/sections/Subscriptions.tsx`, `id="subscribe"`. Map `BRAND.plans` into 2 cards (Elite marked popular via `plan.popular`): `p(lang,name)`, `fmtCHF(price)` + `p(lang,cadence)`, `p(lang,contents)`, feature list `p(lang,features).map(...)`. Each card CTA scrolls to the subscribe form (`#subscribe-form`) and passes the chosen plan id (store in a module-level `?plan=` hash or a small context; simplest: link `#subscribe-form` and let the form default — plan selection handled in Task 8 form via a select).

- [ ] **Step 4: CircleProtocol** — `src/sections/CircleProtocol.tsx`, `id="circle"`. Headline "Der Kreis / The Circle". Two columns: D2C (`p(lang, BRAND.circle.d2c)`) and B2B (`p(lang, BRAND.circle.b2b)`), framed as a perk. Sustainability/zero-waste line.

- [ ] **Step 5: Transparency** — `src/sections/Transparency.tsx`, `id="transparency"`. Three points from `BRAND.sourcing` (milk / culture / process), each with an icon (lucide: `Milk`, `FlaskConical`, `Snowflake`) and `p(lang, …)` text. Heritage one-liner about 4,000-year tradition.

- [ ] **Step 6: Verify build**

Run: `npm run build` → PASS (sections compile; Home not yet wired to all → next task).

- [ ] **Step 7: Commit**

```bash
git add src/sections/DualGateway.tsx src/sections/ProductLine.tsx src/sections/Subscriptions.tsx src/sections/CircleProtocol.tsx src/sections/Transparency.tsx
git rm src/sections/Pricing.tsx src/sections/Story.tsx src/sections/Benefits.tsx
git commit -m "feat(krava): home sections — gateway, products, subscriptions, circle, transparency"
```

---

## Task 8: Forms — SubscribeForm + ChefForm (channel field)

**Files:**
- Create: `src/sections/SubscribeForm.tsx`, `src/sections/ChefForm.tsx`
- Delete: `src/sections/OrderForm.tsx`

- [ ] **Step 1: Shared submit helper** — inline in each form (DRY enough for two consumers): POST to `import.meta.env.VITE_API_URL || 'http://localhost:3000/api/yogurt-leads'` with JSON body including `channel`. Status state machine `idle|loading|success|error` (reuse the existing `OrderForm` pattern). All labels/messages via `t()`.

- [ ] **Step 2: SubscribeForm** — `src/sections/SubscribeForm.tsx`, `id="subscribe-form"`. Fields: name, email, address, phone (optional), and a plan `<select>` (`one-time` Daily/Strained/Reserve OR a subscription plan). Body: `{ channel: planIsSub ? 'subscription' : 'one-time', plan, name, email, address, phone }`. Validation: name ≥2, email valid, address ≥5; else show `t('form.required')`. Success/error via `t('form.success')`/`t('form.error')`.

```tsx
const body = { channel, plan, name, email, address, phone };
const res = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
```

- [ ] **Step 3: ChefForm** — `src/sections/ChefForm.tsx`, `id="chef-form"`. Fields: contact name, restaurant, email, phone, weekly volume kg, message. Body: `{ channel: 'b2b', restaurant, name, email, phone, weeklyVolumeKg, message }`. Same status machine + `t()` strings (`form.restaurant`, `form.volume`).

- [ ] **Step 4: Verify build + behavior**

Run: `npm run build` → PASS. Dev: submit each form against a stubbed/unreachable API → error state shows localized message; with a 200 mock → success state. Confirm payloads include the right `channel` (check Network tab).

- [ ] **Step 5: Commit**

```bash
git add src/sections/SubscribeForm.tsx src/sections/ChefForm.tsx
git rm src/sections/OrderForm.tsx
git commit -m "feat(krava): subscribe + chef lead forms with channel discriminator"
```

---

## Task 9: Home page composition + cleanup of old App/Athletes

**Files:**
- Modify: `src/pages/Home.tsx`
- Delete: `src/App.tsx`, `src/sections/Athletes.tsx`, `src/data/athletes.ts`, `src/data/business.ts`, `index.html.backup`

- [ ] **Step 1: Compose Home** — `src/pages/Home.tsx`

```tsx
import { Helmet } from 'react-helmet-async';
import { useLang } from '@/i18n/LangContext';
import Hero from '@/sections/Hero';
import DualGateway from '@/sections/DualGateway';
import ProductLine from '@/sections/ProductLine';
import Subscriptions from '@/sections/Subscriptions';
import CircleProtocol from '@/sections/CircleProtocol';
import Transparency from '@/sections/Transparency';
import SubscribeForm from '@/sections/SubscribeForm';

export default function Home() {
  const { lang } = useLang();
  return (
    <>
      <Helmet>
        <title>{lang === 'de' ? 'Krava — Schweizer Reinheit, bulgarische Seele' : 'Krava — Swiss Purity, Bulgarian Soul'}</title>
        <meta name="description" content={lang === 'de' ? 'Handgesiebter bulgarischer Joghurt aus Zürich. Bio-Rohmilch, Genesis-Kulturen, keine Zusätze. Abo & Gastronomie.' : 'Hand-strained Bulgarian yogurt from Zürich. Organic raw milk, Genesis cultures, no additives. Subscription & gastronomy.'} />
      </Helmet>
      <Hero /><DualGateway /><ProductLine /><Subscriptions /><CircleProtocol /><Transparency /><SubscribeForm />
    </>
  );
}
```

- [ ] **Step 2: Delete dead files**

```bash
git rm src/App.tsx src/sections/Athletes.tsx src/data/athletes.ts src/data/business.ts index.html.backup
```

Then grep for stragglers: `grep -rn "data/business\|Athletes\|BUSINESS" src` → expected: no matches.

- [ ] **Step 3: Verify build + full render**

Run: `npm run build` → PASS. Dev `/`: all sections render top-to-bottom in both DE and EN; anchor CTAs scroll correctly.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat(krava): compose home page; remove Tenerife App/Athletes/business data"
```

---

## Task 10: /chefs B2B page

**Files:**
- Modify: `src/pages/Chefs.tsx`

- [ ] **Step 1: Build Chefs page.** Sections: hero band (wholesale value prop, zero-syneresis under heat), the crate-credit loop (`p(lang, BRAND.circle.b2b)` + `fmtCHF(BRAND.circle.b2bCreditPerJar)` credit), suggested weekly volume (15–30 kg), then `<ChefForm />`. Add `<Helmet>` title `For Chefs / Für Köche`. All copy via `useLang` + add needed keys to `strings.ts` (e.g. `chefs.headline`, `chefs.sub`, `chefs.crateTitle`).

- [ ] **Step 2: Verify build + render**

Run: `npm run build` → PASS. Dev `/chefs`: renders within chrome, ChefForm submits with `channel:'b2b'`, both languages.

- [ ] **Step 3: Commit**

```bash
git add src/pages/Chefs.tsx src/i18n/strings.ts
git commit -m "feat(krava): /chefs B2B portal with crate-credit loop + chef form"
```

---

## Task 11: Bilingual Articles (data + index + detail)

**Files:**
- Modify: `src/data/articles.ts`, `src/pages/ArticlesIndex.tsx`, `src/pages/ArticleDetail.tsx`

- [ ] **Step 1: Bilingual article data.** Convert `Article` to bilingual fields: `title:{de,en}`, `excerpt:{de,en}`, `content:{de,en}` (markdown), keep `slug`, `category:{de,en}`, `readTime`, `image`, `keywords`, `datePublished`, `author`. Replace the Spanish Tenerife articles with **3 Zürich-relevant** bilingual pieces: (1) "Why gut health starts with live cultures", (2) "What makes authentic kiselo mlyako different from 'Greek style'", (3) "From Sofia to Zürich: our Swiss-Bulgarian supply chain". Each `content` is real DE + EN markdown (no placeholders — write the prose).

```ts
export interface Article { id: string; slug: string; title: L; excerpt: L; content: L; category: L; readTime: string; image: string; keywords: string[]; datePublished: string; author: string; }
type L = { de: string; en: string };
```

- [ ] **Step 2: ArticlesIndex** — grid of cards (`p(lang, title/excerpt/category)`), `Link to={'/articles/' + slug}`. `<Helmet>` Journal title. Use existing card/`FadeContent` patterns + ChromaCard image if desired.

- [ ] **Step 3: ArticleDetail** — `useParams()` → find by slug (404-style redirect to `/articles` if missing). Render `marked.parse(p(lang, content))` inside a `prose` container (`@tailwindcss/typography`). Per-article `<Helmet>` with `title`/`description`/keywords + JSON-LD `Article` schema (bilingual title/description). Back link `t('common.back')` → `/articles`.

- [ ] **Step 4: Verify build + render**

Run: `npm run build` → PASS. Dev: `/articles` lists 3 cards; clicking opens detail; language toggle swaps title + body; markdown renders styled.

- [ ] **Step 5: Commit**

```bash
git add src/data/articles.ts src/pages/ArticlesIndex.tsx src/pages/ArticleDetail.tsx
git commit -m "feat(krava): bilingual articles — Zürich content, routed index + detail"
```

---

## Task 12: Bilingual Recipes (data + index + detail)

**Files:**
- Modify: `src/data/recipes.ts`, `src/pages/RecipesIndex.tsx`, `src/pages/RecipeDetail.tsx`

- [ ] **Step 1: Bilingual recipe data + slug.** Convert `Recipe` to: `slug`, `title:{de,en}`, `description:{de,en}`, `image`, `difficulty:{de,en}`, `prepTime`, `tags:{de,en}` (string[]), plus add `ingredients:{de,en}` (string[]) and `method:{de,en}` (string[]) so detail pages have real content. Replace Spanish recipes with **3–4** serving ideas that fit a premium Zürich audience (e.g. high-protein breakfast bowl, authentic Balkan tzatziki, strained-yogurt labneh spread, post-workout smoothie). Write real DE + EN content — no placeholders.

- [ ] **Step 2: RecipesIndex** — card grid (`p(lang, title/description)`, tags), `Link to={'/recipes/' + slug}`, Helmet Recipes title.

- [ ] **Step 3: RecipeDetail** — `useParams()` slug lookup (redirect to `/recipes` if missing). Render title, image, prepTime/difficulty, ingredients list, numbered method. Helmet + `Recipe` JSON-LD. Back link `t('common.back')`.

- [ ] **Step 4: Verify build + render**

Run: `npm run build` → PASS. Dev: `/recipes` lists cards; detail renders ingredients + method; toggle swaps language.

- [ ] **Step 5: Commit**

```bash
git add src/data/recipes.ts src/pages/RecipesIndex.tsx src/pages/RecipeDetail.tsx
git commit -m "feat(krava): bilingual recipes — routed index + detail with ingredients/method"
```

---

## Task 13: Footer + Impressum + Twint badge

**Files:**
- Modify: `src/sections/Footer.tsx`
- Modify: `src/i18n/strings.ts`

- [ ] **Step 1: Rebuild Footer.** Replace Spanish/Tenerife content with: Krava brand + tagline, route links (Products, Subscribe, For Chefs, Journal, Recipes, The Circle), contact (`BRAND.contact.email`), and an **Impressum** block rendering `BRAND.impressum` (legal name, address, city, email) — required by Swiss law. Add a **Twint** trust badge (text/`lucide` placeholder: "TWINT akzeptiert / TWINT accepted") plus card icons. Copyright with current year. All copy via `useLang` (add `footer.*` keys).

- [ ] **Step 2: Verify build + render**

Run: `npm run build` → PASS. Dev: footer shows Impressum + Twint badge in both languages; links route.

- [ ] **Step 3: Commit**

```bash
git add src/sections/Footer.tsx src/i18n/strings.ts
git commit -m "feat(krava): footer with Swiss Impressum + Twint trust badge"
```

---

## Task 14: index.html meta, fonts, favicon, mascot asset

**Files:**
- Modify: `index.html`
- Add: `public/krava-cow.svg` (or `.png`) placeholder mascot + favicon

- [ ] **Step 1: Update `index.html`** — replace Spanish `<title>`/meta/lang with Krava/Zürich defaults (`lang="de"`), Fraunces + Inter font links (confirm already present), favicon → mascot, `og:` tags for Krava. Remove Tenerife OG image.

- [ ] **Step 2: Add mascot placeholder** — drop a simple cow-in-nosiya `public/krava-cow.svg` placeholder (clean vector, red nosiya accent) and reference as favicon + hero/section accent where the design calls for it. Note in commit that final artwork is a follow-up.

- [ ] **Step 3: Verify build + render**

Run: `npm run build` → PASS. Dev: tab shows Krava title + favicon; no Tenerife strings remain (`grep -rin "tenerife\|búlgaro\|santa cruz" src index.html` → no matches).

- [ ] **Step 4: Commit**

```bash
git add index.html public/krava-cow.svg
git commit -m "feat(krava): index.html meta + mascot favicon (placeholder art)"
```

---

## Task 15: Final verification pass + docs

**Files:**
- Modify: `CLAUDE.md`, `README.md`

- [ ] **Step 1: Full build**

Run: `npm run build`
Expected: PASS, zero type errors.

- [ ] **Step 2: Manual matrix** — dev server; for **each route** (`/`, `/chefs`, `/articles`, `/articles/:slug`, `/recipes`, `/recipes/:slug`) verify in **both DE and EN**: renders, no console errors, no Spanish leakage, background/3D does not remount-flash on navigation, forms validate + submit with correct `channel`. Screenshot `/` and `/chefs` in both languages.

- [ ] **Step 3: Grep guards**

Run: `grep -rin "tenerife\|búlgaro\|santa cruz\|€\|BUSINESS\|athletes" src index.html`
Expected: no matches (CHF everywhere, no legacy refs).

- [ ] **Step 4: Update docs** — refresh `CLAUDE.md` (name → Krava, Zürich, routes, i18n, channels, brand.ts, nosiya palette) and `README.md` (Krava one-liner + run instructions). Update the design-tokens section to nosiya red.

- [ ] **Step 5: Commit**

```bash
git add CLAUDE.md README.md
git commit -m "docs(krava): update CLAUDE.md + README for Swiss Krava pivot"
```

---

## Self-Review (completed by planner)

**Spec coverage:** brand/visual (T1,T14), IA/routing (T4), i18n DE+EN (T2, all tasks), products 3-jar (T3,T7), subscriptions (T3,T7), Circle Protocol (T3,T7), transparency (T7), recipes kept+improved+routed (T12), articles kept+routed (T11), forms split + channel field (T8), B2B /chefs (T10), Footer+Impressum+Twint (T13), SEO per-route Helmet (T9–T12), cuts Articles-blog? no — kept per user; Athletes cut (T9). ✅ All spec sections mapped.

**Placeholder scan:** content tasks (T11/T12) explicitly require real DE+EN prose, not placeholders. Mascot art is an explicit, labeled placeholder follow-up (acceptable — final art is out-of-repo per spec §8). No "TBD/TODO" left.

**Type consistency:** `L = {de,en}`, `p(lang,…)`/`pick`, `BRAND`, `Product`/`Plan`, `STRINGS`/`StringKey`, `useLang().t`, `fmtCHF` used consistently across tasks. Forms use `channel: 'subscription'|'one-time'|'b2b'` matching spec §3.4.
