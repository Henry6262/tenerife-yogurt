import Stripe from 'stripe';
import type { VercelRequest, VercelResponse } from '@vercel/node';

// OPTIONAL for launch — orders are always visible in the Stripe Dashboard.
// This only powers automated confirmation/notification on `checkout.session.completed`.
// Signature verification needs the raw request body, so we read the stream
// directly and never touch req.body.
export const config = { api: { bodyParser: false } };

async function readRawBody(req: VercelRequest): Promise<Buffer> {
  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end();
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secretKey) return res.status(500).json({ error: 'Stripe not configured' });

  const stripe = new Stripe(secretKey);
  let event: Stripe.Event;

  try {
    const raw = await readRawBody(req);
    const sig = req.headers['stripe-signature'];
    if (webhookSecret && sig) {
      event = stripe.webhooks.constructEvent(raw, sig, webhookSecret);
    } else {
      // No signing secret configured yet — accept unverified in test only.
      event = JSON.parse(raw.toString('utf8')) as Stripe.Event;
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'invalid payload';
    return res.status(400).json({ error: `Webhook signature verification failed: ${message}` });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    console.log('[stripe-webhook] pre-order paid', {
      id: session.id,
      email: session.customer_details?.email,
      amount_total: session.amount_total,
      currency: session.currency,
    });
    // TODO: send branded confirmation email (Resend) when an email provider is wired.
  }

  return res.status(200).json({ received: true });
}
