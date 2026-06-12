# Krava Living Culture + Homepage De-dup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a hero-grade "Living Culture" (Lactobacillus bulgaricus) section to the Krava homepage and remove two structural section overlaps, while preserving all existing conversion backends.

**Architecture:** Pure React/Vite frontend changes. New `LivingCulture` section reads new `culture.*` i18n strings; the duplicate D2C/B2B card grid (`CircleProtocol`) is removed and its jar-return content folds into a slim band in `Subscriptions`; the two bottom forms (`SubscribeForm`, `PreorderReserve`) merge into one tabbed `Order` section by adding an `embedded` prop to each existing form (no backend/logic changes). Navbar/Footer `#circle` links repoint to the new `#culture` section.

**Tech Stack:** React 18 + TypeScript + Vite, Tailwind CSS, GSAP `FadeContent`, lucide-react. **No test runner exists** — verification is `npm run build` (tsc typecheck + Vite build) plus a browser smoke check.

---

## Conventions for every task

- **Working dir:** `use-case-apps/yogurt-landing`.
- **Verify command:** `npm run build` — expected: `tsc -b` passes with no type errors, Vite build completes, exit 0.
- **i18n rule:** every new chrome string gets BOTH a `de` and an `en` entry in `src/i18n/strings.ts`. Swiss High German: always `ss`, never `ß`. The bacterium name `Lactobacillus bulgaricus` / `L. bulgaricus` stays Latin in both languages.
- **Reveal animation:** new sections use `<FadeContent blur duration={1000}>` like existing sections (`import FadeContent from '@/components/FadeContent'`).

---

## File structure

| File | Responsibility | Action |
|------|----------------|--------|
| `src/i18n/strings.ts` | DE/EN chrome dictionary | Modify — add `culture.*`, `nav.culture` |
| `src/sections/LivingCulture.tsx` | New bulgaricus centerpiece section | Create |
| `src/sections/Subscriptions.tsx` | Plans + new jar-return band | Modify |
| `src/sections/CircleProtocol.tsx` | Old duplicate D2C/B2B grid | Delete |
| `src/sections/Transparency.tsx` | Farm/sourcing proof (drop culture card) | Modify |
| `src/sections/SubscribeForm.tsx` | Subscription form, now embeddable | Modify (add `embedded` prop) |
| `src/sections/PreorderReserve.tsx` | One-time reserve form, now embeddable | Modify (add `embedded` prop) |
| `src/sections/Order.tsx` | Unified tabbed order hub | Create |
| `src/sections/Navbar.tsx` | Repoint `#circle` → `#culture` | Modify |
| `src/sections/Footer.tsx` | Repoint `#circle` → `#culture` | Modify |
| `src/pages/Home.tsx` | Section composition | Modify |

---

## Task 1: i18n strings for Living Culture + nav

**Files:**
- Modify: `src/i18n/strings.ts` (DE block near line 5-50, EN block near line 131-162)

- [ ] **Step 1: Add `nav.culture` to both language blocks**

In the DE block, directly after the `'nav.subscribe': 'Abo',` line (line 6), add:

```ts
    'nav.culture': 'Die Kultur',
```

In the EN block, directly after `'nav.subscribe': 'Subscribe',` (line 132), add:

```ts
    'nav.culture': 'The Culture',
```

- [ ] **Step 2: Add `culture.*` strings to the DE block**

Add these keys to the DE block (e.g. just before the `'transparency.eyebrow'` line):

```ts
    'culture.eyebrow': 'Die lebendige Kultur',
    'culture.title': 'Das Bakterium, das nur Bulgarien hat',
    'culture.lead': 'Lactobacillus bulgaricus wächst nirgendwo sonst auf der Welt wild — es ist der eine Stamm, der bulgarisches Joghurt bulgarisch macht. Wir geben ihn in zertifizierte Schweizer Bio-Rohmilch und treten zurück. Den Rest erledigt die Kultur: Sie verwandelt echte Milch in einem langsamen, natürlichen Prozess in echtes Joghurt. Keine Verdickungsmittel, kein Pektin, kein Zucker, keine zweite Erhitzung, die die Kultur abtötet. Was im Glas ankommt, ist lebendig.',
    'culture.step1.label': 'Echte Milch',
    'culture.step2.label': 'L. bulgaricus',
    'culture.step3.label': 'Joghurt',
    'culture.t1.title': 'Echte Milch',
    'culture.t1.body': 'Schweizer Bio-Rohmilch. Eine Zutat, volle Rückverfolgbarkeit.',
    'culture.t2.title': 'Der lebendige Stamm',
    'culture.t2.body': 'L. bulgaricus, in Bulgarien beheimatet. Der aktive Held — kein Aroma.',
    'culture.t3.title': 'Natürliche Fermentation',
    'culture.t3.body': 'Milch wird von selbst zu Joghurt. Nichts zugesetzt, nichts abgetötet.',
```

- [ ] **Step 3: Add `culture.*` strings to the EN block**

Add the mirrored keys to the EN block (just before `'transparency.eyebrow'` in EN, near line 163+):

```ts
    'culture.eyebrow': 'The Living Culture',
    'culture.title': 'The bacterium that only Bulgaria has',
    'culture.lead': 'Lactobacillus bulgaricus grows wild nowhere else on earth — it is the single strain that makes Bulgarian yogurt Bulgarian. We add it to certified Swiss organic raw milk and step back. The culture does the rest: it ferments real milk into real yogurt through one slow, natural process. No thickeners, no pectin, no sugar, no second heat to kill the culture. What reaches your jar is alive.',
    'culture.step1.label': 'Real milk',
    'culture.step2.label': 'L. bulgaricus',
    'culture.step3.label': 'Yogurt',
    'culture.t1.title': 'Real milk',
    'culture.t1.body': 'Swiss organic raw milk. One ingredient, full traceability.',
    'culture.t2.title': 'The living strain',
    'culture.t2.body': 'L. bulgaricus, native to Bulgaria. The active hero, not a flavour.',
    'culture.t3.title': 'Natural fermentation',
    'culture.t3.body': 'Milk becomes yogurt on its own. Nothing added, nothing killed.',
```

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: exit 0, no TS errors. (New keys are valid because `StringKey` is derived from the dictionary's keys; adding to both blocks keeps them in sync.)

- [ ] **Step 5: Commit**

```bash
git add src/i18n/strings.ts
git commit -m "feat(krava): i18n strings for Living Culture section + nav.culture"
```

---

## Task 2: Create the `LivingCulture` section

**Files:**
- Create: `src/sections/LivingCulture.tsx`

- [ ] **Step 1: Write the component**

Create `src/sections/LivingCulture.tsx`:

```tsx
import { Milk, Sparkles, ArrowRight, FlaskConical, Leaf, Droplets } from 'lucide-react';
import { useLang } from '@/i18n/LangContext';
import type { StringKey } from '@/i18n/strings';
import FadeContent from '@/components/FadeContent';

const FLOW: { key: StringKey; icon: typeof Milk; hero?: boolean }[] = [
  { key: 'culture.step1.label', icon: Milk },
  { key: 'culture.step2.label', icon: FlaskConical, hero: true },
  { key: 'culture.step3.label', icon: Droplets },
];

const TILES: { titleKey: StringKey; bodyKey: StringKey; icon: typeof Milk }[] = [
  { titleKey: 'culture.t1.title', bodyKey: 'culture.t1.body', icon: Milk },
  { titleKey: 'culture.t2.title', bodyKey: 'culture.t2.body', icon: FlaskConical },
  { titleKey: 'culture.t3.title', bodyKey: 'culture.t3.body', icon: Leaf },
];

export default function LivingCulture() {
  const { t } = useLang();

  return (
    <section id="culture" className="relative z-10 py-24 lg:py-32 scroll-mt-20">
      <div className="container-landing">
        <FadeContent blur duration={1000}>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="label text-primary">{t('culture.eyebrow')}</span>
            <h2 className="font-heading text-4xl lg:text-5xl xl:text-6xl font-semibold text-foreground mt-4 mb-6">
              {t('culture.title')}
            </h2>
            <p className="text-lg lg:text-xl text-muted leading-relaxed">{t('culture.lead')}</p>
          </div>
        </FadeContent>

        {/* Flow: Real milk -> L. bulgaricus -> Yogurt */}
        <FadeContent blur duration={1000} delay={120}>
          <div className="flex items-center justify-center gap-3 sm:gap-6 lg:gap-10 mb-16 flex-wrap">
            {FLOW.map((step, i) => (
              <div key={step.key} className="flex items-center gap-3 sm:gap-6 lg:gap-10">
                <div className="flex flex-col items-center gap-3">
                  <div
                    className={`flex items-center justify-center rounded-full transition-all ${
                      step.hero
                        ? 'h-24 w-24 lg:h-28 lg:w-28 bg-primary text-white shadow-xl shadow-primary/25 ring-4 ring-primary/15'
                        : 'h-16 w-16 lg:h-20 lg:w-20 bg-card border border-border text-primary'
                    }`}
                  >
                    <step.icon size={step.hero ? 40 : 28} />
                  </div>
                  <span
                    className={`text-sm font-semibold text-center ${
                      step.hero ? 'text-primary italic' : 'text-foreground'
                    }`}
                  >
                    {t(step.key)}
                  </span>
                </div>
                {i < FLOW.length - 1 && (
                  <ArrowRight className="text-muted shrink-0" size={24} />
                )}
              </div>
            ))}
          </div>
        </FadeContent>

        {/* Supporting tiles */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {TILES.map((tile, i) => (
            <FadeContent key={tile.titleKey} blur duration={1000} delay={i * 120}>
              <div className="h-full rounded-3xl bg-card border border-border p-8">
                <tile.icon className="text-primary mb-5" size={32} />
                <h3 className="font-heading text-xl font-semibold text-foreground mb-3">{t(tile.titleKey)}</h3>
                <p className="text-muted leading-relaxed">{t(tile.bodyKey)}</p>
              </div>
            </FadeContent>
          ))}
        </div>
      </div>
    </section>
  );
}
```

Note: `Sparkles` is imported but if unused, remove it to satisfy `noUnusedLocals`. The list above uses `Milk, ArrowRight, FlaskConical, Leaf, Droplets` — final import line should be:

```tsx
import { Milk, ArrowRight, FlaskConical, Leaf, Droplets } from 'lucide-react';
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: exit 0. If a TS "declared but never read" error appears for an icon, remove that icon from the import.

- [ ] **Step 3: Commit**

```bash
git add src/sections/LivingCulture.tsx
git commit -m "feat(krava): LivingCulture section — L. bulgaricus story"
```

---

## Task 3: Wire `LivingCulture` into Home + Navbar

**Files:**
- Modify: `src/pages/Home.tsx`
- Modify: `src/sections/Navbar.tsx:12-15`

- [ ] **Step 1: Import and place the section in Home**

In `src/pages/Home.tsx`, add the import after the `DualGateway` import:

```tsx
import LivingCulture from '@/sections/LivingCulture';
```

Then place `<LivingCulture />` directly after `<DualGateway />` in the JSX:

```tsx
      <Hero />
      <DualGateway />
      <LivingCulture />
      <ProductLine />
      <Breakfast />
      <Subscriptions />
      <CircleProtocol />
      <Transparency />
      <SubscribeForm />
      <PreorderReserve />
```

(Later tasks remove `CircleProtocol` and merge the two forms; leave them for now so the page stays working between commits.)

- [ ] **Step 2: Add the nav link**

In `src/sections/Navbar.tsx`, the `links` array (lines ~11-16) currently includes a `nav.circle` entry. Add a `nav.culture` entry right after `nav.subscribe`:

```tsx
  { key: 'nav.subscribe', to: '/#subscribe', kind: 'hash' },
  { key: 'nav.culture', to: '/#culture', kind: 'hash' },
```

(The `nav.circle` entry is repointed/removed in Task 4 — leave it here for now.)

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: exit 0.

- [ ] **Step 4: Commit**

```bash
git add src/pages/Home.tsx src/sections/Navbar.tsx
git commit -m "feat(krava): mount LivingCulture after gateway + nav link"
```

---

## Task 4: Remove duplicate grid — fold jar-return into Subscriptions

**Files:**
- Modify: `src/sections/Subscriptions.tsx` (append band before closing `</div></section>`, near line 100-107)
- Modify: `src/pages/Home.tsx` (remove `CircleProtocol`)
- Modify: `src/sections/Navbar.tsx` (repoint/remove `nav.circle`)
- Modify: `src/sections/Footer.tsx:10-11` (remove `nav.circle` link)
- Delete: `src/sections/CircleProtocol.tsx`

- [ ] **Step 1: Add the jar-return band to Subscriptions**

In `src/sections/Subscriptions.tsx`, update the imports to include the icons and `BRAND.circle` data (the file already imports `BRAND, fmtCHF, p`). Add `Recycle, Home, ChefHat` to the lucide import:

```tsx
import { Check, Sparkles, CreditCard, Loader2, Recycle, Home, ChefHat } from 'lucide-react';
```

Then, immediately before the final closing `</div>\n      </div>\n    </section>` of the component, add the band inside the `container-landing` div (after the plans grid):

```tsx
        {/* Jar-return loop (folded in from the old CircleProtocol section) */}
        <FadeContent blur duration={1000} delay={200}>
          <div className="mt-14 max-w-3xl mx-auto rounded-3xl bg-card border border-border p-6 lg:p-8">
            <div className="flex items-center gap-2 justify-center mb-6">
              <Recycle size={22} className="text-primary" />
              <h3 className="font-heading text-lg font-semibold text-foreground">{t('circle.title')}</h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="flex items-start gap-3">
                <Home size={20} className="text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-foreground text-sm mb-1">{t('circle.d2c.title')}</p>
                  <p className="text-muted text-sm leading-relaxed">{p(lang, BRAND.circle.d2c)}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ChefHat size={20} className="text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-foreground text-sm mb-1">{t('circle.b2b.title')}</p>
                  <p className="text-muted text-sm leading-relaxed">{p(lang, BRAND.circle.b2b)}</p>
                </div>
              </div>
            </div>
          </div>
        </FadeContent>
```

(`lang` and `t` are already destructured from `useLang()` at the top of `Subscriptions`; `p` and `BRAND` are already imported.)

- [ ] **Step 2: Remove CircleProtocol from Home**

In `src/pages/Home.tsx`, delete the `import CircleProtocol from '@/sections/CircleProtocol';` line and remove the `<CircleProtocol />` element from the JSX.

- [ ] **Step 3: Repoint the nav link**

In `src/sections/Navbar.tsx`, change the existing `nav.circle` entry to remove it (the jar-return loop no longer has its own anchor). Delete this line from the `links` array:

```tsx
  { key: 'nav.circle', to: '/#circle', kind: 'hash' },
```

(The `nav.culture` link added in Task 3 now occupies that slot in the menu.)

- [ ] **Step 4: Repoint the footer link**

In `src/sections/Footer.tsx`, the link list (lines ~10-11) — remove the `nav.circle` entry if present, or change it to `nav.subscribe` is already there, so simply delete any `{ key: 'nav.circle', ... }` line.

- [ ] **Step 5: Delete the CircleProtocol file**

```bash
git rm src/sections/CircleProtocol.tsx
```

- [ ] **Step 6: Verify build**

Run: `npm run build`
Expected: exit 0, no "Cannot find module './CircleProtocol'" or unused-import errors. If `Check`/`Sparkles`/`CreditCard` become unused in Subscriptions, leave them — they are used by the plans grid.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "refactor(krava): remove duplicate CircleProtocol grid, fold jar-return into Subscriptions"
```

---

## Task 5: Refocus Transparency (drop the culture card)

**Files:**
- Modify: `src/sections/Transparency.tsx:9-13`

- [ ] **Step 1: Remove the culture point**

In `src/sections/Transparency.tsx`, the `points` array has three entries (`milk`, `culture`, `process`). The bacteria story now lives in `LivingCulture`, so replace the `culture` entry with a non-redundant proof point. Change the array to:

```tsx
  const points = [
    { icon: Milk, title: t('transparency.milk'), body: p(lang, BRAND.sourcing.milk) },
    { icon: ShieldCheck, title: t('transparency.noheat'), body: p(lang, BRAND.sourcing.process) },
    { icon: Snowflake, title: t('transparency.process'), body: p(lang, BRAND.sourcing.coldchain) },
  ];
```

Update the lucide import to swap `FlaskConical` for `ShieldCheck`:

```tsx
import { Milk, ShieldCheck, Snowflake } from 'lucide-react';
```

- [ ] **Step 2: Add the supporting strings and data**

In `src/i18n/strings.ts`, add to the DE block (near the other `transparency.*` keys):

```ts
    'transparency.noheat': 'Keine zweite Erhitzung',
```

and to the EN block:

```ts
    'transparency.noheat': 'No second heat',
```

In `src/data/brand.ts`, inside `sourcing`, add a `coldchain` entry after `process`:

```ts
    coldchain: {
      de: 'Durchgehende Kühlkette vom Hof bis zur Tür. Keine Konservierungsstoffe, keine Verdickungsmittel.',
      en: 'Unbroken cold chain from farm to door. No preservatives, no thickeners.',
    } as L,
```

(The existing `process` string — "hand-strained, no pectin/sugar/thickeners" — now pairs with the `ShieldCheck` "no second heat" card; `coldchain` backs the `Snowflake` card. This keeps three distinct, non-bacteria proof points.)

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: exit 0.

- [ ] **Step 4: Commit**

```bash
git add src/sections/Transparency.tsx src/i18n/strings.ts src/data/brand.ts
git commit -m "refactor(krava): refocus Transparency on sourcing proof (bacteria story moved to LivingCulture)"
```

---

## Task 6: Unified `Order` section (merge the two forms)

**Files:**
- Modify: `src/sections/SubscribeForm.tsx` (add `embedded` prop)
- Modify: `src/sections/PreorderReserve.tsx` (add `embedded` prop)
- Create: `src/sections/Order.tsx`
- Modify: `src/pages/Home.tsx` (replace the two form sections with `<Order />`)
- Modify: `src/i18n/strings.ts` (Order tab labels + heading)

- [ ] **Step 1: Make `SubscribeForm` embeddable**

In `src/sections/SubscribeForm.tsx`, change the component signature to accept a prop, and conditionally render the outer `<section>`/heading. Replace:

```tsx
export default function SubscribeForm() {
  const { lang, t } = useLang();
```

with:

```tsx
export default function SubscribeForm({ embedded = false }: { embedded?: boolean } = {}) {
  const { lang, t } = useLang();
```

Then locate the `return (` whose top is `<section id="subscribe-form" ...>`. Extract the inner content into a `body` variable and branch on `embedded`. Concretely, replace the outer wrapper so the function returns:

```tsx
  const body = (
    <FadeContent blur duration={1000} delay={150}>
      {/* ...EXISTING card <div className="max-w-lg mx-auto rounded-3xl ...">...</div> UNCHANGED... */}
    </FadeContent>
  );

  if (embedded) return body;

  return (
    <section id="subscribe-form" className="relative z-10 py-24 lg:py-32 scroll-mt-20">
      <div className="container-landing">
        <FadeContent blur duration={1000}>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-heading text-4xl lg:text-5xl font-semibold text-foreground mb-4">
              {t('subscribe.title')}
            </h2>
            <p className="text-lg text-muted">{t('subscribe.subtitle')}</p>
          </div>
        </FadeContent>
        {body}
      </div>
    </section>
  );
```

The `body` is exactly the existing second `<FadeContent>...card...</FadeContent>` block — move it verbatim into the `body` const. All state, handlers, `mode` toggle, and submit logic stay untouched.

- [ ] **Step 2: Make `PreorderReserve` embeddable**

Apply the identical pattern to `src/sections/PreorderReserve.tsx`. Change signature:

```tsx
export default function PreorderReserve({ embedded = false }: { embedded?: boolean } = {}) {
  const { t } = useLang();
```

Extract the card `<FadeContent blur duration={1000} delay={150}>...</FadeContent>` into a `body` const, then:

```tsx
  if (embedded) return body;

  return (
    <section id="reserve" className="relative z-10 py-24 lg:py-32 scroll-mt-20">
      <div className="container-landing">
        <FadeContent blur duration={1000}>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="label text-primary">{t('reserve.eyebrow')}</span>
            <h2 className="font-heading text-4xl lg:text-5xl font-semibold text-foreground mt-4 mb-4">
              {t('reserve.title')}
            </h2>
            <p className="text-lg text-muted">{t('reserve.subtitle')}</p>
          </div>
        </FadeContent>
        {body}
      </div>
    </section>
  );
```

- [ ] **Step 3: Add Order strings**

In `src/i18n/strings.ts` DE block:

```ts
    'order.eyebrow': 'Bestellen',
    'order.title': 'Hol dir dein Krava',
    'order.subtitle': 'Wöchentliches Abo oder einmalige Lieferung — du entscheidest.',
    'order.tab.subscribe': 'Abo',
    'order.tab.onetime': 'Einmalig',
```

EN block:

```ts
    'order.eyebrow': 'Order',
    'order.title': 'Get your Krava',
    'order.subtitle': 'Weekly subscription or a one-time delivery — your call.',
    'order.tab.subscribe': 'Subscribe',
    'order.tab.onetime': 'One-time',
```

- [ ] **Step 4: Create the Order section**

Create `src/sections/Order.tsx`:

```tsx
import { useEffect, useState } from 'react';
import { useLang } from '@/i18n/LangContext';
import FadeContent from '@/components/FadeContent';
import SubscribeForm from '@/sections/SubscribeForm';
import PreorderReserve from '@/sections/PreorderReserve';

type Tab = 'subscribe' | 'onetime';

export default function Order() {
  const { t } = useLang();
  const [tab, setTab] = useState<Tab>('subscribe');

  // Honour legacy in-page anchors: #reserve selects the one-time tab.
  useEffect(() => {
    const apply = () => {
      if (window.location.hash === '#reserve') setTab('onetime');
      else if (window.location.hash === '#subscribe-form') setTab('subscribe');
    };
    apply();
    window.addEventListener('hashchange', apply);
    return () => window.removeEventListener('hashchange', apply);
  }, []);

  return (
    <section id="order" className="relative z-10 py-24 lg:py-32 scroll-mt-20">
      {/* Legacy anchor targets so old links still resolve */}
      <span id="subscribe-form" className="block scroll-mt-24" aria-hidden />
      <span id="reserve" className="block scroll-mt-24" aria-hidden />
      <div className="container-landing">
        <FadeContent blur duration={1000}>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="label text-primary">{t('order.eyebrow')}</span>
            <h2 className="font-heading text-4xl lg:text-5xl font-semibold text-foreground mt-4 mb-4">
              {t('order.title')}
            </h2>
            <p className="text-lg text-muted">{t('order.subtitle')}</p>
          </div>
        </FadeContent>

        <FadeContent blur duration={1000} delay={120}>
          <div className="flex justify-center mb-10">
            <div className="inline-flex rounded-2xl border border-border bg-card p-1">
              {(['subscribe', 'onetime'] as Tab[]).map((tb) => (
                <button
                  key={tb}
                  type="button"
                  onClick={() => setTab(tb)}
                  className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    tab === tb ? 'bg-primary text-white shadow-sm' : 'text-muted hover:text-foreground'
                  }`}
                >
                  {t(tb === 'subscribe' ? 'order.tab.subscribe' : 'order.tab.onetime')}
                </button>
              ))}
            </div>
          </div>
        </FadeContent>

        <div className={tab === 'subscribe' ? 'block' : 'hidden'}>
          <SubscribeForm embedded />
        </div>
        <div className={tab === 'onetime' ? 'block' : 'hidden'}>
          <PreorderReserve embedded />
        </div>
      </div>
    </section>
  );
}
```

(Both forms render but the inactive one is `hidden` via CSS, preserving each form's internal state without unmount churn.)

- [ ] **Step 5: Swap into Home**

In `src/pages/Home.tsx`, remove the `SubscribeForm` and `PreorderReserve` imports and add the `Order` import:

```tsx
import Order from '@/sections/Order';
```

Replace the trailing `<SubscribeForm />` and `<PreorderReserve />` elements with a single `<Order />`. Final JSX:

```tsx
      <Hero />
      <DualGateway />
      <LivingCulture />
      <ProductLine />
      <Breakfast />
      <Subscriptions />
      <Transparency />
      <Order />
```

- [ ] **Step 6: Verify build**

Run: `npm run build`
Expected: exit 0. Watch for: duplicate-`id` is not a TS error (fine); unused-import errors if `SubscribeForm`/`PreorderReserve` are still imported in Home (remove them).

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat(krava): unified Order section — Subscribe/One-time tabs replace two stacked forms"
```

---

## Task 7: UX polish + final verification

**Files:**
- Modify: `src/sections/*.tsx` as needed (spacing only)
- Browser smoke check

- [ ] **Step 1: Spacing rhythm pass**

Confirm consistent vertical rhythm now that `CircleProtocol` is gone and `Order` replaced two sections. Sections should alternate `py-24 lg:py-32`. `DualGateway` uses `py-24 lg:py-28` by design (tighter, follows hero) — leave it. No code change unless a section visibly collides; if so, adjust only the `py-*` utility.

- [ ] **Step 2: Run the dev server and smoke-check in a browser**

Run: `npm run dev` and open the local URL. Verify:
- Living Culture renders after the gateway; the `Real milk → L. bulgaricus → Yogurt` flow shows with the middle node emphasized; tiles reveal on scroll.
- No two identical D2C/B2B card grids remain.
- The Order section shows the `Subscribe | One-time` toggle; clicking each shows the correct form; submitting Subscribe still reaches `startSubscriptionCheckout`/lead path and One-time still reaches `reservePreorder` (network tab shows the request, or success state appears).
- Nav "The Culture / Die Kultur" scrolls to `#culture`; no nav item points to a missing `#circle`.
- DE/EN toggle translates all new Living Culture and Order copy; Swiss `ss` used (no `ß`).

- [ ] **Step 3: Final build**

Run: `npm run build`
Expected: exit 0.

- [ ] **Step 4: Commit any polish tweaks**

```bash
git add -A
git commit -m "polish(krava): spacing rhythm after section restructure"
```

---

## Self-review notes (addressed)

- **Spec coverage:** Living Culture (Tasks 1-3), de-dupe #1 / CircleProtocol removal + jar-return band (Task 4), de-dupe #2 / unified Order (Task 6), Transparency refocus (Task 5), UX polish (Task 7). All spec sections mapped.
- **No test runner:** project has no test script; verification is `npm run build` + browser smoke, consistent with project conventions (no scope creep adding a test framework).
- **Anchor safety:** nothing in `src` links to `#reserve` or `#subscribe-form`; Navbar/Footer `#circle` repointed/removed; legacy anchors still rendered inside `Order` for safety; `#subscribe` (plans) and `#products` unchanged.
- **Type consistency:** `embedded?: boolean` prop used identically in both forms and in `Order`; new string keys added to BOTH `de` and `en` blocks so `StringKey` stays valid.
