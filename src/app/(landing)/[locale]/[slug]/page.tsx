import { notFound } from "next/navigation";
import { Metadata } from "next";
import AntiPage from "../../../../components/AntiPage";
import { allSlugs, getPageBySlug } from "../../../../lib/routeMatrix";

export const dynamic = "error";
export const revalidate = false;

type Props = {
    params: Promise<{ locale: string; slug: string }>;
};

// 1. Static Execution Parameters
export function generateStaticParams() {
    return allSlugs.map((slug) => ({
        slug,
        // Because next-intl locales are defined at layout, dynamic export handles it automatically
        // but for exact safety, we export just the slug.
    }));
}

// 2. SEO Validation
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;

    const pageData = getPageBySlug(slug);

    if (!pageData) {
        return {};
    }

    return {
        title: `${pageData.service} in ${pageData.jurisdiction} | SBU-Legal`,
        description: `Deterministic execution of ${pageData.service} for ${pageData.jurisdiction}. ${pageData.audience} context.`,
        alternates: {
            canonical: `https://documentos.legal/${slug}`,
        },
    };
}

// 3. Page Component
export default async function Page({ params }: Props) {
    const { slug } = await params;

    const pageData = getPageBySlug(slug);

    if (!pageData) {
        notFound();
    }

    // Convert to exactly what AntiPageData expects
    const antiPageData = {
        slug: pageData.slug,
        service: pageData.service,
        jurisdiction: pageData.jurisdiction,
        variant: pageData.variant,
        audience: pageData.audience,
    };

    return <AntiPage data={antiPageData} />;
}
