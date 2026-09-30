# Context priority

When sources disagree, use the higher one.

1. **Running code and the Supabase schema.** `src/` and the live `public.watches` table are the source of truth.
2. **`.cursor/rules/`.** Follow these while editing.
3. **`docs/`.** Database, API, features, issues, SOPs, standards, and `changelog.md` describe the intended system. Update them when behavior changes.
4. **`architecture/`.** The shape of the system. Update it when a boundary changes, not for a copy tweak.
5. **Root `README.md`.** How to run the app.

Rules for this repo:

- Watch names, prices, and dial colors come from Supabase. Do not hardcode a catalog in the page.
- The browser may use the anon key only. Never put the service role key or the database password in client code or in a committed file.
- `.env.local` stays untracked. `.env.example` lists the variable names.
- A homepage change is done when the page renders the rows returned by `getWatches()`.
