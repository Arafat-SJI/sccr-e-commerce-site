# Timezone

A watch shop. Next.js is the storefront. Supabase will hold the catalog, accounts, and orders.

The homepage is a first look at the house and three opening pieces. Checkout is not connected yet.

## Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Supabase

Copy `.env.example` to `.env.local` and add:

- `NEXT_PUBLIC_SUPABASE_URL` — Project Settings → Data API → Project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Project Settings → API Keys → publishable or anon key

The homepage renders without these. Browser and server clients live in `src/lib/supabase`. Session refresh runs in `src/proxy.ts` once the keys are present.
