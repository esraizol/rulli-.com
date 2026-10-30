import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { AIStudioWaitlist } from '@/components/ai-studio/waitlist-form';

export const metadata: Metadata = { title: 'AI Studio' };

export default async function AIStudioPage() {
  const t = await getTranslations('aiStudio');
  return (
    <section className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4 md:px-8 max-w-2xl text-center">
        <span className="inline-block text-[10px] uppercase bg-foreground text-background px-3 py-1 rounded-full tracking-widest mb-6">
          {t('comingSoon')}
        </span>
        <h1 className="font-heading text-display font-bold tracking-tight mb-6">{t('title')}</h1>
        <p className="text-lg text-muted font-light leading-relaxed mb-12">{t('description')}</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 text-left">
          <div className="border border-border rounded-sm p-6">
            <h3 className="text-xs tracking-widest uppercase font-medium mb-3">{t('feature1Title')}</h3>
            <p className="text-sm text-muted font-light">{t('feature1Desc')}</p>
          </div>
          <div className="border border-border rounded-sm p-6">
            <h3 className="text-xs tracking-widest uppercase font-medium mb-3">{t('feature2Title')}</h3>
            <p className="text-sm text-muted font-light">{t('feature2Desc')}</p>
          </div>
          <div className="border border-border rounded-sm p-6">
            <h3 className="text-xs tracking-widest uppercase font-medium mb-3">{t('feature3Title')}</h3>
            <p className="text-sm text-muted font-light">{t('feature3Desc')}</p>
          </div>
        </div>

        <AIStudioWaitlist />
      </div>
    </section>
  );
}
