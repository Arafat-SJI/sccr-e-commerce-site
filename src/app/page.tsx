import { WatchFace } from "@/components/watch-face";
import { formatPrice } from "@/lib/catalog";
import { getWatches, type WatchPiece } from "@/lib/watches";

const facts = [
  { label: "Case", value: "38–40 mm" },
  { label: "Crystal", value: "Sapphire" },
  { label: "Run", value: "Small batch" },
];

export default async function Home() {
  let pieces: WatchPiece[] = [];
  let catalogError = false;

  try {
    pieces = await getWatches();
  } catch {
    catalogError = true;
  }

  const hero = pieces[0];

  return (
    <main id="top">
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 md:grid-cols-12 md:py-24">
        <div className="md:col-span-7">
          <p className="text-[11px] tracking-[0.22em] text-brass uppercase">A watch house</p>
          <h1 className="mt-4 max-w-xl font-serif text-5xl leading-[0.95] tracking-tight sm:text-6xl md:text-7xl">
            Wear the hour
            <span className="mt-1 block italic text-brass">you mean to keep.</span>
          </h1>
          <p className="mt-6 max-w-md text-lg leading-8 text-ink-soft">
            Timezone makes a small number of mechanical watches. Quiet dials, a case that sits close, and a movement you notice only when you want to.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#collection"
              className="inline-flex h-11 items-center bg-ink px-5 text-sm text-paper transition-colors hover:bg-brass focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brass"
            >
              See the pieces
            </a>
            <a
              href="#house"
              className="inline-flex h-11 items-center border border-ink px-5 text-sm transition-colors hover:bg-ink hover:text-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brass"
            >
              The house
            </a>
          </div>
        </div>
        {hero ? (
          <div className="md:col-span-5">
            <div className="bg-night px-6 pt-8 pb-6">
              <div className="mx-auto aspect-square max-w-sm">
                <WatchFace
                  dial={hero.dial}
                  hands={hero.hands}
                  bezel={hero.bezel}
                  label={`${hero.name} watch face`}
                />
              </div>
              <div className="mt-2 flex items-end justify-between border-t border-white/15 pt-4 text-paper">
                <div>
                  <p className="font-serif text-2xl">{hero.name}</p>
                  <p className="text-xs tracking-[0.16em] text-paper/60 uppercase">{hero.reference}</p>
                </div>
                <p className="text-sm text-paper/80">{formatPrice(hero.price)}</p>
              </div>
            </div>
          </div>
        ) : null}
      </section>

      <section id="collection" className="border-t border-line">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] tracking-[0.22em] text-brass uppercase">Collection</p>
              <h2 className="mt-2 font-serif text-4xl tracking-tight sm:text-5xl">Opening pieces</h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-ink-soft">
              Three references from the catalog. Checkout is not open yet.
            </p>
          </div>
          {catalogError ? (
            <p className="mt-10 text-sm text-ink-soft">The collection could not be loaded.</p>
          ) : null}
          {!catalogError && pieces.length === 0 ? (
            <p className="mt-10 text-sm text-ink-soft">No pieces in the catalog yet.</p>
          ) : null}
          <ul className="mt-10 grid gap-5 md:grid-cols-3">
            {pieces.map((piece) => (
              <li key={piece.reference} className="border border-line bg-paper-deep/50 p-5">
                <div className="mx-auto aspect-square max-w-[240px]">
                  <WatchFace
                    dial={piece.dial}
                    hands={piece.hands}
                    bezel={piece.bezel}
                    label={`${piece.name} watch face`}
                  />
                </div>
                <div className="mt-2 flex items-baseline justify-between gap-4 border-t border-line pt-4">
                  <div>
                    <h3 className="font-serif text-2xl">{piece.name}</h3>
                    <p className="text-xs tracking-[0.16em] text-ink-soft uppercase">{piece.reference}</p>
                  </div>
                  <p className="text-sm">{formatPrice(piece.price)}</p>
                </div>
                <p className="mt-3 text-sm leading-6 text-ink-soft">{piece.summary}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="house" className="border-t border-line bg-night text-paper">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-2 md:py-20">
          <div>
            <p className="text-[11px] tracking-[0.22em] text-brass uppercase">The house</p>
            <h2 className="mt-4 font-serif text-4xl leading-[1.05] tracking-tight sm:text-5xl">
              Built for the wrist that checks the time, then forgets the watch is there.
            </h2>
          </div>
          <div className="flex flex-col justify-between gap-10">
            <p className="max-w-md text-base leading-7 text-paper/75">
              Three watches to start. Each one is meant to be worn every day: a dial you can read, a case that stays out of the way, and finishing you can feel.
            </p>
            <dl className="grid grid-cols-3 gap-4 border-t border-white/15 pt-6">
              {facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="text-[11px] tracking-[0.16em] text-paper/50 uppercase">{fact.label}</dt>
                  <dd className="mt-2 font-serif text-xl">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </main>
  );
}
