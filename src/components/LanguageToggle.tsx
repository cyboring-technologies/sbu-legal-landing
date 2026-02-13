'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { Globe } from 'lucide-react';

// Slug mapping between languages for blog posts
const slugMap: Record<string, Record<string, string>> = {
  'en': {
    'el-modelo-one-shot': 'the-one-shot-model',
    'protocolo-incinerador': 'incinerator-protocol',
    'pago-como-autoridad': 'payment-as-authority',
    'fin-horas-facturables': 'end-of-billable-hours',
  },
  'es': {
    'the-one-shot-model': 'el-modelo-one-shot',
    'incinerator-protocol': 'protocolo-incinerador',
    'payment-as-authority': 'pago-como-autoridad',
    'end-of-billable-hours': 'fin-horas-facturables',
  },
};

export function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLanguage = () => {
    const newLocale = locale === 'en' ? 'es' : 'en';

    // Save preference to localStorage
    localStorage.setItem('preferred-locale', newLocale);

    // Remove the current locale from the pathname
    let pathnameWithoutLocale = pathname.replace(`/${locale}`, '');

    // Check if we're on a blog post page and translate the slug
    const blogPostMatch = pathnameWithoutLocale.match(/^\/blog\/([^/]+)\/?$/);
    if (blogPostMatch) {
      const currentSlug = blogPostMatch[1];
      const translatedSlug = slugMap[newLocale]?.[currentSlug];

      if (translatedSlug) {
        pathnameWithoutLocale = `/blog/${translatedSlug}`;
      }
    }

    // Navigate to the same path with the new locale
    router.push(`/${newLocale}${pathnameWithoutLocale}`);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      aria-label="Toggle language"
      title={locale === 'en' ? 'Cambiar a Español' : 'Switch to English'}
    >
      <div className="flex items-center gap-2">
        <Globe className="w-5 h-5" />
        <span className="text-sm font-medium uppercase">{locale === 'en' ? 'ES' : 'EN'}</span>
      </div>
    </button>
  );
}
