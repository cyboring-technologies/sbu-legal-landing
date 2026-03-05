import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import AntiPage from '../../../../components/AntiPage';
import { allSlugs, getPageBySlug } from '../../../../lib/routeMatrix';

export const dynamic = 'error';
export const revalidate = false;

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

// 1. Static Execution Parameters
export function generateStaticParams() {
  return allSlugs.flatMap((slug) => [
    { locale: 'en', slug },
    { locale: 'es', slug },
  ]);
}

const JURISDICTION_LABELS: Record<string, string> = {
  JUR_1: 'México',
  JUR_2: 'Colombia',
  JUR_3: 'Chile',
};

// 2. SEO Validation
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const pageData = getPageBySlug(slug);

  if (!pageData) {
    return {};
  }

  const jurisdictionLabel = JURISDICTION_LABELS[pageData.jurisdiction] || pageData.jurisdiction;

  return {
    title: `${pageData.service} en ${jurisdictionLabel} | SBU-Legal`,
    description: `Ejecución determinista de ${pageData.service} para ${jurisdictionLabel}. Contexto ${pageData.audience}.`,
    alternates: {
      canonical: `https://documentos.legal/${slug}`,
    },
  };
}

// 3. Page Component
export default async function Page({ params }: Props) {
  const { locale, slug } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  const pageData = getPageBySlug(slug);

  if (!pageData) {
    notFound();
  }

  // Convert to exactly what AntiPageData expects
  const antiPageData = {
    ...pageData,
  };

  return <AntiPage data={antiPageData} locale={locale} />;
}
