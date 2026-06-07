# Krava — Swiss Market Pivot (Design Spec)

> Date: 2026-06-07
> Repo: `use-case-apps/yogurt-landing` (transform in place)
> Status: Approved design → implementation planning

## 1. Summary

Pivot the existing **Bulgarian Yogurt Tenerife** landing (Spanish, single-scroll, 2-tier
D2C) into **Krava** — a premium **Zürich / Switzerland** yogurt brand serving **three
channels**: Direct-to-Consumer (one-time jars), **Subscription**, and **B2B gastronomy**
(restaurants). Bilingual **DE + EN** throughout. Lean routed home page with deeper content
on their own routes. Lead-capture only (no real payments yet); Twint shown as a trust badge.

Tenerife version stays in git history. We reuse the existing layout engine (Silk background,
GSAP scroll reveals, R3F 3D jar, Lenis smooth scroll) and recolor + re-content it.

## 2. Goals / Non-goals

**Goals**
- Three clearly-routed channels: D2C + subscription (home) and B2B chefs (`/chefs`).
- Krava brand: "Swiss Purity, Bulgarian Soul" — cream / matte-black / nosiya-red, cow mascot.
- Full **DE + EN** localization (Swiss High German: `ss`, never `ß`), persisted toggle.
- Three-jar product line + two subscription tiers + B2B wholesale + **Circle Protocol**
  (jar-return loyalty).
- Supply-chain transparency (Swiss Bio-Rohmilch + Sofia Genesis cultures + hand-strained 2:1).
- Keep + improve **Articles** and **Recipes**, now routed and bilingual.
- Swiss compliance surface: **Impressum**, Twint badge.

**Non-goals (deferred)**
- Real payment / checkout (Stripe + Twint gateway). Lead-capture only for the pilot.
- French / Italian site copy (DE + EN only; FR/IT relevant for physical labels, not this site).
- Backend changes beyond a single `channel` field on the leads payload.
- Bio-Suisse certification, GS1 barcodes, lab shelf-life — operational, not web scope.

## 3. Architecture

### 3.1 Routing (new)
Add `react-router-dom`. Wrap app in `BrowserRouter`. Routes:

| Route | Page | Notes |
|---|---|---|
| `/` | **Home** (lean) | Hero · Dual-Gateway · Product Line · Subscriptions · Circle Protocol · Transparency · Recipes teaser · forms |
| `/chefs` | **B2B portal** | Wholesale value prop, crate-credit loop, "Request Chef's Tasting" form |
| `/articles` | **Articles index** | Bilingual cards |
| `/articles/:slug` | **Article detail** | `marked` + `@tailwindcss/typography` |
| `/recipes` | **Recipes index** | Bilingual cards |
| `/recipes/:slug` | **Recipe detail** | Serving idea + ingredients + method |
| `*` | Redirect to `/` | |

Shared chrome (Navbar with lang toggle, Silk/Grain/Scene3D background, Footer, ScrollToTop)
lives in a layout wrapper so every route shares it. `Scene3D`/`SilkBackground` stay mounted
across routes (no remount flash). `ScrollToTop` resets scroll on route change.

### 3.2 Internationalization (new, no library)
- `data/i18n.ts`: a typed dictionary `{ de: {...}, en: {...} }` keyed by string id.
- `components/LangContext.tsx`: `LangProvider` + `useLang()` returning `{ lang, setLang, t }`.
  `t(id)` resolves from the active dictionary. Lang persisted to `localStorage` (`krava.lang`),
  default `de`, sets `<html lang>`.
- `<LangToggle>` (DE / EN pill) in the Navbar.
- Article/Recipe content carries both languages in the data record (`title.de/.en`, etc.).

### 3.3 Data model (rewrite `data/business.ts` → `data/brand.ts`)
```ts
BRAND = {
  name: 'Krava',
  tagline: { de: 'Schweizer Reinheit, bulgarische Seele', en: 'Swiss Purity, Bulgarian Soul' },
  location: 'Zürich, Schweiz',
  currency: 'CHF',
  contact: { email, instagram, whatsapp },
  impressum: { legalName, address, city, email },          // Swiss legal notice
  products: [ Daily500, Strained500, Reserve1L ],          // see §4.3
  plans: [ performancePack, eliteBalkanSoul ],             // see §4.4
  circle: { d2cRule, b2bCreditPerJar: 0.5, milestones },   // see §4.5
  sourcing: { milkFarms, culture, process },               // see §4.6
}
```
All user-facing strings are `{ de, en }` pairs (or live in `i18n.ts` for chrome copy).

### 3.4 Leads (single endpoint, channel field)
`OrderForm` is split into intent-specific forms that share one POST to the existing leads
endpoint (`VITE_API_URL`, in `tenerife-services`). Payload gains a discriminator:
`channel: 'subscription' | 'one-time' | 'b2b'`. B2B payload adds `restaurant`,
`weeklyVolumeKg`. Backend change is additive (accept + store the new fields); no new routes.

## 4. Components & content

### 4.1 Sections to recolor / keep
- **Hero** — jar + cow, headline = tagline, dual CTA: "Abo entdecken / Explore Subscriptions"
  (primary) and "Koch-Tasting anfragen / Chef's Tasting" → `/chefs`. Consumer-first.
- **Footer** — recolor + add **Impressum** block (legal name, ZH address, contact) and Twint badge.
- **Recipes** — kept, reframed as serving ideas, routed + bilingual.
- **Articles** — kept, routed + bilingual.

### 4.2 New sections
- **Dual-Gateway** — two-column split: *Zürich Homes (D2C)* → subscriptions; *Gastronomy &
  Chefs (B2B)* → `/chefs`. The conditional routing device the user asked for.
- **Circle Protocol** — jar-return loop. D2C: leave rinsed empties on delivery → points →
  milestone reward (10 pts = free item). B2B: branded crate 1:1 swap, **0.50 CHF/jar** invoice
  credit. Framed as a perk, not a deposit.
- **Supply-Chain Transparency** — Swiss Bio-Rohmilch (Leimbihof / Bio Waidhof) + Genesis
  cultures from Sofia + hand-strained 2:1, zero additives. Replaces Story+Benefits.

### 4.3 Product line (CHF, replaces Pricing)
| Jar | Size | Price (CHF) | Position |
|---|---|---|---|
| Krava Daily | 500 ml classic, thick | 8.50 | Everyday volume builder / breakfast / fitness |
| Krava Strained (Chef's Selection) | 500 ml, 2:1 strained | 15.00 | Velvet, zero syneresis — beats imported Greek |
| Krava Reserve | 1 L extra-strained (plain or local honey) | 24.00 | Luxury anchor, the trophy jar |

### 4.4 Subscription tiers
| Plan | Contents | Price |
|---|---|---|
| Performance (Fitness) | 2× 500 ml Daily / week (8 jars / 4 kg per month) | 65 CHF/mo |
| Elite Balkan Soul | 2× 500 ml Strained **or** 1× 1 L Reserve / week | 95 CHF/mo |
Pause/cancel anytime, weekly doorstep drop, jar-return rewards baked in.

### 4.5 Circle Protocol rewards
- D2C: 1 returned jar = 1 point; 10 points = free limited item (hot honey / fruit compote).
- B2B: 0.50 CHF credit per returned jar on the monthly invoice; "zero packaging waste" story.
- Lids never reused (operational note for ops docs, not surfaced on site).

### 4.6 Sourcing facts (transparency section)
Swiss certified Bio-Rohmilch from Canton Zürich family farms (Leimbihof, Bio Waidhof) ·
original freeze-dried **Genesis** cultures from Sofia (L. bulgaricus + S. thermophilus) ·
hand-strained 2:1 under continuous refrigeration · no pectin, no sugar, no thickeners.

## 5. Visual system
- Palette: `cream` (#FAF7F0-ish yogurt white) bg, `ink` (matte black) text/lids,
  `nosiya` red accent (+ white) for the Bulgarian geometric motif. Replace blue/green tokens
  in `tailwind.config.ts` + `index.css`.
- Cow-in-nosiya mascot as recurring device (hero, favicon, section accents). Asset: vector/PNG
  in `public/` (placeholder until final art lands).
- Keep Silk background, grain, GSAP reveals — just recolored.

## 6. SEO / meta
Per-route `<Helmet>` titles/descriptions, bilingual where it matters, `de` default.
Swap all Tenerife/Spanish meta + JSON-LD for Krava / Zürich. `.ch` positioning in copy.

## 7. Testing / verification
- `npm run build` (tsc -b + vite) clean.
- Every route renders in **both** DE and EN; toggle persists across navigation.
- Subscription form and B2B chef form validate (DE + EN messages) and POST with correct
  `channel`; success/error states work against a mocked endpoint.
- Responsive at mobile + desktop; background/3D do not remount-flash between routes.
- Dev server run + screenshots of `/`, `/chefs`, `/articles`, `/recipes` in both languages
  before claiming done.

## 8. Out-of-repo follow-ups (note, do not build)
- `tenerife-services` backend: accept `channel`, `restaurant`, `weeklyVolumeKg` on yogurt leads.
- Final cow-in-nosiya artwork. Real Twint/Stripe checkout. Bio-Suisse / GS1 / shelf-life.
