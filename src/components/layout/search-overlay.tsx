'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { useUIStore } from '@/stores/ui-store';
import { useLockBody } from '@/hooks/use-lock-body';
import { products } from '@/lib/mock-data';
import { X, Search, ArrowRight } from 'lucide-react';

export function SearchOverlay() {
  const t = useTranslations('search');
  const { isSearchOpen, toggleSearch } = useUIStore();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useLockBody(isSearchOpen);

  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSearchOpen) toggleSearch();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isSearchOpen, toggleSearch]);

  const filtered = query.length >= 2
    ? products.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const handleClose = () => {
    setQuery('');
    toggleSearch();
  };

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[1060] bg-background/98 backdrop-blur-sm flex flex-col"
        >
          <div className="container mx-auto px-4 md:px-8 pt-8">
            <div className="flex items-center justify-end mb-12">
              <button onClick={handleClose} className="p-2" aria-label={t('close')}>
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t('placeholder')}
                  className="w-full bg-transparent border-b border-border pl-8 pr-4 py-4 text-xl font-heading placeholder:text-muted focus:outline-none focus:border-foreground transition-colors"
                />
              </div>

              {query.length >= 2 && (
                <div className="mt-8">
                  {filtered.length > 0 ? (
                    <>
                      <p className="text-xs tracking-widest uppercase text-muted mb-6">
                        {t('results', { query, count: filtered.length })}
                      </p>
                      <ul className="space-y-4">
                        {filtered.map((product) => (
                          <li key={product.id}>
                            <Link
                              href={`/product/${product.slug}`}
                              onClick={handleClose}
                              className="flex items-center justify-between group py-3 border-b border-border/50 hover:border-foreground transition-colors"
                            >
                              <div>
                                <p className="text-sm uppercase tracking-wide">{product.name}</p>
                                <p className="text-xs text-muted mt-1">{product.category}</p>
                              </div>
                              <ArrowRight className="w-4 h-4 text-muted group-hover:text-foreground transition-colors" />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <p className="text-muted text-center py-12">{t('noResults')}</p>
                  )}
                </div>
              )}

              {query.length < 2 && (
                <div className="mt-12">
                  <p className="text-xs tracking-widest uppercase text-muted mb-6">{t('trending')}</p>
                  <div className="flex flex-wrap gap-3">
                    {['Silk Scarf', 'Belt', 'Nocturne', 'Brooch'].map((term) => (
                      <button
                        key={term}
                        onClick={() => setQuery(term)}
                        className="px-4 py-2 border border-border text-sm hover:bg-foreground hover:text-background transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
