'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link, useRouter, usePathname } from '@/i18n/routing';
import { useUIStore } from '@/stores/ui-store';
import { useLockBody } from '@/hooks/use-lock-body';
import { X } from 'lucide-react';
import { useParams } from 'next/navigation';
import { siteConfig } from '@/config/site';

export function MobileMenu() {
  const t = useTranslations('nav');
  const { isMobileMenuOpen, toggleMobileMenu } = useUIStore();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  useLockBody(isMobileMenuOpen);

  const handleLanguageToggle = () => {
    const currentLocale = params.locale as string;
    const newLocale = currentLocale === 'tr' ? 'en' : 'tr';
    router.replace(pathname, { locale: newLocale });
    toggleMobileMenu();
  };

  const navLinks = [
    { href: '/shop' as const, label: t('shop') },
    { href: '/collections' as const, label: t('collections') },
    { href: '/lookbook' as const, label: t('lookbook') },
    { href: '/journal' as const, label: t('journal') },
    { href: '/about' as const, label: t('about') },
    { href: '/ai-studio' as const, label: t('aiStudio'), badge: 'Beta' },
  ];

  return (
    <AnimatePresence>
      {isMobileMenuOpen && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'tween', duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[1050] bg-background text-foreground flex flex-col"
        >
          <div className="flex items-center justify-end p-4 md:p-6 h-16">
            <button
              onClick={toggleMobileMenu}
              className="p-2 -mr-2"
              aria-label="Close menu"
            >
              <X className="w-8 h-8" />
            </button>
          </div>

          <div className="flex-1 flex flex-col px-8 pt-8 overflow-y-auto">
            <nav className="flex flex-col space-y-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={toggleMobileMenu}
                    className="font-heading text-4xl uppercase tracking-wide flex items-center gap-4 hover:text-muted transition-colors"
                  >
                    {link.label}
                    {link.badge && (
                      <span className="text-xs bg-foreground text-background px-2 py-1 rounded-[10px] font-bold tracking-wider">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="mt-auto pb-12 pt-12 space-y-8">
              <button
                onClick={handleLanguageToggle}
                className="text-lg font-bold uppercase border-b-2 border-foreground pb-1"
              >
                {params.locale === 'tr' ? 'Switch to English' : 'Türkçe\'ye Geç'}
              </button>

              <div className="flex items-center space-x-6 text-muted">
                <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-foreground transition-colors text-sm uppercase tracking-widest">
                  Instagram
                </a>
                <a href={siteConfig.social.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="hover:text-foreground transition-colors text-sm uppercase tracking-widest">
                  TikTok
                </a>
                <a href={siteConfig.social.pinterest} target="_blank" rel="noopener noreferrer" aria-label="Pinterest" className="hover:text-foreground transition-colors text-sm uppercase tracking-widest">
                  Pinterest
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
