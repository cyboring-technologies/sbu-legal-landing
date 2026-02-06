'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { locales } from '../../i18n/request';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    // Check localStorage
    const savedLocale = localStorage.getItem('preferred-locale');
    if (savedLocale && locales.includes(savedLocale as any)) {
      router.replace(`/${savedLocale}/`);
      return;
    }

    // Check browser language
    const browserLang = navigator.language.toLowerCase();
    // Simple logic: if strict match or starts with 'es', use 'es', otherwise default to 'en'
    const matchedLocale = locales.find(l => l === browserLang || browserLang.startsWith(l)) || 'en';

    localStorage.setItem('preferred-locale', matchedLocale);
    router.replace(`/${matchedLocale}/`);
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
    </div>
  );
}
