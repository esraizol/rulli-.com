import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { SectionLabel, StaggerChildren } from '@/components/ui';
import { ProductCard, WishlistButton, AddToCartButton } from '@/components/product';
import { getProductBySlug, getRelatedProducts, products } from '@/lib/mock-data';
import { formatPrice } from '@/lib/utils';

interface ProductPageProps {
  params: Promise<{ slug: string; locale: string }>;
}

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return { title: product.seo.title, description: product.seo.description };
}

const STOCK_LABEL_KEY: Record<string, string> = {
  in_stock: 'inStock',
  low_stock: 'lowStock',
  out_of_stock: 'outOfStock',
  pre_order: 'preOrder',
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug, locale } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const t = await getTranslations('product');
  const related = getRelatedProducts(product);

  return (
    <section className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
          <div className="md:col-span-7">
            <div className="aspect-[3/4] w-full bg-gradient-to-br from-stone-200 to-stone-400 rounded-sm overflow-hidden">
              {product.gallery[0]?.src && (
                <img
                  src={product.gallery[0].src}
                  alt={product.gallery[0].alt}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </div>

          <div className="md:col-span-5 flex flex-col">
            {product.isNew && (
              <span className="mb-4 inline-block w-fit bg-foreground text-background text-[10px] tracking-widest uppercase px-2 py-1 rounded-full">
                {t('new')}
              </span>
            )}
            <h1 className="font-heading text-3xl md:text-4xl leading-tight mb-3">{product.name}</h1>
            <p className="text-lg text-muted mb-6">{formatPrice(product.price, product.currency, locale)}</p>
            <p className="text-xs tracking-widest uppercase text-muted mb-8">{t(STOCK_LABEL_KEY[product.stockStatus])}</p>

            <p className="text-muted font-light leading-relaxed mb-10">{product.description}</p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <AddToCartButton productId={product.id} />
              {product.shopierUrl ? (
                <a
                  href={product.shopierUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-foreground text-background px-8 py-4 text-sm tracking-widest uppercase hover:bg-foreground/90 transition-colors text-center"
                >
                  {t('buyViaShopier')}
                </a>
              ) : null}
              <WishlistButton productId={product.id} />
            </div>

            <div className="border-t border-border pt-8 space-y-8">
              {product.story && (
                <div>
                  <h2 className="text-xs tracking-widest uppercase text-muted mb-2">{t('story')}</h2>
                  <p className="text-sm font-light leading-relaxed">{product.story}</p>
                </div>
              )}
              <div>
                <h2 className="text-xs tracking-widest uppercase text-muted mb-2">{t('material')}</h2>
                <p className="text-sm font-light leading-relaxed">{product.material}</p>
              </div>
              <div>
                <h2 className="text-xs tracking-widest uppercase text-muted mb-2">{t('careInstructions')}</h2>
                <ul className="text-sm font-light leading-relaxed list-disc list-inside space-y-1">
                  {product.careInstructions.map((instruction) => (
                    <li key={instruction}>{instruction}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-24 pt-16 border-t border-border">
            <SectionLabel>{t('relatedProducts')}</SectionLabel>
            <StaggerChildren className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mt-12">
              {related.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </StaggerChildren>
          </div>
        )}
      </div>
    </section>
  );
}
