import { setRequestLocale } from 'next-intl/server';
import TermsContent from './TermsContent';

const locales = ['en', 'es'];

// Generate static params for all locales (enables static export)
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <TermsContent />;
}
