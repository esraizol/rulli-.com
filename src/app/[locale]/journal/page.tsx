import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { StaggerChildren } from '@/components/ui';
import { JournalPreviewCard } from '@/components/home';
import { journalArticles } from '@/lib/mock-data';

export const metadata: Metadata = { title: 'Journal' };

export default async function JournalPage() {
  const t = await getTranslations('journal');

  return (
    <section className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4 md:px-8">
        <h1 className="font-heading text-display font-bold tracking-tight mb-12">{t('allArticles')}</h1>

        <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {journalArticles.map((article) => (
            <JournalPreviewCard key={article.id} article={article} href={`/journal/${article.slug}`} />
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
