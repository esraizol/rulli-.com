'use client';

import { useTranslations } from 'next-intl';
import { useCartStore } from '@/stores/cart-store';

interface AddToCartButtonProps {
  productId: string;
}

export function AddToCartButton({ productId }: AddToCartButtonProps) {
  const t = useTranslations('product');
  const addItem = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);

  return (
    <button
      type="button"
      onClick={() => {
        addItem(productId);
        openCart();
      }}
      className="inline-block bg-foreground text-background px-8 py-4 text-sm tracking-widest uppercase hover:bg-foreground/90 transition-colors"
    >
      {t('addToCart')}
    </button>
  );
}
