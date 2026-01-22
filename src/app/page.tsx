'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    const savedLocale = localStorage.getItem('preferred-locale');
    
    if (savedLocale && (savedLocale === 'en' || savedLocale === 'es')) {
      router.replace(`/${savedLocale}/`);
      return;
    }

    const browserLang = navigator.language.toLowerCase();
    const locale = browserLang.startsWith('es') ? 'es' : 'en';
    
    localStorage.setItem('preferred-locale', locale);
    router.replace(`/${locale}/`);
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    </div>
  );
}
