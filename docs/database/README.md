# Database

Supabase Postgres, schema `public`. The storefront reads one table.

## `public.watches`

| Column | Type | Notes |
| --- | --- | --- |
| `id` | `uuid` | Primary key. Default `gen_random_uuid()`. |
| `name` | `text` | Display name. |
| `reference` | `text` | Unique, for example `TZ-01`. |
| `price` | `integer` | Whole US dollars. |
| `summary` | `text` | One or two sentences on the card. |
| `dial` | `text` | CSS color for the dial. |
| `hands` | `text` | CSS color for the hour markers and hands. |
| `bezel` | `text` | CSS color for the ring, second hand, and crown. |
| `sort_order` | `integer` | Ascending. The first row is the hero watch. |
| `image_url` | `text` | Nullable. URL to the watch image stored in Supabase. |

## Access

Row level security is on.

- Policy `Public can read watches`: `select` for `anon` and `authenticated`, using `true`.
- `anon` and `authenticated` have `select` granted on the table.
- The storefront does not insert, update, or delete. Change rows in the Supabase table editor.

Opening rows: Meridian `TZ-01` ($1,280), Harbor `TZ-02` ($1,450), Night Index `TZ-03` ($1,620).

## Adding a piece

Insert a row with all columns above. Set `sort_order` to place it. The homepage query is:

```sql
select name, reference, price, summary, dial, hands, bezel, image_url
from public.watches
order by sort_order asc;
```
