import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Link } from '@/i18n/routing';
import { StaggerChildren, SectionLabel } from '@/components/ui';
import { ProductCard } from '@/components/product';
import { products } from '@/lib/mock-data';
import type { ProductCategory } from '@/types/product';

export const metadata: Metadata = { title: 'Shop' };

const CATEGORIES: ProductCategory[] = ['scarves', 'belts', 'brooches', 'accessories'];

interface ShopPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const t = await getTranslations('product');
  const { category } = await searchParams;

  const activeCategory = CATEGORIES.includes(category as ProductCategory) ? (category as ProductCategory) : undefined;
  const visibleProducts = activeCategory ? products.filter((p) => p.category === activeCategory) : products;

  return (
    <section className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4 md:px-8">
        <SectionLabel>{t('filterBy')}</SectionLabel>
        <h1 className="font-heading text-display font-bold tracking-tight mt-4 mb-10">{t('exploreAll')}</h1>

        <div className="flex flex-wrap gap-3 mb-12">
          <Link
            href="/shop"
            className={`px-5 py-2 text-xs tracking-widest uppercase border transition-colors duration-300 ${
              !activeCategory
                ? 'bg-foreground text-background border-foreground'
                : 'border-border text-muted hover:text-foreground hover:border-foreground'
            }`}
          >
            {t('allCategories')}
          </Link>
          {CATEGORIES.map((cat) => (
            <Link
              key={cat}
              href={`/shop?category=${cat}`}
              className={`px-5 py-2 text-xs tracking-widest uppercase border transition-colors duration-300 ${
                activeCategory === cat
                  ? 'bg-foreground text-background border-foreground'
                  : 'border-border text-muted hover:text-foreground hover:border-foreground'
              }`}
            >
              {t(cat)}
            </Link>
          ))}
        </div>

        <StaggerChildren className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
