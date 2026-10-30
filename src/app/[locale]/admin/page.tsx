'use client';

import { useRouter } from '@/i18n/routing';
import { useEffect } from 'react';

export default function AdminPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/admin/dashboard');
  }, [router]);
  return null;
}
