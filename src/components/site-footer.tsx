export function SiteFooter() {
  return (
    <footer id="visit" className="border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-serif text-3xl tracking-tight">Timezone</p>
          <p className="mt-3 max-w-xs text-sm leading-6 text-ink-soft">
            A small watch house. The catalog, accounts, and checkout will live here once the shop opens.
          </p>
        </div>
        <div>
          <p className="text-[11px] tracking-[0.18em] text-brass uppercase">Look</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a href="#collection" className="hover:text-brass">
                Opening pieces
              </a>
            </li>
            <li>
              <a href="#house" className="hover:text-brass">
                The house
              </a>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-[11px] tracking-[0.18em] text-brass uppercase">Visit</p>
          <p className="mt-3 text-sm leading-6 text-ink-soft">
            Inquiries open with the shop. Cases from 38 to 40 mm, sapphire crystal, small batches.
          </p>
        </div>
      </div>
      <div className="border-t border-line px-6 py-4 text-center text-xs tracking-[0.14em] text-ink-soft uppercase">
        Timezone · 2026
      </div>
    </footer>
  );
}
