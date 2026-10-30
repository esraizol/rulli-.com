'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { siteConfig } from '@/config/site';

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1 0-5.78 2.92 2.92 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.57 6.33 6.33 0 0 0 9.37 22a6.33 6.33 0 0 0 6.33-6.33V9.15a8.16 8.16 0 0 0 3.89.98V6.69Z" />
    </svg>
  );
}

function PinterestIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.08 3.15 9.42 7.6 11.18-.1-.95-.19-2.4.04-3.44.21-.94 1.35-5.73 1.35-5.73s-.34-.69-.34-1.7c0-1.6.92-2.79 2.07-2.79.98 0 1.45.73 1.45 1.61 0 .98-.62 2.44-.95 3.8-.27 1.14.57 2.07 1.7 2.07 2.04 0 3.6-2.15 3.6-5.24 0-2.74-1.97-4.66-4.78-4.66-3.26 0-5.17 2.44-5.17 4.97 0 .98.38 2.04.85 2.61.09.11.1.21.08.32-.09.36-.28 1.14-.32 1.3-.05.21-.17.26-.39.16-1.46-.68-2.37-2.82-2.37-4.54 0-3.7 2.69-7.09 7.75-7.09 4.07 0 7.23 2.9 7.23 6.77 0 4.04-2.55 7.3-6.09 7.3-1.19 0-2.31-.62-2.69-1.35l-.73 2.79c-.26 1.01-.97 2.27-1.45 3.04A12 12 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
    </svg>
  );
}

export function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="bg-foreground text-background py-24">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mb-16">
          <Link href="/" className="font-heading text-4xl uppercase tracking-widest font-bold">
            RULLIÉ
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          <div className="space-y-4 flex flex-col">
            <h3 className="font-heading text-lg font-bold uppercase">{t('shop')}</h3>
            <Link href="/shop" className="text-muted hover:text-background transition-colors">{t('allProducts')}</Link>
            <Link href="/shop?sort=newest" className="text-muted hover:text-background transition-colors">{t('newArrivals')}</Link>
            <Link href="/collections" className="text-muted hover:text-background transition-colors">{t('bestSellers')}</Link>
          </div>

          <div className="space-y-4 flex flex-col">
            <h3 className="font-heading text-lg font-bold uppercase">{t('company')}</h3>
            <Link href="/about" className="text-muted hover:text-background transition-colors">{t('about')}</Link>
            <Link href="/vision" className="text-muted hover:text-background transition-colors">{t('vision')}</Link>
            <Link href="/mission" className="text-muted hover:text-background transition-colors">{t('mission')}</Link>
            <Link href="/journal" className="text-muted hover:text-background transition-colors">{t('journal')}</Link>
          </div>

          <div className="space-y-4 flex flex-col">
            <h3 className="font-heading text-lg font-bold uppercase">{t('support')}</h3>
            <Link href="/faq" className="text-muted hover:text-background transition-colors">{t('faq')}</Link>
            <Link href="/shipping" className="text-muted hover:text-background transition-colors">{t('shipping')}</Link>
            <Link href="/size-guide" className="text-muted hover:text-background transition-colors">{t('sizeGuide')}</Link>
          </div>

          <div className="space-y-4 flex flex-col">
            <h3 className="font-heading text-lg font-bold uppercase">{t('legal')}</h3>
            <Link href="/privacy" className="text-muted hover:text-background transition-colors">{t('privacyPolicy')}</Link>
            <Link href="/terms" className="text-muted hover:text-background transition-colors">{t('termsOfService')}</Link>
            <Link href="/cookies" className="text-muted hover:text-background transition-colors">{t('cookiePolicy')}</Link>
          </div>

          <div className="space-y-4 flex flex-col">
            <h3 className="font-heading text-lg font-bold uppercase">{t('tagline')}</h3>
            <form className="mt-2 flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Email"
                className="bg-transparent border-b border-muted pb-2 text-background placeholder:text-muted focus:outline-none focus:border-background transition-colors w-full"
                required
              />
              <button
                type="submit"
                className="self-start text-sm uppercase tracking-widest font-bold mt-2 hover:text-muted transition-colors"
              >
                →
              </button>
            </form>
          </div>
        </div>

        <hr className="border-t border-muted/30 mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-muted text-sm">
            {t('copyright', { year: new Date().getFullYear() })}
          </p>

          <div className="flex space-x-6">
            <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-background transition-colors" aria-label="Instagram">
              <InstagramIcon className="w-5 h-5" />
            </a>
            <a href={siteConfig.social.tiktok} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-background transition-colors" aria-label="TikTok">
              <TikTokIcon className="w-5 h-5" />
            </a>
            <a href={siteConfig.social.pinterest} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-background transition-colors" aria-label="Pinterest">
              <PinterestIcon className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
