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

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/yogurt-leads';

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
}

export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
