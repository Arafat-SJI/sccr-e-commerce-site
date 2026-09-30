# Standards

## Code

- TypeScript, strict. React Server Components by default.
- App code lives in `src/`. Import alias `@/` maps to `src/`.
- One catalog query: `getWatches()`. Components receive rows; they do not call Supabase themselves unless a later client feature needs it.
- Prices are integers in dollars. Display them only through `formatPrice()`.
- Colors for a watch are data (`dial`, `hands`, `bezel`), not new Tailwind classes per product.

## UI

- Palette and fonts are set in `src/app/globals.css` and `src/app/layout.tsx`.
- Instrument Serif for titles, Geist for UI text.
- In-page links use hashes: `#collection`, `#house`, `#visit`. Those targets keep `scroll-margin-top` so the sticky header does not cover them.

## Data

- Public reads only, enforced in Postgres with RLS.
- Throw on a Supabase error inside `getWatches()`. Let the page decide the empty and error copy.
- Do not log the anon key, cookies, or database password.

## Docs

Update the matching folder under `docs/` when a change affects the database, the data access, a feature, a known gap, a procedure, or a standard. Add a line to `docs/changelog.md`. Update `architecture/README.md` only when a boundary changes.
