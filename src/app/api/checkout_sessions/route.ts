import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { getWatches } from "@/lib/watches";

type CheckoutItem = {
  reference?: string;
  quantity?: number;
};

export async function POST(request: Request) {
  const stripe = getStripe();

  if (!stripe) {
    return NextResponse.json({ error: "Demo Stripe is not configured." }, { status: 503 });
  }

  const body = (await request.json()) as { cartItems?: CheckoutItem[] };
  const cartItems = Array.isArray(body.cartItems) ? body.cartItems : [];
  const watches = await getWatches();
  const lineItems = cartItems.flatMap((item) => {
    const watch = watches.find((entry) => entry.reference === item.reference);
    const quantity = Number(item.quantity);

    if (!watch || !Number.isInteger(quantity) || quantity < 1) {
      return [];
    }

    return [
      {
        quantity,
        price_data: {
          currency: "usd" as const,
          unit_amount: watch.price * 100,
          product_data: { name: watch.name },
        },
      },
    ];
  });

  if (lineItems.length === 0) {
    return NextResponse.json({ error: "No valid cart items." }, { status: 400 });
  }

  const origin = request.headers.get("origin") ?? new URL(request.url).origin;
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: lineItems,
    success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/cart`,
  });

  return NextResponse.json({ url: session.url });
}
