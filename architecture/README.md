# Architecture

Timezone is a watch shop. The browser talks to a Next.js app. The app reads the catalog from Supabase Postgres.

```
Browser
  → Next.js App Router (src/app)
      → getWatches() (src/lib/watches.ts)
          → Supabase server client (src/lib/supabase/server.ts)
              → public.watches
  → src/proxy.ts refreshes the Supabase auth cookie before the page renders
```

## Boundaries

| Piece | Responsibility |
| --- | --- |
| `src/app/page.tsx` | Homepage: hero, opening pieces, house note. |
| `src/app/layout.tsx` | Fonts, header, footer, metadata. |
| `src/components/watch-face.tsx` | Draws a dial from `dial`, `hands`, and `bezel` colors. No image files. |
| `src/lib/watches.ts` | The only catalog query. |
| `src/lib/catalog.ts` | Price formatting. |
| `src/lib/supabase/` | Browser client, server client, env check, session refresh. |
| `src/proxy.ts` | Next.js proxy. Calls `updateSession` when env vars exist. |
| Supabase `public.watches` | Catalog rows. Public read, no public write. |

## What is not built

Accounts, cart, checkout, and order tables are not in the app yet. The homepage says checkout is closed. Those features should sit behind the same Supabase client and should not duplicate the watch list in code.

## Environments

Local dev uses `.env.local`. The committed template is `.env.example`. Both public variables are safe to expose to the browser: the project URL and the anon key. Row access is limited by RLS, not by hiding the anon key.
