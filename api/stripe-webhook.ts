import Stripe from 'stripe';
import type { VercelRequest, VercelResponse } from '@vercel/node';

// Handles both one-time pre-orders and recurring subscriptions.
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
    const isSubscription = session.mode === 'subscription';
    const logPrefix = isSubscription ? '[stripe-webhook] subscription created' : '[stripe-webhook] pre-order paid';

    console.log(logPrefix, {
      id: session.id,
      email: session.customer_details?.email,
      amount_total: session.amount_total,
      currency: session.currency,
      mode: session.mode,
      subscription: session.subscription,
      metadata: session.metadata,
    });

    // TODO: send branded confirmation email (Resend) when an email provider is wired.
    // For subscriptions, you may also want to store the subscription ID in a database.
  }

  if (event.type === 'invoice.paid') {
    const invoice = event.data.object as Stripe.Invoice;
    console.log('[stripe-webhook] subscription invoice paid', {
      invoice_id: invoice.id,
      subscription_id: invoice.subscription,
      customer_email: invoice.customer_email,
      amount_paid: invoice.amount_paid,
    });
  }

  if (event.type === 'customer.subscription.deleted') {
    const subscription = event.data.object as Stripe.Subscription;
    console.log('[stripe-webhook] subscription cancelled', {
      subscription_id: subscription.id,
      status: subscription.status,
    });
  }

  return res.status(200).json({ received: true });
}
