import Stripe from 'stripe';
import type { VercelRequest, VercelResponse } from '@vercel/node';

// Stripe-hosted Checkout for recurring subscriptions.
// Creates the Price inline (no need to pre-configure products in Dashboard).
const PLANS: Record<string, { name: string; amount: number; description: string }> = {
  performance: {
    name: 'Krava Performance',
    amount: 6500, // CHF 65.00 in rappen
    description: '2× 500 ml Daily pro Woche (8 Gläser · 4 kg/Monat)',
  },
  elite: {
    name: 'Krava Elite Balkan Soul',
    amount: 9500, // CHF 95.00 in rappen
    description: '2× 500 ml Strained oder 1× 1 L Reserve pro Woche',
  },
};

function isPlanId(v: unknown): v is keyof typeof PLANS {
  return typeof v === 'string' && v in PLANS;
}

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
    const planId: string = body.planId || '';
    const locale: string = body.locale === 'de' ? 'de' : 'en';

    if (!isPlanId(planId)) {
      return res.status(400).json({ error: 'Invalid or missing planId' });
    }

    const plan = PLANS[planId];
    const origin = req.headers.origin || `https://${req.headers.host}`;
    const customerEmail = body.email ? String(body.email).trim().toLowerCase() : undefined;

    const sessionConfig: Stripe.Checkout.SessionCreateParams = {
      mode: 'subscription',
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: 'chf',
            unit_amount: plan.amount,
            recurring: { interval: 'month' },
            product_data: {
              name: plan.name,
              description: plan.description,
            },
          },
        },
      ],
      locale: locale as Stripe.Checkout.SessionCreateParams.Locale,
      billing_address_collection: 'auto',
      shipping_address_collection: { allowed_countries: ['CH', 'LI'] },
      phone_number_collection: { enabled: true },
      success_url: `${origin}/preorder/success?session_id={CHECKOUT_SESSION_ID}&type=subscription`,
      cancel_url: `${origin}/preorder/cancel`,
      metadata: { type: 'subscription', planId },
      subscription_data: { metadata: { type: 'subscription', planId } },
    };

    if (customerEmail) {
      sessionConfig.customer_email = customerEmail;
    }

    const session = await stripe.checkout.sessions.create(sessionConfig);

    return res.status(200).json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to create subscription session';
    return res.status(500).json({ error: message });
  }
}
