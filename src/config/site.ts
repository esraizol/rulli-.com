export const siteConfig = {
  name: 'RULLI\u00c9',
  tagline: 'Designed to Be Remembered',
  description: 'Luxury fashion accessories that combine elegance, creativity, and individuality.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://rullie.com',
  ogImage: '/images/brand/og-default.jpg',
  social: {
    instagram: 'https://instagram.com/rullie',
    tiktok: 'https://tiktok.com/@rullie',
    pinterest: 'https://pinterest.com/rullie',
  },
  contact: { email: 'hello@rullie.com' },
  locales: ['tr', 'en'] as const,
  defaultLocale: 'tr' as const,
  shopier: { baseUrl: 'https://shopier.com/rullie' },
} as const;

export type Locale = (typeof siteConfig.locales)[number];
