import './globals.css';
import type { ReactNode } from 'react';
import { SiteHeaderWrapper } from '@/components/site-header-wrapper';
import { CartProvider } from '@/components/cart-provider';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <SiteHeaderWrapper />
          <main>{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}
