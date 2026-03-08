import React from 'react';
import Layout from '../../../../../components/Layout';
import { PageTransition } from '../../../../../components/ui/PageTransition';
import { Calendar, Clock, Tag, ArrowLeft } from 'lucide-react';
import { CTAButton } from '../../../../../components/CTAButtons';
import { Link } from '../../../../../i18n/navigation';
import { getTranslations } from 'next-intl/server';
import showdown from 'showdown';
import fs from 'fs/promises';
import path from 'path';

export const dynamic = 'error';
export const revalidate = false;

// Blog content files mapping
const blogFiles: Record<string, string> = {
  'el-modelo-one-shot': '/content/blog/es-el-modelo-one-shot.md',
  'protocolo-incinerador': '/content/blog/es-protocolo-incinerador.md',
  'pago-como-autoridad': '/content/blog/es-pago-como-autoridad.md',
  'fin-horas-facturables': '/content/blog/es-fin-horas-facturables.md',
  'the-one-shot-model': '/content/blog/en-the-one-shot-model.md',
  'incinerator-protocol': '/content/blog/en-incinerator-protocol.md',
  'payment-as-authority': '/content/blog/en-payment-as-authority.md',
  'end-of-billable-hours': '/content/blog/en-fin-horas-facturables.md',
};

export function generateStaticParams() {
  const locales = ['en', 'es'];
  return locales.flatMap((locale) =>
    Object.keys(blogFiles).map((slug) => ({
      locale,
      slug
    }))
  );
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug, locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blog' });

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

  // Read Markdown statically during build
  let htmlContent = '';
  const filePathUrl = blogFiles[slug];

  if (filePathUrl) {
    try {
      // filePathUrl usually looks like /content/blog/es-el-modelo-one-shot.md
      // We map it to the actual absolute / public directory
      const absolutePath = path.join(process.cwd(), 'public', filePathUrl);
      let markdownText = await fs.readFile(absolutePath, 'utf8');

      markdownText = markdownText.replace(/^```markdown\s*/gm, '');
      markdownText = markdownText.replace(/^```\s*$/gm, '');

      const converter = new showdown.Converter({
        tables: true,
        strikethrough: true,
        tasklists: true,
        simpleLineBreaks: false,
        openLinksInNewWindow: true,
        emoji: true,
        smoothLivePreview: true,
        literalMidWordUnderscores: true,
        ghCodeBlocks: true,
        headerLevelStart: 2,
      });

      htmlContent = converter.makeHtml(markdownText);
    } catch (error) {
      console.error('Error reading blog content at build time:', error);
      htmlContent = '<p>Error loading blog content.</p>';
    }
  } else {
    htmlContent = '<p>Blog post not found.</p>';
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": t(`posts.${postId}.title`),
    "datePublished": t(`posts.${postId}.date`),
    "author": {
      "@type": "Organization",
      "name": "Cyboring Technologies LLC"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Cyboring Technologies LLC"
    },
    "about": {
      "@type": "Brand",
      "name": "documentos.legal"
    }
  };

  return (
    <Layout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <PageTransition>
        {/* Back Button */}
        <div className="bg-background border-b border-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Link
              href="/"
              className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              {locale === 'es' ? 'Inicio' : 'Home'}
            </Link>
          </div>
        </div>

        {/* Article Header */}
        <article className="py-16 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Metadata */}
            <div className="flex items-center gap-4 mb-6 flex-wrap">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white">
                <Tag className="w-3 h-3 mr-1" />
                {t(`posts.${postId}.tag`)}
              </span>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <Calendar className="w-4 h-4 mr-1" />
                {t(`posts.${postId}.date`)}
              </div>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <Clock className="w-4 h-4 mr-1" />
                {t(`posts.${postId}.readTime`)}
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              {t(`posts.${postId}.title`)}
            </h1>

            {/* Description */}
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 leading-relaxed">
              {t(`posts.${postId}.description`)}
            </p>

            <hr className="border-gray-200 dark:border-gray-700 mb-12" />

            {/* Markdown Content */}
            <div
              className="prose prose-lg dark:prose-invert max-w-none
                                prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white
                                prose-h1:text-3xl prose-h1:mb-6 prose-h1:mt-0 prose-h1:leading-tight
                                prose-h2:text-2xl prose-h2:mb-8 prose-h2:mt-16 prose-h2:leading-snug
                                prose-h3:text-xl prose-h3:mb-6 prose-h3:mt-12 prose-h3:leading-snug
                                prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-8 prose-p:text-lg
                                prose-blockquote:border-l-4 prose-blockquote:border-gray-400 dark:prose-blockquote:border-gray-500
                                prose-blockquote:pl-6 prose-blockquote:pr-4 prose-blockquote:py-2 prose-blockquote:my-8
                                prose-blockquote:italic prose-blockquote:text-gray-700 dark:prose-blockquote:text-gray-300
                                prose-blockquote:bg-gray-50 dark:prose-blockquote:bg-gray-800/30 prose-blockquote:rounded-r
                                prose-ul:list-none prose-ul:pl-0 prose-ul:mb-8 prose-ul:space-y-3
                                prose-ol:list-none prose-ol:pl-0 prose-ol:mb-8 prose-ol:space-y-3
                                prose-li:text-gray-700 dark:prose-li:text-gray-300 prose-li:mb-3 prose-li:leading-relaxed
                                prose-li:pl-6 prose-li:relative
                                before:prose-li:content-['•'] before:prose-li:absolute before:prose-li:left-0 
                                before:prose-li:text-gray-400 dark:before:prose-li:text-gray-500 before:prose-li:font-bold
                                prose-strong:text-gray-900 dark:prose-strong:text-white prose-strong:font-semibold
                                prose-em:text-gray-700 dark:prose-em:text-gray-300
                                prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm
                                prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800 prose-pre:p-4 prose-pre:rounded-lg prose-pre:my-8
                                prose-hr:border-gray-300 dark:prose-hr:border-gray-600 prose-hr:my-16 prose-hr:border-t-2"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />

            {/* Footer CTA */}
            <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-lg p-8 text-center">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {locale === 'es' ? '¿Listo para comenzar?' : 'Ready to get started?'}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {locale === 'es'
                    ? 'Experimente el poder de la ingeniería documental de grado judicial.'
                    : 'Experience the power of judicial-grade document engineering.'}
                </p>
                <CTAButton
                  ctaType="cta-1"
                  variant="primary"
                  size="lg"
                  href="/engine"
                >
                  {locale === 'es' ? 'Iniciar Ejecución' : 'Start Execution'}
                </CTAButton>
              </div>
            </div>
          </div>
        </article>
      </PageTransition>
    </Layout>
  );
}
