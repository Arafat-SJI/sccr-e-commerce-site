"use client";

import { useState } from "react";
import CartItem from "@/components/cart-item";
import { useCart } from "@/components/cart-provider";
import { formatPrice } from "@/lib/catalog";

export default function CartPage() {
  const { cart } = useCart();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  async function checkout() {
    setPending(true);
    setError("");

    const response = await fetch("/api/checkout_sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cartItems: cart.map((item) => ({ reference: item.reference, quantity: item.quantity })),
      }),
    });
    const data = (await response.json()) as { url?: string; error?: string };

    if (!response.ok || !data.url) {
      setError(data.error ?? "Checkout failed.");
      setPending(false);
      return;
    }

    window.location.href = data.url;
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <p className="text-[11px] tracking-[0.22em] text-brass uppercase">Cart</p>
      <h1 className="mt-2 font-serif text-4xl tracking-tight sm:text-5xl">Your pieces</h1>
      {cart.length === 0 ? (
        <p className="mt-10 text-sm text-ink-soft">
          The cart is empty.{" "}
          <a href="/all-product" className="text-ink underline-offset-4 hover:underline">
            See all pieces
          </a>
          .
        </p>
      ) : (
        <>
          <ul className="mt-10 space-y-4">
            {cart.map((item) => (
              <li key={item.reference}>
                <CartItem item={item} />
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col items-start gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-serif text-2xl">Subtotal {formatPrice(subtotal)}</p>
            <button
              type="button"
              onClick={checkout}
              disabled={pending}
              className="inline-flex h-11 items-center bg-ink px-5 text-sm text-paper transition-colors hover:bg-brass disabled:opacity-60"
            >
              {pending ? "Opening checkout" : "Check out"}
            </button>
          </div>
          <p className="mt-4 max-w-md text-sm text-ink-soft">
            Demo Stripe only. Card 4242 4242 4242 4242, any future expiry, any CVC.
          </p>
          {error ? <p className="mt-3 text-sm text-ink">{error}</p> : null}
        </>
      )}
    </main>
  );
}
