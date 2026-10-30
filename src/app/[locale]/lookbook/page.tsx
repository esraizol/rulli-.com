import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { products } from '@/lib/mock-data';

export const metadata: Metadata = { title: 'Lookbook' };

const LOOKBOOK_ITEMS = [
  { image: '/images/products/silk-scarf-1.jpg', caption: 'Nocturne N°1 — Evening Drape' },
  { image: '/images/hero/campaign.jpg', caption: 'Styled by RULLIÉ' },
  { image: '/images/products/silk-scarf-3.jpg', caption: 'Core Collection — The Shoulder Wrap' },
  { image: '/images/products/crescent-brooch.jpg', caption: 'Crescent Brooch — Lapel Detail' },
  { image: '/images/products/silk-scarf-2.jpg', caption: 'Nocturne N°2 — The Classic Knot' },
  { image: '/images/products/signature-belt.jpg', caption: 'Signature Belt — Noir / Gold' },
  { image: '/images/products/silk-scarf-4.jpg', caption: 'New Arrival — Emerald Spiral' },
  { image: '/images/products/silk-hair-tie.jpg', caption: 'Silk Hair Tie — Jewel Tones' },
  { image: '/images/editorial/nocturne.jpg', caption: 'Nocturne Collection — Campaign' },
];

export default async function LookbookPage() {
  const t = await getTranslations('lookbook');

  return (
    <section className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4 md:px-8">
        <h1 className="font-heading text-display font-bold tracking-tight mb-4">{t('title')}</h1>
        <p className="text-muted text-lg font-light mb-16 max-w-xl">{t('subtitle')}</p>
      </div>

      {/* Horizontal Scroll Gallery */}
      <div className="relative">
        <div
          className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory px-4 md:px-8 pb-8 cursor-grab active:cursor-grabbing scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {LOOKBOOK_ITEMS.map((item, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[75vw] md:w-[50vw] lg:w-[35vw] snap-center group relative"
            >
              <div className="aspect-[3/4] w-full rounded-sm overflow-hidden bg-gradient-to-tr from-stone-200 to-stone-400">
                <img
                  src={item.image}
                  alt={item.caption}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <p className="mt-4 text-xs tracking-widest uppercase text-muted font-medium">
                {item.caption}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Grid Gallery Below */}
      <div className="container mx-auto px-4 md:px-8 mt-20">
        <h2 className="text-xs tracking-widest uppercase text-muted mb-8 flex items-center gap-4">
          <span className="inline-block w-8 h-px bg-muted" />
          {t('grid')}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {products.filter(p => p.gallery[0]?.src).map((product) => (
            <div key={product.id} className="relative group">
              <div className="aspect-[3/4] w-full rounded-sm overflow-hidden">
                <img
                  src={product.gallery[0].src}
                  alt={product.gallery[0].alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <p className="mt-3 text-xs tracking-widest uppercase text-muted font-medium">{product.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
