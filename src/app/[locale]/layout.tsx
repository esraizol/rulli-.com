import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { spaceGrotesk, inter } from '@/lib/fonts';
import { Navbar, MobileMenu, Footer, CustomCursor, CartDrawer, SearchOverlay } from '@/components/layout';
import '../globals.css';

export const metadata: Metadata = {
  title: {
    default: 'RULLIÉ | Designed to Be Remembered',
    template: '%s | RULLIÉ',
  },
  description: 'Luxury fashion accessories that combine elegance, creativity, and individuality.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://rullie.com'),
  openGraph: {
    type: 'website',
    siteName: 'RULLIÉ',
    images: ['/images/brand/og-default.jpg'],
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as 'tr' | 'en')) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="font-body antialiased">
        <NextIntlClientProvider messages={messages}>
          <a href="#main-content" className="skip-to-content">
            Skip to content
          </a>
          <CustomCursor />
          <Navbar />
          <MobileMenu />
          <CartDrawer />
          <SearchOverlay />
          <main id="main-content">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
