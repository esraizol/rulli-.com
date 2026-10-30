'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

export function AIStudioWaitlist() {
  const t = useTranslations('aiStudio');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="border border-border rounded-sm p-8 text-center">
        <p className="text-sm font-medium mb-2">{t('thankYou')}</p>
        <p className="text-xs text-muted">{t('notifyText')}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={t('waitlistPlaceholder')}
        className="flex-1 border border-border px-4 py-3 text-sm placeholder:text-muted focus:outline-none focus:border-foreground transition-colors"
      />
      <button
        type="submit"
        className="bg-foreground text-background px-8 py-3 text-sm tracking-widest uppercase hover:bg-foreground/90 transition-colors whitespace-nowrap"
      >
        {t('joinWaitlist')}
      </button>
    </form>
  );
}
