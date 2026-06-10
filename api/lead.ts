import type { VercelRequest, VercelResponse } from '@vercel/node';

// Captures subscription + B2B leads (SubscribeForm / ChefForm). Same-origin,
// so it works in production without a separate backend. Best-effort email via
// Resend if configured; always logged so nothing is silently lost.
const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v).trim());

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
    const { channel, name, email, phone, address, plan, restaurant, weeklyVolumeKg, message } = body;

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

    console.log('[lead]', JSON.stringify(lead));
    return res.status(200).json({ ok: true, notified });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to record lead';
    return res.status(500).json({ error: message });
  }
}
