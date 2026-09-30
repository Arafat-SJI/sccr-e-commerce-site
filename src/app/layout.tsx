// COMPLETE updated file — existing code preserved with changes merged in
import type { Metadata } from 'next';
import { Geist, Instrument_Serif } from 'next/font/google';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import './globals.css';
import { CartProvider } from '@/components/cart-provider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const instrumentSerif = Instrument_Serif({
  variable: '--font-instrument-serif',
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  title: 'Timezone — Watches',
  description:
    'Timezone is a watch house. A first look at the opening collection, ahead of the shop.',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang='en'
      className={`${geistSans.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className='min-h-full bg-paper text-ink'>
        <CartProvider>
          <SiteHeader />
          {children}
          <SiteFooter />
        </CartProvider>
      </body>
    </html>
  );
}
