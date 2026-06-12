import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createHash } from 'node:crypto';

// Captures subscription + B2B leads (SubscribeForm / ChefForm). Same-origin,
// so it works in production without a separate backend. Best-effort email via
// Resend if configured; always logged so nothing is silently lost.
const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v).trim());

const sha256 = (v: string) => createHash('sha256').update(v).digest('hex');

/**
 * Server-side Meta Conversions API: mirrors the browser Lead event so it
 * survives ad blockers / iOS. Deduplicated against the pixel via eventId.
 * Only fires when the visitor granted marketing consent. Best-effort —
 * never blocks lead capture.
 */
async function sendMetaCapiLead(opts: {
  email: string;
  phone: string | null;
  eventId?: string;
  eventSourceUrl?: string;
  channel: string;
  ip?: string;
  userAgent?: string;
}) {
  const token = process.env.META_CAPI_TOKEN;
  const pixelId = process.env.META_PIXEL_ID;
  if (!token || !pixelId) return false;

  const userData: Record<string, unknown> = {
    em: [sha256(opts.email)],
    client_user_agent: opts.userAgent,
  };
  if (opts.phone) {
    const digits = opts.phone.replace(/\D/g, '');
    if (digits) userData.ph = [sha256(digits.startsWith('0') ? `41${digits.slice(1)}` : digits)];
  }
  if (opts.ip) userData.client_ip_address = opts.ip;

  const payload = {
    data: [
      {
        event_name: 'Lead',
        event_time: Math.floor(Date.now() / 1000),
        action_source: 'website',
        event_id: opts.eventId,
        event_source_url: opts.eventSourceUrl,
        user_data: userData,
        custom_data: { content_category: opts.channel },
      },
    ],
  };

  try {
    const r = await fetch(`https://graph.facebook.com/v21.0/${pixelId}/events?access_token=${token}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!r.ok) console.log('[capi] non-ok', r.status, await r.text().catch(() => ''));
    return r.ok;
  } catch (err) {
    console.log('[capi] failed', err instanceof Error ? err.message : err);
    return false;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
    const { channel, name, email, phone, address, plan, restaurant, weeklyVolumeKg, message, eventId, eventSourceUrl, marketingConsent } = body;

    if (!name || !isEmail(email)) {
      return res.status(400).json({ error: 'Missing or invalid name/email' });
    }

    const lead = {
      channel: channel || 'unknown',
      name: String(name).trim(),
      email: String(email).trim().toLowerCase(),
      phone: phone ? String(phone).trim() : null,
      address: address ? String(address).trim() : null,
      plan: plan || null,
      restaurant: restaurant || null,
      weeklyVolumeKg: weeklyVolumeKg || null,
      message: message ? String(message).trim() : null,
      at: new Date().toISOString(),
    };

    let notified = false;
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      try {
        const r = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            from: process.env.PREORDER_FROM_EMAIL || 'Krava <onboarding@resend.dev>',
            to: [process.env.PREORDER_NOTIFY_EMAIL || 'hallo@krava.ch'],
            reply_to: lead.email,
            subject: `Neuer Lead (${lead.channel}): ${lead.name}`,
            text: Object.entries(lead).map(([k, v]) => `${k}: ${v}`).join('\n'),
          }),
        });
        notified = r.ok;
      } catch {
        notified = false;
      }
    }

    let capi = false;
    if (marketingConsent === true) {
      capi = await sendMetaCapiLead({
        email: lead.email,
        phone: lead.phone,
        eventId: typeof eventId === 'string' ? eventId : undefined,
        eventSourceUrl: typeof eventSourceUrl === 'string' ? eventSourceUrl : undefined,
        channel: lead.channel,
        ip: (String(req.headers['x-forwarded-for'] || '').split(',')[0] || undefined)?.trim(),
        userAgent: String(req.headers['user-agent'] || '') || undefined,
      });
    }

    console.log('[lead]', JSON.stringify(lead));
    return res.status(200).json({ ok: true, notified, capi });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to record lead';
    return res.status(500).json({ error: message });
  }
}
