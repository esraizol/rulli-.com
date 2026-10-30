import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { StaggerChildren, SectionLabel } from '@/components/ui';
import { ProductCard } from '@/components/product';
import { collections, getCollectionBySlug, getProductBySlug } from '@/lib/mock-data';

interface CollectionPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return collections.map((collection) => ({ slug: collection.slug }));
}

export async function generateMetadata({ params }: CollectionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);
  if (!collection) return {};
  return { title: collection.seo.title, description: collection.seo.description };
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);

  if (!collection) {
    notFound();
  }

  const t = await getTranslations('collection');
  const collectionProducts = collection.products
    .map((productSlug) => getProductBySlug(productSlug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <section className="min-h-screen pt-32 pb-20">
      <div className="aspect-[21/9] w-full bg-gradient-to-br from-stone-300 to-stone-600 mb-16 overflow-hidden">
        {collection.heroImage && (
          <img src={collection.heroImage} alt={collection.name} className="w-full h-full object-cover" />
        )}
      </div>

      <div className="container mx-auto px-4 md:px-8">
        <h1 className="font-heading text-display font-bold tracking-tight mb-6">{collection.name}</h1>
        <p className="text-muted text-lg font-light leading-relaxed max-w-2xl mb-4">{collection.description}</p>
        <p className="text-xs tracking-widest uppercase text-muted mb-12">{t('products', { count: collectionProducts.length })}</p>

        {collection.editorialStory && (
          <div className="max-w-2xl mb-16">
            <SectionLabel className="mb-4">{t('editorialStory')}</SectionLabel>
            <p className="font-light leading-relaxed">{collection.editorialStory}</p>
          </div>
        )}

        {collectionProducts.length > 0 && (
          <StaggerChildren className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {collectionProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </StaggerChildren>
        )}
      </div>
    </section>
  );
}
