'use client';

import { useTranslations } from 'next-intl';
import { Link, useRouter, usePathname } from '@/i18n/routing';
import { useScrollDirection } from '@/hooks/use-scroll-direction';
import { useUIStore } from '@/stores/ui-store';
import { useWishlistStore } from '@/stores/wishlist-store';
import { useCartStore } from '@/stores/cart-store';
import { Search, Heart, User, Menu, X, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useParams } from 'next/navigation';

export function Navbar() {
  const t = useTranslations('nav');
  const { scrollDirection, isAtTop } = useScrollDirection();
  const { isMobileMenuOpen, toggleMobileMenu } = useUIStore();
  const wishlistCount = useWishlistStore((state) => state.items.length);
  const cartCount = useCartStore((state) => state.itemCount());
  const toggleCart = useCartStore((state) => state.toggleCart);
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const handleLanguageToggle = () => {
    const currentLocale = params.locale as string;
    const newLocale = currentLocale === 'tr' ? 'en' : 'tr';
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 w-full z-[1000] transition-all duration-500',
        isAtTop
          ? 'text-white bg-transparent py-4'
          : 'bg-background shadow-subtle text-foreground py-2',
        !isAtTop && scrollDirection === 'down' && !isMobileMenuOpen ? '-translate-y-full' : 'translate-y-0'
      )}
    >
      <div className="container mx-auto px-4 md:px-8 h-16 md:h-[72px] flex items-center justify-between">
        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2 -ml-2 text-current"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <div className="relative w-6 h-6 flex items-center justify-center">
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </button>

        {/* Logo */}
        <Link
          href="/"
          className="font-heading text-2xl md:text-3xl uppercase tracking-widest font-bold"
        >
          RULLIÉ
        </Link>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/shop" className="text-sm font-medium hover:text-muted transition-colors">
            {t('shop')}
          </Link>
          <Link href="/collections" className="text-sm font-medium hover:text-muted transition-colors">
            {t('collections')}
          </Link>
          <Link href="/lookbook" className="text-sm font-medium hover:text-muted transition-colors">
            {t('lookbook')}
          </Link>
          <Link href="/journal" className="text-sm font-medium hover:text-muted transition-colors">
            {t('journal')}
          </Link>
          <Link href="/about" className="text-sm font-medium hover:text-muted transition-colors">
            {t('about')}
          </Link>
          <Link href="/ai-studio" className="text-sm font-medium hover:text-muted transition-colors flex items-center gap-2">
            {t('aiStudio')}
            <span className="text-[10px] uppercase bg-foreground text-background px-1.5 py-0.5 rounded-soft font-bold tracking-wider">
              Beta
            </span>
          </Link>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center space-x-4 md:space-x-6">
          <button onClick={() => useUIStore.getState().toggleSearch()} className="p-1 hover:text-muted transition-colors" aria-label={t('search')}>
            <Search className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          
          <button
            onClick={handleLanguageToggle}
            className="hidden md:block text-sm font-bold uppercase hover:text-muted transition-colors"
          >
            {params.locale === 'tr' ? 'EN' : 'TR'}
          </button>

          <Link href="/wishlist" className="relative p-1 hover:text-muted transition-colors" aria-label={t('wishlist')}>
            <Heart className="w-5 h-5 md:w-6 md:h-6" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 bg-foreground text-background text-[10px] rounded-full">
                {wishlistCount}
              </span>
            )}
          </Link>

          <button onClick={toggleCart} className="relative p-1 hover:text-muted transition-colors" aria-label={t('cart')}>
            <ShoppingBag className="w-5 h-5 md:w-6 md:h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 bg-foreground text-background text-[10px] rounded-full">
                {cartCount}
              </span>
            )}
          </button>

          <Link href="/account" className="p-1 hover:text-muted transition-colors" aria-label={t('account')}>
            <User className="w-5 h-5 md:w-6 md:h-6" />
          </Link>
        </div>
      </div>
    </header>
  );
}
