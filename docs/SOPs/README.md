# SOPs

## Run the app locally

1. `npm install`
2. Copy `.env.example` to `.env.local`.
3. Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` from the Supabase project settings. Use the anon or publishable key, not the service role key.
4. `npm run dev` and open `http://localhost:3000`.
5. Restart `npm run dev` after changing `.env.local`. Next.js reads env files at startup.

## Change the catalog

1. Open the Supabase table editor for `public.watches`.
2. Edit or insert a row. Required fields: `name`, `reference`, `price`, `summary`, `dial`, `hands`, `bezel`, `sort_order`.
3. Keep `reference` unique.
4. Refresh the homepage. The first `sort_order` is the hero watch.

Do this in Supabase. Do not add a second list of watches in `page.tsx`.

## Secrets

- `.env.local` is gitignored. Do not commit it.
- Do not commit the database password or the service role key.
- `.env.example` may be committed. It contains names only, no values.

## Before calling a UI change done

Load `/` and confirm the three sections still render: hero, opening pieces from the table, and the house note. A copy-only change does not need a new Supabase query.
