import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { ScrollReveal, SectionLabel } from '@/components/ui';

export const metadata: Metadata = { title: 'Vision' };

export default async function VisionPage() {
  const t = await getTranslations('vision');

  return (
    <section className="min-h-screen pt-32 pb-20 flex items-center">
      <div className="container mx-auto px-4 md:px-8 text-center">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto flex flex-col items-center">
            <SectionLabel className="mb-8">{t('title')}</SectionLabel>
            <h1 className="font-heading text-3xl md:text-5xl leading-tight text-foreground mb-8 text-balance">
              {t('statement')}
            </h1>
            <div className="w-12 h-[1px] bg-foreground/20 mb-8" />
            <p className="text-muted text-lg font-light leading-relaxed max-w-2xl">{t('body')}</p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
