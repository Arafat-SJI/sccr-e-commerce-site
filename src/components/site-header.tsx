// COMPLETE updated file — existing code preserved with changes merged in
'use client';
import { useCart } from '@/components/cart-provider';
import type { User } from '@supabase/supabase-js';
import { LogoutButton } from '@/components/auth/logout-button';

const links = [
  { href: "/#collection", label: "Collection" },
  { href: "/#house", label: "The house" },
  { href: "/#visit", label: "Visit" },
  { href: "/all-product", label: "All pieces" },
];

export function SiteHeader({ user }: { user: User | null }) {
  const { cart } = useCart();
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const displayName = user?.user_metadata?.full_name || user?.email || '';

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-paper/90 backdrop-blur-md">
      <p className="border-b border-line px-6 py-2 text-center text-[11px] tracking-[0.18em] text-ink-soft uppercase">
        Opening collection · the shop follows
      </p>
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
        <a
          href="/"
          className="font-serif text-[1.7rem] leading-none tracking-tight focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brass"
        >
          Timezone
        </a>
        <nav aria-label="Primary" className="flex items-center gap-6 text-sm">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-ink-soft transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brass"
            >
              {link.label}
            </a>
          ))}

          {user ? (
            <div className="flex items-center gap-3 text-ink-soft">
              <span className="hidden sm:inline" title={displayName}>{displayName}</span>
              <LogoutButton />
            </div>
          ) : (
            <a
              href="/login"
              className="text-ink-soft transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brass"
            >
              Log in
            </a>
          )}

          <a
            href="/cart"
            className="text-ink-soft transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brass"
          >
            Cart ({totalQuantity})
          </a>
        </nav>
      </div>
    </header>
  );
}
