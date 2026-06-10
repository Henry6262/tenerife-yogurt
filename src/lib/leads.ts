import { track } from '@/lib/analytics';

export type Channel = 'subscription' | 'one-time' | 'b2b';

export interface LeadPayload {
  channel: Channel;
  name: string;
  email: string;
  phone?: string;
  // D2C / subscription
  address?: string;
  plan?: string;
  // B2B
  restaurant?: string;
  weeklyVolumeKg?: string;
  message?: string;
}

// Same-origin Vercel function by default (works in prod with no extra config);
// override with VITE_API_URL only if pointing at an external lead backend.
const API_URL = import.meta.env.VITE_API_URL || '/api/lead';

/** POST a lead to the shared endpoint. Throws on non-2xx so the form can show an error. */
export async function submitLead(payload: LeadPayload): Promise<void> {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || `Request failed (${res.status})`);
  }
  track('lead', { content_category: payload.channel });
}

export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
