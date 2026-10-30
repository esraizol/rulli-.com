import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Privacy Policy' };

export default async function PrivacyPage() {
  const t = await getTranslations('footer');
  return (
    <section className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4 md:px-8">
        <h1 className="font-heading text-display font-bold tracking-tight">{t('privacyPolicy')}</h1>
      </div>
    </section>
  );
}
