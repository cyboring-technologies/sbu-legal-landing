import { notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import HtmlContent from '@/components/HtmlContent';

export const dynamic = 'error';
export const revalidate = false;

// Blog configuration
const blogFiles = {
  'el-modelo-one-shot': '/content/blog/es-el-modelo-one-shot.md',
  'the-one-shot-model': '/content/blog/en-the-one-shot-model.md',
  'protocolo-incinerador': '/content/blog/es-protocolo-incinerador.md',
  'incinerator-protocol': '/content/blog/en-incinerator-protocol.md',
  'pago-como-autoridad': '/content/blog/es-pago-como-autoridad.md',
  'payment-as-authority': '/content/blog/en-payment-as-authority.md',
  'fin-horas-facturables': '/content/blog/es-fin-horas-facturables.md',
  'end-of-billable-hours': '/content/blog/en-fin-horas-facturables.md',
};

// Simplified metadata - we'll restore the full one from types/logic once confirmed
const blogMetadata = {
  post1: {
    en: { title: 'The One-Shot Model', author: 'SBU Legal', date: '2024-05-20', content: '<p>English content for post1...</p>' },
    es: { title: 'El Modelo One-Shot', author: 'SBU Legal', date: '2024-05-20', content: '<p>Contenido en español para post1...</p>' },
  },
  post2: {
    en: { title: 'Incinerator Protocol', author: 'SBU Legal', date: '2024-05-21', content: '<p>English content for post2...</p>' },
    es: { title: 'Protocolo Incinerador', author: 'SBU Legal', date: '2024-05-21', content: '<p>Contenido en español para post2...</p>' },
  },
  post3: {
    en: { title: 'Payment as Authority', author: 'SBU Legal', date: '2024-05-22', content: '<p>English content for post3...</p>' },
    es: { title: 'Pago como Autoridad', author: 'SBU Legal', date: '2024-05-22', content: '<p>Contenido en español para post3...</p>' },
  },
  post4: {
    en: { title: 'End of Billable Hours', author: 'SBU Legal', date: '2024-05-23', content: '<p>English content for post4...</p>' },
    es: { title: 'Fin de Horas Facturables', author: 'SBU Legal', date: '2024-05-23', content: '<p>Contenido en español para post4...</p>' },
  },
};

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  const locales = ['en', 'es'];
  const paths: { locale: string; slug: string }[] = [];

  locales.forEach((locale) => {
    Object.keys(blogFiles).forEach((slug) => {
      paths.push({ locale, slug });
    });
  });

  return paths;
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;

  // IMPORTANT: setRequestLocale must be called BEFORE any translation calls
  setRequestLocale(locale);

  const t = await getTranslations('blog');

  // Get post ID from slug
  const getPostIdFromSlug = (slug: string): string => {
    const slugMap: Record<string, string> = {
      'el-modelo-one-shot': 'post1',
      'the-one-shot-model': 'post1',
      'protocolo-incinerador': 'post2',
      'incinerator-protocol': 'post2',
      'pago-como-autoridad': 'post3',
      'payment-as-authority': 'post3',
      'fin-horas-facturables': 'post4',
      'end-of-billable-hours': 'post4',
    };
    return slugMap[slug] || 'post1';
  };

  const postId = getPostIdFromSlug(slug);
  const postMetadata = (blogMetadata as any)[postId]?.[locale];

  if (!postMetadata) {
    notFound();
  }

  return (
    <div className="container mx-auto py-20 px-4">
      <h1 className="text-4xl font-bold mb-8">{t('hero.title')}</h1>
      <article className="prose prose-invert lg:prose-xl max-w-none">
        <h1>{postMetadata.title}</h1>
        <div className="text-gray-400 mb-8">
          {postMetadata.date} | {postMetadata.author}
        </div>
        <HtmlContent content={postMetadata.content} />
      </article>
    </div>
  );
}
