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
    title: `${pageData.service} en ${jurisdictionLabel} — Escrito legal listo para presentar | documentos.legal`,
    description: `Genere su documento legal para ${pageData.service.toLowerCase()} en ${jurisdictionLabel}. Listo para presentar en minutos. Sin cuentas. Sin almacenamiento.`,
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
    "availableChannel": "OnlineOnly",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Servicios Legales Automatizados",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": pageData.service
          }
        }
      ]
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

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `¿Se puede generar un documento para ${pageData.service.toLowerCase()} en ${jurisdictionLabel}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Sí, el sistema genera automáticamente un documento procesal adaptado para ${pageData.service.toLowerCase()} en la jurisdicción de ${jurisdictionLabel}.`
        }
      },
      {
        "@type": "Question",
        "name": "¿Cuánto tarda en generarse el documento?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "El documento se genera instantáneamente. Una vez proporcionados los datos, está listo en minutos para revisión y descarga."
        }
      },
      {
        "@type": "Question",
        "name": "¿Se guarda mi información?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. El sistema carece de almacenamiento persistente. Operamos en un modelo de ejecución única donde la sesión se destruye."
        }
      },
      {
        "@type": "Question",
        "name": "¿El documento está listo para presentarse?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sí. El escrito producido cumple con los requisitos de fondo y forma, estando listo para presentar tras una última revisión."
        }
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <AntiPage data={antiPageData} locale={locale} />
    </>
  );
}
