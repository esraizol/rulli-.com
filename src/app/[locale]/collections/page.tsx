import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Link } from '@/i18n/routing';
import { collections } from '@/lib/mock-data';

export const metadata: Metadata = { title: 'Collections' };

export default async function CollectionsPage() {
  const t = await getTranslations('collection');

  return (
    <section className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4 md:px-8">
        <h1 className="font-heading text-display font-bold tracking-tight mb-12">{t('allCollections')}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {collections.map((collection) => (
            <Link href={`/collections/${collection.slug}`} key={collection.id} className="group block">
              <div className="aspect-[4/5] w-full bg-gradient-to-br from-stone-300 to-stone-500 rounded-sm overflow-hidden relative mb-6">
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700" />
                {!collection.isActive && (
                  <span className="absolute top-4 left-4 bg-background text-foreground text-[10px] tracking-widest uppercase px-2 py-1 rounded-full">
                    {collection.season} {collection.year}
                  </span>
                )}
              </div>
              <h2 className="font-heading text-2xl mb-2">{collection.name}</h2>
              <p className="text-muted font-light leading-relaxed max-w-md mb-3">{collection.description}</p>
              <span className="text-xs tracking-widest uppercase text-muted group-hover:text-foreground transition-colors">
                {t('discoverCollection')} →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
