// Server-side source of truth for pre-order pricing. NEVER trust client prices.
// Amounts are in rappen (CHF * 100), matching Stripe's smallest-unit convention.

export type Sku = 'daily' | 'strained' | 'reserve';

export interface CatalogItem {
  name: string;
  size: string;
  amount: number; // rappen
}

export const CATALOG: Record<Sku, CatalogItem> = {
  daily: { name: 'Krava Daily', size: '500 ml', amount: 850 },
  strained: { name: 'Krava Strained', size: '500 ml · 2:1 strained', amount: 1500 },
  reserve: { name: 'Krava Reserve', size: '1 L · extra-strained', amount: 2400 },
};

export function isSku(v: unknown): v is Sku {
  return typeof v === 'string' && v in CATALOG;
}

export function clampQty(v: unknown, max = 20): number {
  const n = parseInt(String(v), 10);
  if (!Number.isFinite(n) || n < 1) return 1;
  return Math.min(n, max);
}
