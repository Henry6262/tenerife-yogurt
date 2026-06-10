import type { VercelRequest, VercelResponse } from '@vercel/node';
import { CATALOG, isSku, clampQty } from './_catalog';

// "Pay on delivery" path — captures a pre-order without charging a card.
// Best-effort notification to the shop via Resend if configured; always logged.
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
    const { name, email, phone, address, sku, quantity, note } = body;

    if (!name || !email || !address || !isSku(sku)) {
      return res.status(400).json({ error: 'Missing required fields (name, email, address, product)' });
    }

    const product = CATALOG[sku];
    const order = {
      name: String(name).trim(),
      email: String(email).trim().toLowerCase(),
      phone: phone ? String(phone).trim() : null,
      address: String(address).trim(),
      sku,
      product: product.name,
      quantity: clampQty(quantity, 50),
      note: note ? String(note).trim() : null,
      payment: 'on-delivery',
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
            reply_to: order.email,
            subject: `Neue Vorbestellung (Zahlung bei Lieferung): ${order.product} ×${order.quantity}`,
            text: Object.entries(order).map(([k, v]) => `${k}: ${v}`).join('\n'),
          }),
        });
        notified = r.ok;
      } catch {
        notified = false;
      }
    }

    // Always log so the order is recoverable from Vercel function logs even
    // before an email provider is wired.
    console.log('[preorder-reserve]', JSON.stringify(order));

    return res.status(200).json({ ok: true, notified });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to record pre-order';
    return res.status(500).json({ error: message });
  }
}
