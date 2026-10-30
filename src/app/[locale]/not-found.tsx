import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function NotFound() {
  const t = useTranslations('notFound');

  return (
    <section className="min-h-screen pt-32 pb-20 flex items-center">
      <div className="container mx-auto px-4 md:px-8 text-center">
        <h1 className="font-heading text-display font-bold tracking-tight">{t('title')}</h1>
        <p className="mt-6 text-lg text-muted max-w-xl mx-auto">{t('description')}</p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="inline-block border border-foreground text-foreground px-8 py-4 text-sm tracking-widest uppercase hover:bg-foreground hover:text-background transition-all duration-500"
          >
            {t('cta')}
          </Link>
          <Link
            href="/collections"
            className="inline-block px-8 py-4 text-sm tracking-widest uppercase text-muted hover:text-foreground transition-colors duration-300"
          >
            {t('explore')}
          </Link>
        </div>
      </div>
    </section>
  );
}
