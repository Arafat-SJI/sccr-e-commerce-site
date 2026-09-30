# Changelog

## 2026-09-30

- Created the Next.js app (App Router, TypeScript, Tailwind) and the Timezone homepage.
- Connected Supabase with a browser client, a server client, and session refresh in `src/proxy.ts`.
- Added `public.watches` and pointed the hero and opening pieces at `getWatches()`.
- Added `.cursor/`, `architecture/`, and `docs/` so project context lives next to the code.

## 2026-10-01

- Implemented `/all-product`, `/cart`, and demo Stripe checkout.
- Watch images use Supabase `image_url`, then `public/watches/<reference>.svg`, then `WatchFace`.
- Checkout prices are read from `public.watches` in `POST /api/checkout_sessions`.

## 2026-10-02

- Added email-and-password authentication with Supabase Auth.
- New routes: `/register` and `/login` with validated forms.
- Header now shows session state (name/email) and a Log out button. Session persists after refresh using `src/proxy.ts`.
