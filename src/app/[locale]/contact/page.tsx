import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { ContactForm } from '@/components/contact';

export const metadata: Metadata = { title: 'Contact' };

export default async function ContactPage() {
  const t = await getTranslations('contact');

  return (
    <section className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4 md:px-8">
        <h1 className="font-heading text-display font-bold tracking-tight mb-4">{t('title')}</h1>
        <p className="text-muted text-lg font-light mb-12 max-w-xl">{t('subtitle')}</p>
        <ContactForm />
      </div>
    </section>
  );
}
