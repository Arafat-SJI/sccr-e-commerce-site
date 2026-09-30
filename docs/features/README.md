# Features

## Homepage

Route `/`, implemented in `src/app/page.tsx`.

| Section | Behavior |
| --- | --- |
| Header | Sticky. Links scroll to Collection, The house, and Visit. |
| Hero | House introduction. The watch panel is `watches` row with the lowest `sort_order`. Hidden when the table is empty. |
| Opening pieces | One card per row: dial drawing, name, reference, price, summary. |
| The house | Short note and three facts (case size, crystal, batch). These facts are copy, not database fields. |
| Footer | Shop status and the same in-page links. |

Dial artwork is `WatchFace`. It takes the three color fields from the row. There are no product photographs.

## Catalog

The only live shop data is `public.watches`. Prices render as USD with no cents via `formatPrice()`.

## All-Product Catalog

Route `/all-product`, implemented in `src/app/all-product/page.tsx`.

Displays all watches in a responsive grid. Each card shows the image, name, reference, price, and an "Add to Cart" button.

## Shopping Cart

Route `/cart`, implemented in `src/app/cart/page.tsx`.

Displays cart items with image, name, reference, unit price, quantity, line total, and remove. Shows the subtotal. Persists in `localStorage` after the stored cart has loaded.

## Stripe Checkout

Demo checkout using Stripe test mode. **Check out** posts to `/api/checkout_sessions` and redirects to the session URL. Success is `/checkout/success`, which clears the cart. Cancel returns to `/cart`. Missing `STRIPE_SECRET_KEY` returns an error and does not mark the order paid.

## Authentication

- Routes: `/register` and `/login`.
- Registration collects name, email, password, and confirm password. Client-side checks ensure email is present, password is at least 8 characters, and both passwords match. The name is saved to Supabase user metadata as `full_name`.
- Login uses email and password. Invalid credentials remain on the page with the Supabase error message.
- Header session state is read on the server. When signed out, the header shows "Log in" (link to `/login`). When signed in, the header shows the user’s name (from metadata) or their email and a **Log out** button.
- Sessions persist across refresh via the existing Supabase cookie refresh in `src/proxy.ts`.
