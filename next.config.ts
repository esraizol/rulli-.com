import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  turbopack: {
    root: './',
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    // NOTE: intentionally empty. Add explicit, trusted hostnames here
    // (e.g. your CDN or asset host) as remote images are introduced.
    // Do not use a '**' wildcard — it lets the image optimizer proxy
    // arbitrary external URLs.
    remotePatterns: [],
  },
};

export default withNextIntl(nextConfig);
