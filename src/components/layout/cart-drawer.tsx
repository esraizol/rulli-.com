'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { useCartStore } from '@/stores/cart-store';
import { useLockBody } from '@/hooks/use-lock-body';
import { getProductById } from '@/lib/mock-data';
import { formatPrice } from '@/lib/utils';
import { X, Minus, Plus } from 'lucide-react';

export function CartDrawer() {
  const t = useTranslations('cart');
  const locale = useLocale();
  const { items, isOpen, closeCart, removeItem, updateQuantity } = useCartStore();

  useLockBody(isOpen);

  const lineItems = items
    .map((item) => ({ item, product: getProductById(item.productId) }))
    .filter((entry): entry is { item: (typeof items)[number]; product: NonNullable<ReturnType<typeof getProductById>> } =>
      Boolean(entry.product)
    );

  const subtotal = lineItems.reduce((total, { item, product }) => total + product.price * item.quantity, 0);
  const currency = lineItems[0]?.product.currency ?? 'USD';

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeCart}
            className="fixed inset-0 z-[1040] bg-black/30"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-y-0 right-0 z-[1050] w-full sm:w-[420px] bg-background text-foreground flex flex-col shadow-subtle"
          >
            <div className="flex items-center justify-between p-4 md:p-6 h-16 border-b border-border">
              <h2 className="font-heading text-lg tracking-wide uppercase">{t('title')}</h2>
              <button onClick={closeCart} className="p-2 -mr-2" aria-label="Close cart">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 md:px-6">
              {lineItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-20">
                  <p className="text-muted mb-6">{t('empty')}</p>
                  <Link
                    href="/shop"
                    onClick={closeCart}
                    className="text-sm tracking-widest uppercase border-b border-foreground pb-1 hover:text-muted transition-colors"
                  >
                    {t('continueShopping')}
                  </Link>
                </div>
              ) : (
                <ul className="divide-y divide-border">
                  {lineItems.map(({ item, product }) => (
                    <li key={item.productId} className="py-6 flex gap-4">
                      <div className="w-20 h-24 shrink-0 bg-gradient-to-br from-stone-200 to-stone-400 rounded-sm" />
                      <div className="flex-1 flex flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <Link href={`/product/${product.slug}`} onClick={closeCart} className="text-sm uppercase tracking-wide hover:text-muted transition-colors">
                            {product.name}
                          </Link>
                          <span className="text-sm">{formatPrice(product.price * item.quantity, product.currency, locale)}</span>
                        </div>
                        {product.description && <p className="text-xs text-muted mt-1">{product.description}</p>}
                        <div className="mt-auto flex items-center justify-between pt-4">
                          <div className="flex items-center gap-3 border border-border px-2 py-1">
                            <button
                              onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                              aria-label="Decrease quantity"
                              className="p-1 hover:text-muted transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs w-4 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                              aria-label="Increase quantity"
                              className="p-1 hover:text-muted transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.productId)}
                            className="text-xs tracking-widest uppercase text-muted hover:text-foreground transition-colors"
                          >
                            {t('remove')}
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {lineItems.length > 0 && (
              <div className="p-4 md:p-6 border-t border-border">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs tracking-widest uppercase text-muted">{t('subtotal')}</span>
                  <span className="text-sm">{formatPrice(subtotal, currency, locale)}</span>
                </div>
                <button
                  disabled
                  title={t('checkoutUnavailable')}
                  className="w-full bg-foreground text-background px-8 py-4 text-sm tracking-widest uppercase opacity-50 cursor-not-allowed"
                >
                  {t('checkout')}
                </button>
                <p className="mt-3 text-[11px] text-muted text-center">{t('checkoutUnavailable')}</p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
