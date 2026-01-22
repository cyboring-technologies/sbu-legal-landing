import { setRequestLocale } from 'next-intl/server';
import PrivacyContent from './PrivacyContent';

const locales = ['en', 'es'];

// Generate static params for all locales (enables static export)
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <PrivacyContent />;
}
