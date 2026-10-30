import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Link } from '@/i18n/routing';
import { SectionLabel, StaggerChildren } from '@/components/ui';
import { ProductCard } from '@/components/product';
import { JournalPreviewCard } from '@/components/home';
import { journalArticles, getJournalArticleBySlug, getProductBySlug } from '@/lib/mock-data';

interface JournalArticlePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return journalArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: JournalArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getJournalArticleBySlug(slug);
  if (!article) return {};
  return { title: article.seo.title, description: article.seo.description };
}

export default async function JournalArticlePage({ params }: JournalArticlePageProps) {
  const { slug } = await params;
  const article = getJournalArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const t = await getTranslations('journal');
  const tProduct = await getTranslations('product');
  const relatedProducts = article.relatedProducts
    .map((productSlug) => getProductBySlug(productSlug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
  const relatedArticles = article.relatedArticles
    .map((articleSlug) => getJournalArticleBySlug(articleSlug))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));

  return (
    <article className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4 md:px-8 max-w-3xl">
        <p className="text-xs uppercase tracking-widest text-muted mb-4">{t(article.category)}</p>
        <h1 className="font-heading text-display font-bold tracking-tight mb-6">{article.title}</h1>
        <div className="flex items-center gap-4 text-xs text-muted mb-12">
          <span>{t('by', { author: article.author.name })}</span>
          <span>·</span>
          <span>{t('minRead', { time: article.readingTime })}</span>
        </div>

        {article.coverImage ? (
          <div className="aspect-[16/9] w-full rounded-sm mb-12 overflow-hidden">
            <img src={article.coverImage} alt={article.coverImageAlt} className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className="aspect-[16/9] w-full bg-gradient-to-bl from-stone-200 to-stone-400 rounded-sm mb-12" />
        )}

        {article.excerpt && <p className="text-lg font-light leading-relaxed text-muted mb-8">{article.excerpt}</p>}

        {article.content && (
          <div className="prose prose-lg max-w-none">
            {article.content.split('\n\n').map((paragraph, i) => (
              <p key={i} className="text-base font-light leading-relaxed mb-6">{paragraph}</p>
            ))}
          </div>
        )}
      </div>

      {relatedProducts.length > 0 && (
        <div className="container mx-auto px-4 md:px-8 max-w-5xl mt-20 pt-16 border-t border-border">
          <SectionLabel>{tProduct('relatedProducts')}</SectionLabel>
          <StaggerChildren className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mt-12">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </StaggerChildren>
        </div>
      )}

      {relatedArticles.length > 0 && (
        <div className="container mx-auto px-4 md:px-8 max-w-5xl mt-20 pt-16 border-t border-border">
          <SectionLabel>{t('relatedArticles')}</SectionLabel>
          <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mt-12">
            {relatedArticles.map((relatedArticle) => (
              <JournalPreviewCard key={relatedArticle.id} article={relatedArticle} href={`/journal/${relatedArticle.slug}`} />
            ))}
          </StaggerChildren>
        </div>
      )}

      <div className="container mx-auto px-4 md:px-8 max-w-3xl mt-16">
        <Link href="/journal" className="text-sm tracking-widest uppercase text-muted hover:text-foreground transition-colors">
          ← {t('allArticles')}
        </Link>
      </div>
    </article>
  );
}
