import ProductCard from "@/components/product-card";
import { getWatches, type WatchPiece } from "@/lib/watches";

export default async function AllProductPage() {
  let watches: WatchPiece[] = [];
  let catalogError = false;

  try {
    watches = await getWatches();
  } catch {
    catalogError = true;
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <p className="text-[11px] tracking-[0.22em] text-brass uppercase">Catalog</p>
      <h1 className="mt-2 font-serif text-4xl tracking-tight sm:text-5xl">All pieces</h1>
      {catalogError ? <p className="mt-10 text-sm text-ink-soft">The collection could not be loaded.</p> : null}
      {!catalogError && watches.length === 0 ? (
        <p className="mt-10 text-sm text-ink-soft">No pieces in the catalog yet.</p>
      ) : null}
      <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {watches.map((watch) => (
          <li key={watch.reference}>
            <ProductCard watch={watch} />
          </li>
        ))}
      </ul>
    </main>
  );
}
