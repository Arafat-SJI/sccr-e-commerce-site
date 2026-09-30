# COMPLETE updated file — existing code preserved with changes merged in
# API

There is no custom HTTP API yet. The homepage is a Server Component that calls Supabase directly.

## Catalog read

`getWatches()` in `src/lib/watches.ts`:

- Client: `createClient()` from `src/lib/supabase/server.ts`
- Table: `watches`
- Columns: `name`, `reference`, `price`, `summary`, `dial`, `hands`, `bezel`
- Order: `sort_order` ascending
- Failure: the function throws `Error` with the PostgREST message. The page catches it and shows “The collection could not be loaded.” An empty table shows “No pieces in the catalog yet.”

## Auth session

`src/proxy.ts` calls `updateSession()` on document requests. That uses the anon key and the request cookies. If either env var is missing, the proxy continues without contacting Supabase.

## Environment

| Variable | Used by |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Browser client, server client, proxy |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Same |

`getSupabaseEnv()` in `src/lib/supabase/env.ts` returns `null` when either value is empty. The server and browser `createClient()` helpers throw if called in that state. The homepage then shows the catalog error.

## Later routes

Cart, checkout, and account routes should be added under `src/app` and should call the server client. Do not expose the service role key to a route the browser can call.

## Stripe Checkout Session

Route `/api/checkout_sessions`, implemented in `src/app/api/checkout_sessions/route.ts`.

Creates a Stripe Checkout Session in test mode. Receives cart items, fetches current prices from `public.watches`, and returns the session ID.
