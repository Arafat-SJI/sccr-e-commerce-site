"use client";

import { WatchImage } from "@/components/watch-image";
import { useCart, type CartItem } from "@/components/cart-provider";
import { formatPrice } from "@/lib/catalog";

export default function CartItem({ item }: { item: CartItem }) {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <article className="grid items-center gap-4 border border-line bg-paper-deep/50 p-4 sm:grid-cols-[96px_1fr_auto_auto_auto]">
      <div className="h-24 w-24">
        <WatchImage
          name={item.name}
          reference={item.reference}
          imageUrl={item.image_url}
          dial={item.dial}
          hands={item.hands}
          bezel={item.bezel}
        />
      </div>
      <div>
        <h2 className="font-serif text-2xl">{item.name}</h2>
        <p className="text-xs tracking-[0.16em] text-ink-soft uppercase">{item.reference}</p>
        <p className="mt-1 text-sm">{formatPrice(item.price)}</p>
      </div>
      <label className="text-sm text-ink-soft">
        Qty
        <input
          type="number"
          value={item.quantity}
          min={1}
          onChange={(event) => {
            const quantity = Number.parseInt(event.target.value, 10);
            if (quantity >= 1) {
              updateQuantity(item.reference, quantity);
            }
          }}
          className="mt-1 w-16 border border-line bg-paper px-2 py-1 text-center text-ink"
        />
      </label>
      <p className="text-sm">{formatPrice(item.price * item.quantity)}</p>
      <button
        type="button"
        onClick={() => removeFromCart(item.reference)}
        className="text-sm text-ink-soft underline-offset-4 hover:text-ink hover:underline"
      >
        Remove
      </button>
    </article>
  );
}
