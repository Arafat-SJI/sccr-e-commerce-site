import { formatPrice } from "@/lib/catalog";
import { getStripe } from "@/lib/stripe";
import { ClearCart } from "./clear-cart";

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id: sessionId } = await searchParams;
  const stripe = getStripe();
  let total: number | null = null;

  if (stripe && sessionId) {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.amount_total != null) {
      total = session.amount_total / 100;
    }
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <ClearCart />
      <p className="text-[11px] tracking-[0.22em] text-brass uppercase">Checkout</p>
      <h1 className="mt-2 font-serif text-4xl tracking-tight sm:text-5xl">Payment received</h1>
      <p className="mt-6 max-w-md text-sm leading-6 text-ink-soft">
        This was a demo Stripe payment.
        {total != null ? ` Total ${formatPrice(total)}.` : ""}
      </p>
      <a
        href="/all-product"
        className="mt-8 inline-flex h-11 items-center bg-ink px-5 text-sm text-paper transition-colors hover:bg-brass"
      >
        Back to all pieces
      </a>
    </main>
  );
}
