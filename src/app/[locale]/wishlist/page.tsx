'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { useWishlistStore } from '@/stores/wishlist-store';
import { getProductById } from '@/lib/mock-data';
import { ProductCard } from '@/components/product';

export default function WishlistPage() {
  const t = useTranslations('nav');
  const tProduct = useTranslations('product');
  const { items, removeItem } = useWishlistStore();

  const wishlistProducts = items
    .map((id) => getProductById(id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <section className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4 md:px-8">
        <h1 className="font-heading text-display font-bold tracking-tight mb-4">{t('wishlist')}</h1>
        <p className="text-muted text-sm tracking-widest uppercase mb-12">
          {wishlistProducts.length} {wishlistProducts.length === 1 ? 'item' : 'items'}
        </p>

        {wishlistProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted mb-6">{tProduct('emptyWishlist')}</p>
            <Link
              href="/shop"
              className="text-sm tracking-widest uppercase border-b border-foreground pb-1 hover:text-muted transition-colors"
            >
              {tProduct('exploreAll')}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {wishlistProducts.map((product) => (
              <div key={product.id} className="relative">
                <ProductCard product={product} />
                <button
                  onClick={() => removeItem(product.id)}
                  className="mt-2 text-xs tracking-widest uppercase text-muted hover:text-foreground transition-colors"
                >
                  {tProduct('removeFromWishlist')}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
