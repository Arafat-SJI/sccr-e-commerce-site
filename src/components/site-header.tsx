// COMPLETE updated file — existing code preserved with changes merged in
import { useCart } from '@/components/cart-provider';

const links = [
  { href: '#collection', label: 'Collection' },
  { href: '#house', label: 'The house' },
  { href: '#visit', label: 'Visit' },
  { href: '/all-product', label: 'All pieces' },
];

export function SiteHeader() {
  const { cart } = useCart();
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

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
        <nav aria-label="Primary" className="flex gap-6 text-sm">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-ink-soft transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brass"
            >
              {link.label}
            </a>
          ))}
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
