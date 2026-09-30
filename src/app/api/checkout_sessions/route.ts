// Full file content here
import { NextApiRequest, NextApiResponse } from 'next';
import { stripe } from '@/lib/stripe';
import { getWatches } from '@/lib/watches';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { cartItems } = req.body;

  try {
    const watches = await getWatches();
    const lineItems = cartItems.map((item: any) => {
      const watch = watches.find(w => w.reference === item.reference);
      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: watch?.name,
          },
          unit_amount: watch?.price * 100,
        },
        quantity: item.quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${req.headers.origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/cart`,
    });

    res.status(200).json({ id: session.id });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
