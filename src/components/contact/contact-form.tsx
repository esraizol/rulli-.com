'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  subject: z.string().min(1),
  message: z.string().min(1),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactForm() {
  const t = useTranslations('contact');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>();

  const onSubmit = handleSubmit(async (values) => {
    const result = contactSchema.safeParse(values);
    if (!result.success) return;

    try {
      // No backend endpoint exists yet — this is wired up and ready to
      // POST to a real contact endpoint (e.g. `/api/contact`) once one exists.
      await new Promise((resolve) => setTimeout(resolve, 400));
      setStatus('success');
      reset();
    } catch {
      setStatus('error');
    }
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6 max-w-xl">
      <div>
        <label htmlFor="name" className="block text-xs tracking-widest uppercase text-muted mb-2">
          {t('name')}
        </label>
        <input
          id="name"
          {...register('name', { required: true })}
          className="w-full bg-transparent border-b border-border focus:border-foreground py-3 outline-none text-sm transition-colors"
        />
        {errors.name && <p className="mt-1 text-xs text-red-600">{t('error')}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-xs tracking-widest uppercase text-muted mb-2">
          {t('email')}
        </label>
        <input
          id="email"
          type="email"
          {...register('email', { required: true })}
          className="w-full bg-transparent border-b border-border focus:border-foreground py-3 outline-none text-sm transition-colors"
        />
        {errors.email && <p className="mt-1 text-xs text-red-600">{t('error')}</p>}
      </div>

      <div>
        <label htmlFor="subject" className="block text-xs tracking-widest uppercase text-muted mb-2">
          {t('subject')}
        </label>
        <input
          id="subject"
          {...register('subject', { required: true })}
          className="w-full bg-transparent border-b border-border focus:border-foreground py-3 outline-none text-sm transition-colors"
        />
        {errors.subject && <p className="mt-1 text-xs text-red-600">{t('error')}</p>}
      </div>

      <div>
        <label htmlFor="message" className="block text-xs tracking-widest uppercase text-muted mb-2">
          {t('message')}
        </label>
        <textarea
          id="message"
          rows={5}
          {...register('message', { required: true })}
          className="w-full bg-transparent border-b border-border focus:border-foreground py-3 outline-none text-sm transition-colors resize-none"
        />
        {errors.message && <p className="mt-1 text-xs text-red-600">{t('error')}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="self-start bg-foreground text-background px-8 py-4 text-sm tracking-widest uppercase hover:bg-foreground/90 transition-colors disabled:opacity-50"
      >
        {t('send')}
      </button>

      {status === 'success' && <p className="text-sm text-muted">{t('success')}</p>}
      {status === 'error' && <p className="text-sm text-red-600">{t('error')}</p>}
    </form>
  );
}
