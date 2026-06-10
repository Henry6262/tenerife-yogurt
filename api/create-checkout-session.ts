import Stripe from 'stripe';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { CATALOG, isSku, clampQty } from './_catalog.js';

// Stripe-hosted Checkout for the 2-week pre-order ("pay now" path).
// Payment methods (TWINT, cards, Apple/Google Pay) are controlled via dynamic
// payment methods in the Stripe Dashboard — do NOT hardcode payment_method_types.
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return res.status(500).json({ error: 'Stripe is not configured (STRIPE_SECRET_KEY missing)' });
  }

  try {
    const stripe = new Stripe(secretKey);
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
    const items: Array<{ sku?: string; quantity?: number }> = Array.isArray(body.items) ? body.items : [];
    const locale: string = body.locale === 'de' ? 'de' : 'en';

    if (items.length === 0) {
      return res.status(400).json({ error: 'No items in pre-order' });
    }

    const line_items = items.map((it) => {
      if (!isSku(it.sku)) throw new Error(`Unknown SKU: ${it.sku}`);
      const product = CATALOG[it.sku];
      return {
        quantity: clampQty(it.quantity),
        price_data: {
          currency: 'chf',
          unit_amount: product.amount,
          product_data: { name: `${product.name} — Pre-order`, description: product.size },
        },
      };
    });

    const origin = req.headers.origin || `https://${req.headers.host}`;

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items,
      locale: locale as Stripe.Checkout.SessionCreateParams.Locale,
      billing_address_collection: 'auto',
      shipping_address_collection: { allowed_countries: ['CH', 'LI'] },
      phone_number_collection: { enabled: true },
      success_url: `${origin}/preorder/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/preorder/cancel`,
      metadata: { type: 'preorder' },
      payment_intent_data: { metadata: { type: 'preorder' } },
    });

    return res.status(200).json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to create checkout session';
    return res.status(500).json({ error: message });
  }
}
