// Client helpers for the pre-order flow. The "pay now" path redirects to
// Stripe-hosted Checkout; the "pay on delivery" path records a reservation.

import { BRAND } from '@/data/brand';
import { track } from '@/lib/analytics';

export type Sku = 'daily' | 'strained' | 'reserve';

export interface CartItem {
  sku: Sku;
  quantity?: number;
}

const PENDING_PURCHASE_KEY = 'krava_pending_purchase';

/** Total CHF value of a cart, from the client-side catalog (for ad event values). */
function cartValue(items: CartItem[]): number {
  return items.reduce((sum, it) => {
    const product = BRAND.products.find((p) => p.id === it.sku);
    return sum + (product ? product.price * (it.quantity || 1) : 0);
  }, 0);
}

/** Create a Stripe Checkout Session and redirect the browser to it. */
export async function startCheckout(items: CartItem[], locale: 'de' | 'en'): Promise<void> {
  const value = cartValue(items);
  const numItems = items.reduce((n, it) => n + (it.quantity || 1), 0);
  track('checkout', { value, currency: 'CHF', num_items: numItems, contents: items });
  // Stash value so the success page can fire Purchase with the real amount
  // (survives the round-trip to Stripe and back, same tab/origin).
  try {
    sessionStorage.setItem(PENDING_PURCHASE_KEY, JSON.stringify({ value, currency: 'CHF' }));
  } catch {
    /* ignore storage failures */
  }

  const res = await fetch('/api/create-checkout-session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items, locale }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || `Checkout failed (${res.status})`);
  }
  const { url } = await res.json();
  if (!url) throw new Error('No checkout URL returned');
  window.location.href = url;
}

export interface ReservePayload {
  name: string;
  email: string;
  phone?: string;
  address: string;
  sku: Sku;
  quantity?: number;
  note?: string;
}

/** Record a "pay on delivery" pre-order (no card charged). */
export async function reservePreorder(payload: ReservePayload): Promise<{ ok: boolean; notified: boolean }> {
  const res = await fetch('/api/preorder-reserve', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || `Reservation failed (${res.status})`);
  }
  const product = BRAND.products.find((p) => p.id === payload.sku);
  track('lead', {
    content_category: 'preorder_reserve',
    content_name: payload.sku,
    value: product ? product.price * (payload.quantity || 1) : undefined,
    currency: 'CHF',
  });
  return res.json();
}

export { PENDING_PURCHASE_KEY };

export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
