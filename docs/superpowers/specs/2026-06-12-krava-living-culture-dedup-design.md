# Krava homepage — Living Culture upgrade + section de-duplication

**Date:** 2026-06-12
**Repo:** `use-case-apps/yogurt-landing` (Krava)
**Branch target:** current working branch

## Problem

Two issues on the Krava landing homepage:

1. **Repeated sections.** Two structural overlaps make the page feel padded:
   - `DualGateway` and `CircleProtocol` are both a two-card "Home icon = D2C / ChefHat = B2B"
     grid. They read as the same section twice.
   - Conversion blocks stack up: `ProductLine` (one-time jars, Stripe preorder) +
     `PreorderReserve` (a form that re-lists the same products) and `Subscriptions` (plans) +
     `SubscribeForm` (subscription form). Two parallel funnels, each with a display section AND
     a bottom form — four "buy/reserve" moments.

2. **The Lactobacillus bulgaricus story is buried.** It only appears as one small card in
   `Transparency` ("L. bulgaricus + S. thermophilus"). The rich story already written in the
   journal (`src/data/articles.ts`) — a bacterium native to Bulgaria, real raw milk converting
   to yogurt through one natural fermentation, no second heat — never makes the homepage.

## Goals

- Promote the bulgaricus story to a hero-grade homepage centerpiece.
- Remove both structural section overlaps.
- A focused UX polish pass (rhythm, reveal, spacing) — not a redesign.
- Preserve all existing conversion backends (Stripe subscription checkout, one-time
  reserve / pay-on-delivery, lead capture) with no behavior regressions.

## Non-goals

- No new payment flows, no backend/API changes, no new product/plan data.
- No change to routing, i18n architecture, or the 3D Breakfast bowl mechanics.
- No new image assets plumbed into `public/` (Living Culture is CSS/icon-based).

## Final section order

| # | Section | Change |
|---|---------|--------|
| 1 | `Hero` | Keep; light polish only |
| 2 | `DualGateway` | Keep as the homes-vs-chefs router |
| 3 | **`LivingCulture` (NEW)** | The bulgaricus centerpiece |
| 4 | `ProductLine` | Keep |
| 5 | `Breakfast` | Keep (signature 3D visual) |
| 6 | `Subscriptions` | Keep; jar-return loop folded in as a slim band |
| 7 | `Transparency` | Refocus on farm/sourcing proof; drop the now-redundant culture card |
| 8 | **`Order` (unified)** | Merge `SubscribeForm` + `PreorderReserve` behind one toggle |

`CircleProtocol` is removed as a standalone section.

## Design detail

### 1. `LivingCulture` (new section)

Placed right after `DualGateway` so "why we're different" lands before the menu.

**Layout:** centered eyebrow + heading + a bold pull-quote, then a 3-step horizontal flow
`Real raw milk → Lactobacillus bulgaricus → Yogurt` with the middle (the strain) emphasized,
followed by three supporting tiles. GSAP `FadeContent` reveal consistent with other sections.

**Copy (EN; DE mirrored, Swiss High German `ss` never `ß`):**

- Eyebrow: `The Living Culture` / `Die lebendige Kultur`
- Heading: `The bacterium that only Bulgaria has` / `Das Bakterium, das nur Bulgarien hat`
- Pull-quote / body: *Lactobacillus bulgaricus* grows wild nowhere else on earth — it is the
  single strain that makes Bulgarian yogurt *Bulgarian*. We add it to certified Swiss organic
  raw milk and step back. The culture does the rest: it ferments real milk into real yogurt
  through one slow, natural process. No thickeners, no pectin, no sugar, no second heat to kill
  the culture. What reaches your jar is **alive**.
- Three tiles:
  - **Real milk** — Swiss organic raw milk. One ingredient, full traceability.
  - **The living strain** — *L. bulgaricus*, native to Bulgaria. The active hero, not a flavour.
  - **Natural fermentation** — milk becomes yogurt on its own. Nothing added, nothing killed.

All copy added to `src/i18n/strings.ts` under new `culture.*` keys (DE + EN), following the
existing `t('key')` pattern. The bacterium name stays Latin/italic in both languages.

### 2. De-dupe #1 — remove duplicate card grid

- Delete the standalone `CircleProtocol` section from `Home.tsx` and its import.
- Fold the jar-return loyalty (`BRAND.circle.d2c` / `BRAND.circle.b2b`) into a **slim horizontal
  band** rendered at the bottom of `Subscriptions` (compact: icon + one line each, not tall
  cards). Reuses existing `BRAND.circle` data and `circle.*` strings — no data changes.
- Delete `CircleProtocol.tsx` once its content is folded in — no longer imported anywhere.

### 3. De-dupe #2 — unified `Order` section

- New `Order.tsx` section wrapping a segmented toggle: **Subscribe | One-time**.
- Under each tab, render the **existing form logic** unchanged:
  - Subscribe → current `SubscribeForm` flow (`startSubscriptionCheckout`, `submitLead` lead mode).
  - One-time → current `PreorderReserve` flow (`reservePreorder`).
- Implementation approach: extract each form's body into a presentational component (or render
  the two existing components inside the tab wrapper) so the backend calls, validation, and
  success states are preserved verbatim. No changes to `lib/checkout.ts` or `lib/leads.ts`.
- Anchors: the unified section keeps `id="subscribe-form"` and adds/retains `id="reserve"` so
  existing in-page links (`#reserve`, gateway CTAs) still resolve. `ProductLine`'s
  "pay on delivery" link continues to scroll to the one-time tab.

### 4. Transparency refocus

- Drop the `culture` card (the bacteria story now lives in `LivingCulture`).
- Keep `milk` (farm sourcing) and `process` (hand-strained, no additives, cold chain); optionally
  add one proof point (e.g. "No second heat treatment") so it remains a 3-card grid without
  repeating `LivingCulture`.

### 5. UX polish pass

- Consistent eyebrow → heading → subtitle spacing rhythm across all sections.
- `LivingCulture` reveal animation matching the site's `FadeContent` blur/duration.
- Smooth the vertical spacing where `CircleProtocol` was removed.

## Data flow

No new data sources. `LivingCulture` reads from new `culture.*` strings and existing
`BRAND.sourcing`. The jar-return band reads existing `BRAND.circle`. The `Order` section reuses
existing `BRAND.products` / `BRAND.plans`, `lib/checkout.ts`, and `lib/leads.ts`.

## Risk & verification

- **Only behavior-touching change:** the form merge. Mitigation — preserve both backend calls and
  per-form validation/success logic exactly; only the presentation is unified.
- **Verification:** build passes; manual smoke in browser — Living Culture renders and reveals;
  no duplicate D2C/B2B grids remain; Subscribe and One-time tabs each submit through their
  original code path; all in-page anchor links (`#subscribe`, `#reserve`, gateway CTAs) resolve;
  DE/EN toggle shows translated Living Culture copy; Swiss `ss` used throughout.

## Out of scope / future

- Optional: real photography for the Living Culture section (`krava-bowl-*.jpeg` exist in repo
  root but are not yet in `public/`).
