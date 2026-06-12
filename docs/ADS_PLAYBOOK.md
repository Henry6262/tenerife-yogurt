# Krava Ads Playbook — Budget-First Launch Plan

> Goal: Get followers on Instagram + TikTok, and capture pre-orders, without burning your savings.  
> Assumption: Total monthly budget CHF 1,000–3,000. If yours is lower, shrink the daily numbers proportionally — but never below the minimums listed.

---

## 0. The One Rule That Saves Your Money

**Consolidate. Never split.**

Meta’s algorithm needs ~50 conversion events per week per ad set to exit the “learning phase” and actually optimize. If your target cost per pre-order is CHF 25, you need CHF 1,250/week per ad set. If you run 5 ad sets with CHF 10/day each, the algorithm never learns — you burn cash on random guesses.

**Hard limits (non-negotiable):**
- **Max 2 ad sets per campaign** with a budget under CHF 3,000/month.
- **Never increase budget by more than 20% every 72 hours.** Doubling spend overnight resets learning and spikes costs for 3–5 days.
- **Let ads run 72 hours untouched before judging them.** The first 48h are always unstable.

---

## 1. What You Need Before Spending a Franc

### Accounts (create in this order)

| # | Account | Time | Cost | What you get |
|---|---------|------|------|--------------|
| 1 | **Stripe** (stripe.com) | 5 min | Free | `sk_test_…` key → I verify checkout works today. No business needed for test mode. |
| 2 | **Meta Business** (business.facebook.com) | 15 min | Free | One pixel covers Facebook + Instagram. Need a personal FB account. |
| 3 | **TikTok Ads** (ads.tiktok.com) | 15 min | Free | Separate pixel. Need a TikTok Business account (convert your profile). |

> **Business registration:** You can run test payments and collect leads without it. To take real CHF and invoice legally in Switzerland, Stripe activation needs a Swiss Einzelfirma + IBAN. That’s the real gate — not the code.

### Tech checklist (I handle once you paste IDs)

- [ ] Paste `VITE_META_PIXEL_ID` into `.env` + Vercel
- [ ] Paste `VITE_TIKTOK_PIXEL_ID` into `.env` + Vercel
- [ ] Paste `STRIPE_SECRET_KEY` (test first, live later)
- [ ] Re-deploy → verify pixels fire with the Meta Pixel Helper browser extension
- [ ] Run one test pre-order end-to-end (test card `4242 4242 4242 4242`)

---

## 2. Phase-by-Phase Campaign Structure

### Phase 1: Warm-Up (Weeks 1–2) — “Teach the Algorithm”

**Goal:** Build pixel data, get cheap followers, identify winning creatives.  
**Budget:** CHF 20–30/day total across both platforms.

| Platform | Objective | Daily Budget | Why |
|----------|-----------|--------------|-----|
| **Meta** (FB + IG) | **Engagement** or **Video Views** | CHF 12–15 | Cheap. Builds warm audiences you retarget later. Algorithm learns who likes your content. |
| **TikTok** | **Video Views** or **Followers** | CHF 10–15 | Even cheaper reach than Meta. Best platform for food content discovery. |

**Creative test:** Run 3–5 video variations per platform. Same hook, different opening 1–3 seconds.

**Targeting (both platforms):**
- **Location:** Switzerland → Canton Zürich + 40km radius (or all German-speaking Switzerland if budget allows)
- **Age:** 25–50
- **Gender:** All
- **Languages:** German, English
- **Interests:** Organic food, healthy eating, yoga, CrossFit, probiotics, gut health, Swiss products, cooking, meal prep
- **Placements:** Automatic (let algorithm pick). On Meta, definitely include Instagram Reels + Stories.

> **Why not conversions yet?** Cold conversion campaigns in Switzerland cost CHF 15–40 per click with zero pixel data. You’ll burn your whole budget in 3 days with nothing to show. Warm-up first.

---

### Phase 2: Convert (Weeks 3–4) — “Retarget the Warm”

**Goal:** Pre-orders, email signups, subscription interest.  
**Budget:** CHF 40–60/day total.

| Platform | Objective | Daily Budget | Audience |
|----------|-----------|--------------|----------|
| **Meta** | **Sales** or **Leads** | CHF 25–30 | Custom: 50% video viewers (past 14 days) + website visitors (past 30 days) |
| **TikTok** | **Website Conversions** | CHF 15–25 | Custom: Video viewers 50%+ (past 14 days) + profile engagers |

**Creative:** Use your best-performing organic posts from Phase 1, but add a clear CTA card at the end: “First batch: 200 jars · Pre-order now · Link in bio.”

**Landing page:** Send traffic to `krava.ch/#subscribe` or `krava.ch/#products`. The pre-order flow must be one click from the ad.

---

### Phase 3: Scale (Month 2+) — “Lookalikes + Scale”

**Goal:** Acquire new customers profitably.  
**Budget:** Scale winning campaigns by 20% every 3–4 days. Stop when CPA rises above your target for 2+ days.

| Platform | Objective | Audience |
|----------|-----------|----------|
| **Meta** | Sales/Leads | Lookalike 1–3% of: purchasers, add-to-carts, or email signups |
| **TikTok** | Website Conversions | Lookalike of complete payment events |

---

## 3. Creative Angles — Ready to Shoot / Edit

Use the 6 organic posts you already wrote. For **paid ads**, you need a stronger hook in the first 1 second and a clearer CTA.

### Ad Hook Templates (0–3 seconds, text-on-screen)

| # | Hook | Format | Platform |
|---|------|--------|----------|
| 1 | *“Dieser Joghurt hat nur 2 Zutaten.”* (show jar, ingredient list) | Reel / TikTok | Both |
| 2 | *“Kei Zucker. Kei Stabilisator. Nur Milch + Kultur.”* (close-up texture shot) | Reel / TikTok | Both |
| 3 | *“Warum hesch du um 10i scho wieder Hunger?”* (show sad breakfast → cut to Krava) | Reel / TikTok | Both |
| 4 | *“Schwiizer Milch. Bulgarischi Seel.”* (aerial Zürich → farm → jar) | Reel / TikTok | Both |
| 5 | *“De Pfannetest.”* (drop yogurt in hot pan — stable, no curdling) | Reel / TikTok | Both (B2B angle) |
| 6 | *“200 Gläser. 1 Charge. Zürich.”* (scarcity + local pride) | Story / Reel | Meta |

### Caption formula (paid ads)

```
[HOOK — 1 line, big claim or question]
[PROOF — 1–2 lines: 2:1 strained, live cultures, Swiss milk]
[CTA — 1 line with urgency: “First batch closes Friday · Link in Bio”]
```

**Example (DE):**
> Die meischte Joghurt im Regal sind tot. Üsi sind läbig — Milch + Kultur, 2:1 gesiebt, vo Familiehöf im Züri-Oberland. Ersti Charge: 200 Gläser. Reservier dinne — Link in Bio.

**Example (EN):**
> Most supermarket yogurt is dead after the second heat treatment. Ours stays alive — raw Swiss milk + original Bulgarian cultures, strained 2:1 by hand. First batch: 200 jars. Pre-order via link in bio.

---

## 4. Targeting Specifications — Switzerland

### Meta (Facebook + Instagram)

**Ad Set 1 — Broad (Phase 1):**
- Locations: Living in Switzerland, within 40km of Zürich (or all CH if budget > CHF 2,000/mo)
- Age: 25–50
- Detailed targeting:
  - Interests: Organic food, Healthy eating, Probiotics, Yoga, CrossFit, Meal preparation, Whole Foods Market, Swiss products
  - Behaviors: Engaged shoppers
- Placements: Advantage+ Placements (recommended for small budgets)

**Ad Set 2 — Retargeting (Phase 2):**
- Custom Audience: People who watched 50% of your video (past 14 days)
- OR: Website visitors (past 30 days) — pixel must be firing
- Exclusion: People who already purchased (past 30 days)

**Ad Set 3 — Lookalike (Phase 3):**
- Source: Customer list (emails from pre-orders/subscriptions) OR Purchasers pixel event
- Lookalike: 1% → 3% of Switzerland

### TikTok

**Ad Set 1 — Broad (Phase 1):**
- Locations: Switzerland
- Age: 22–45
- Languages: German, English
- Interests: Food & Drink, Healthy Lifestyle, Cooking, Fitness, Organic Products
- Behaviors: Video interactions (watched to end, liked, shared)

**Ad Set 2 — Retargeting (Phase 2):**
- Custom Audience: Engaged with your TikTok profile (past 15 days)
- OR: Watched 50%+ of your videos (past 15 days)

---

## 5. The Kill Rules — When to Stop an Ad

Check every morning. Be ruthless. An ad that’s bleeding money for 3 days rarely recovers.

| Metric | Rule | Action |
|--------|------|--------|
| **CTR (Link Click-Through Rate)** | < 1.0% after 3 days / 3,000 impressions | Kill the creative. Hook is weak. |
| **CPC (Cost Per Click)** | > CHF 2.00 for cold traffic; > CHF 1.50 for retargeting | Kill the ad set. Audience or creative mismatch. |
| **CPM (Cost Per 1,000 impressions)** | > CHF 20 in Switzerland | Kill. Your targeting is too narrow or competition is high. |
| **Frequency** | > 3.0 on retargeting; > 2.5 on cold | Refresh creative. Same people see it too often. |
| **CPA (Cost Per Acquisition)** | > your target (e.g., CHF 25 per pre-order) for 2+ days | Kill. Check landing page conversion rate — if CTR is good but CPA is bad, the landing page is the problem. |
| **ROAS** | < 1.5 for 3+ days on purchase campaigns | Pause. Revisit offer, price, or audience. |

**Swiss benchmark expectations (food/D2C):**
- Cold traffic CPM: CHF 8–15
- Cold traffic CPC: CHF 0.80–2.00
- Retargeting CPC: CHF 0.40–1.00
- Conversion rate (landing page): 2–5% (warm), 0.5–1.5% (cold)

---

## 6. Automated Rules (Set These on Day 1)

In Meta Ads Manager → Rules → Create Rule. These protect your budget while you sleep.

### Meta Automated Rules

1. **Pause expensive ad sets**
   - Condition: CPA > CHF 30 AND spend > CHF 50 (last 3 days)
   - Action: Pause ad set + email notification

2. **Pause fatigued ads**
   - Condition: Frequency > 3.0 AND spend > CHF 30 (last 7 days)
   - Action: Pause ad

3. **Scale winners cautiously**
   - Condition: ROAS > 2.0 AND spend > CHF 50 (last 3 days)
   - Action: Increase daily budget by 20% + email notification

### TikTok Automated Rules

1. **Pause underperformers**
   - Condition: CPC > CHF 1.50 AND impressions > 2,000 (last 3 days)
   - Action: Pause ad group

2. **Pause fatigued**
   - Condition: Frequency > 3.0 (last 7 days)
   - Action: Pause ad group

---

## 7. Budget Calculator

Use this to set realistic expectations before you spend.

**If your goal is pre-orders at CHF 25 CPA:**

| Monthly Budget | Daily Budget | Max Ad Sets | Expected Pre-Orders/Month | Note |
|----------------|--------------|-------------|---------------------------|------|
| CHF 1,000 | CHF 33 | 1 | ~30–40 | Phase 1 only. Not enough for conversions. |
| CHF 2,000 | CHF 66 | 2 | ~60–80 | Phase 2 retargeting viable. |
| CHF 3,000 | CHF 100 | 2–3 | ~100–120 | Phase 3 lookalikes possible. |
| CHF 5,000 | CHF 166 | 3 | ~160–200 | Comfortable scale zone. |

**If your goal is followers (much cheaper):**

| Monthly Budget | Daily Budget | Expected Followers/Month (TikTok) | Expected Followers/Month (Meta) |
|----------------|--------------|-----------------------------------|---------------------------------|
| CHF 1,000 | CHF 33 | 500–1,500 | 300–800 |
| CHF 2,000 | CHF 66 | 1,500–3,000 | 800–1,800 |

> Follower quality matters more than count. 100 followers who buy > 1,000 who never engage.

---

## 8. Platform-Specific Tactics

### Instagram (via Meta Ads)

- **Best format:** Reels ads. They get the cheapest reach right now.
- **Stories ads:** Good for retargeting, use the “swipe up” CTA (or link sticker equivalent).
- **Feed ads:** Skip for now unless you have high-production static images. Reels outperform everything.
- **IG profile:** Must be a Business or Creator account to run ads. Link your Meta Business account.

### TikTok

- **Best format:** Spark Ads (boost your existing organic posts). They feel native and get better engagement than standard ads.
- **Hook timing:** If they don’t stop scrolling in 0.5 seconds, you lost them. Start with motion, not a logo.
- **Sound:** Use trending sounds for organic, but for Spark Ads your original audio works fine.
- **CTA:** “Link in bio” is the standard. Make sure your bio link goes straight to the landing page.

---

## 9. The Landing Page Checklist (Before Any Ad Spend)

Your ads are only as good as the page they land on. Verify these:

- [ ] **Mobile load time < 3 seconds.** (The 1.5MB JS bundle is heavy — lazy-load the 3D bowl below the fold.)
- [ ] **Hero headline is clear in 2 seconds.** “Schweizer Reinheit, bulgarische Seele” + pre-order CTA visible without scrolling.
- [ ] **One primary CTA per section.** Don’t give people 5 buttons.
- [ ] **Price is visible.** CHF 8.50 / CHF 15.00 — no surprises at checkout.
- [ ] **Trust signals:** TWINT accepted, Swiss made, local delivery.
- [ ] **Checkout works end-to-end.** Test with Stripe test card `4242 4242 4242 4242`.
- [ ] **Pixels fire on all events.** Use Meta Pixel Helper Chrome extension. Verify: PageView, InitiateCheckout, Purchase.

---

## 10. What I Need From You to Activate Everything

Paste these 3 strings and I flip it on instantly:

```
VITE_META_PIXEL_ID=__________
VITE_TIKTOK_PIXEL_ID=__________
STRIPE_SECRET_KEY=sk_test__________
```

After that, the only thing between you and live pre-orders is pressing “Publish” in Ads Manager.

---

## 11. Weekly Ritual (15 min every Monday)

1. Open Ads Manager + TikTok Ads Manager
2. Check last 7 days: CTR, CPC, CPA, frequency
3. Kill anything matching the Kill Rules
4. Increase winning budgets by 20% (if they’ve been stable 3+ days)
5. Upload 2–3 new creative variations
6. Check landing page conversion rate in Vercel analytics (or Stripe dashboard)
7. Note what worked in a simple spreadsheet: Creative | Hook | CTR | CPA | Keep/Kill

---

*Playbook version: 2026-06-10. Update when pixel data changes your benchmarks.*
