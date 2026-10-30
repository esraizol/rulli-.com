import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import type { JournalArticle } from '@/types/journal';

interface JournalPreviewCardProps {
  article: JournalArticle;
  href: string;
}

export function JournalPreviewCard({ article, href }: JournalPreviewCardProps) {
  const t = useTranslations('journal');

  return (
    <Link href={href} className="group block">
      <div className="aspect-[16/9] w-full bg-gradient-to-bl from-stone-200 to-stone-400 mb-6 overflow-hidden rounded-sm">
        <div className="w-full h-full bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
      </div>
      <p className="text-xs uppercase tracking-widest text-muted mb-3">{t(article.category)}</p>
      <h3 className="font-heading text-xl mb-3 group-hover:text-muted transition-colors">{article.title}</h3>
      <div className="flex items-center justify-between text-xs text-muted">
        <span>{t('minRead', { time: article.readingTime })}</span>
        <span className="uppercase tracking-widest font-medium group-hover:text-foreground transition-colors">
          {t('read')}
        </span>
      </div>
    </Link>
  );
}
