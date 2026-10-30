import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { ScrollReveal, StaggerChildren, SectionLabel } from '@/components/ui';

export const metadata: Metadata = { title: 'About' };

export default async function AboutPage() {
  const t = await getTranslations('about');

  const values = [
    { title: t('value1Title'), body: t('value1Body') },
    { title: t('value2Title'), body: t('value2Body') },
    { title: t('value3Title'), body: t('value3Body') },
  ];

  return (
    <section className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4 md:px-8">
        <ScrollReveal>
          <SectionLabel>{t('eyebrow')}</SectionLabel>
          <h1 className="font-heading text-display font-bold tracking-tight mt-4 mb-8">{t('title')}</h1>
          <p className="text-lg text-muted font-light leading-relaxed max-w-2xl mb-20">{t('intro')}</p>
        </ScrollReveal>

        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-24">
            <div className="md:col-span-5">
              <div className="aspect-[4/5] w-full bg-gradient-to-br from-stone-200 to-stone-400 rounded-sm" />
            </div>
            <div className="md:col-span-7 flex flex-col justify-center">
              <h2 className="font-heading text-2xl md:text-3xl mb-6">{t('storyTitle')}</h2>
              <p className="text-muted font-light leading-relaxed max-w-xl">{t('storyBody')}</p>
            </div>
          </div>
        </ScrollReveal>

        <SectionLabel className="mb-12">{t('valuesTitle')}</SectionLabel>
        <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {values.map((value) => (
            <div key={value.title}>
              <h3 className="font-heading text-xl mb-3">{value.title}</h3>
              <p className="text-sm text-muted font-light leading-relaxed">{value.body}</p>
            </div>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
