import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { SectionLabel } from '@/components/ui';
import { AccordionItem } from '@/components/faq';

export const metadata: Metadata = { title: 'FAQ' };

interface FaqItem {
  category: string;
  question: string;
  answer: string;
}

export default async function FaqPage() {
  const t = await getTranslations('faq');
  const categories = t.raw('categories') as Record<string, string>;
  const items = t.raw('items') as FaqItem[];

  const groups = Object.keys(categories).map((key) => ({
    key,
    label: categories[key],
    items: items.filter((item) => item.category === key),
  }));

  return (
    <section className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4 md:px-8">
        <h1 className="font-heading text-display font-bold tracking-tight mb-4">{t('title')}</h1>
        <p className="text-muted text-lg font-light mb-16 max-w-xl">{t('subtitle')}</p>

        <div className="max-w-3xl space-y-16">
          {groups.map(
            (group) =>
              group.items.length > 0 && (
                <div key={group.key}>
                  <SectionLabel className="mb-6">{group.label}</SectionLabel>
                  <div>
                    {group.items.map((item) => (
                      <AccordionItem key={item.question} question={item.question} answer={item.answer} />
                    ))}
                  </div>
                </div>
              )
          )}
        </div>
      </div>
    </section>
  );
}
