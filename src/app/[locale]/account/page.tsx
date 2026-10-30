import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Link } from '@/i18n/routing';

export const metadata: Metadata = { title: 'Account' };

export default async function AccountPage() {
  const t = await getTranslations('account');

  return (
    <section className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4 md:px-8 max-w-2xl">
        <h1 className="font-heading text-display font-bold tracking-tight mb-6">{t('title')}</h1>
        <p className="text-muted font-light leading-relaxed mb-12">{t('description')}</p>

        <div className="border border-border rounded-sm p-8 md:p-12 text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-stone-200 to-stone-400 flex items-center justify-center">
            <span className="text-2xl font-heading font-bold text-white">R</span>
          </div>
          <h2 className="font-heading text-xl mb-3">{t('signInTitle')}</h2>
          <p className="text-sm text-muted mb-8 max-w-sm mx-auto">{t('signInDescription')}</p>

          <div className="space-y-4 max-w-xs mx-auto">
            <input
              type="email"
              placeholder={t('emailPlaceholder')}
              className="w-full border border-border px-4 py-3 text-sm placeholder:text-muted focus:outline-none focus:border-foreground transition-colors"
              disabled
            />
            <button
              disabled
              className="w-full bg-foreground text-background px-8 py-3 text-sm tracking-widest uppercase opacity-50 cursor-not-allowed"
            >
              {t('signIn')}
            </button>
            <p className="text-[11px] text-muted">{t('comingSoon')}</p>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/wishlist" className="border border-border rounded-sm p-6 hover:border-foreground transition-colors group">
            <h3 className="text-xs tracking-widest uppercase font-medium mb-2 group-hover:text-foreground transition-colors">{t('wishlistSection')}</h3>
            <p className="text-sm text-muted">{t('wishlistDesc')}</p>
          </Link>
          <Link href="/shop" className="border border-border rounded-sm p-6 hover:border-foreground transition-colors group">
            <h3 className="text-xs tracking-widest uppercase font-medium mb-2 group-hover:text-foreground transition-colors">{t('shopSection')}</h3>
            <p className="text-sm text-muted">{t('shopDesc')}</p>
          </Link>
        </div>
      </div>
    </section>
  );
}
