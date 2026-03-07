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
    title: `${pageData.service} en ${jurisdictionLabel} — Documento listo en minutos | documentos.legal`,
    description: `Genere su escrito legal para ${pageData.service.toLowerCase()} en ${jurisdictionLabel} listo para presentar en minutos. Sin cuentas. Sin almacenamiento. Ejecución única.`,
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

  const jurisdictionLabel = JURISDICTION_LABELS[pageData.jurisdiction] || pageData.jurisdiction;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": pageData.service,
    "serviceType": "Generación de escrito procesal",
    "areaServed": jurisdictionLabel,
    "provider": {
      "@type": "Organization",
      "name": "Cyboring Technologies LLC"
    },
    "brand": {
      "@type": "Brand",
      "name": "documentos.legal"
    },
    "url": `https://documentos.legal/${slug}`
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://documentos.legal"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Servicios",
        "item": "https://documentos.legal/our-services"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": pageData.service,
        "item": `https://documentos.legal/${slug}`
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <AntiPage data={antiPageData} locale={locale} />
    </>
  );
}
