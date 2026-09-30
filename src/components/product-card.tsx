"use client";

import { WatchImage } from "@/components/watch-image";
import { useCart } from "@/components/cart-provider";
import { formatPrice } from "@/lib/catalog";
import type { WatchPiece } from "@/lib/watches";

export default function ProductCard({ watch }: { watch: WatchPiece }) {
  const { addToCart } = useCart();

  return (
    <article className="flex flex-col border border-line bg-paper-deep/50 p-5">
      <div className="mx-auto aspect-square w-full max-w-[240px]">
        <WatchImage
          name={watch.name}
          reference={watch.reference}
          imageUrl={watch.image_url}
          dial={watch.dial}
          hands={watch.hands}
          bezel={watch.bezel}
        />
      </div>
      <div className="mt-2 flex items-baseline justify-between gap-4 border-t border-line pt-4">
        <div>
          <h2 className="font-serif text-2xl">{watch.name}</h2>
          <p className="text-xs tracking-[0.16em] text-ink-soft uppercase">{watch.reference}</p>
        </div>
        <p className="text-sm">{formatPrice(watch.price)}</p>
      </div>
      <button
        type="button"
        onClick={() =>
          addToCart({
            reference: watch.reference,
            name: watch.name,
            price: watch.price,
            image_url: watch.image_url,
            dial: watch.dial,
            hands: watch.hands,
            bezel: watch.bezel,
          })
        }
        className="mt-4 inline-flex h-11 items-center justify-center bg-ink px-5 text-sm text-paper transition-colors hover:bg-brass"
      >
        Add to Cart
      </button>
    </article>
  );
}
