import { MetadataRoute } from 'next';
import antipages from '../../data/antipages.json';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://documentos.legal';
  const locales = ['en', 'es'];

  // 1. Static URLs across all locales
  const staticPaths = ['', '/blog'];
  const staticUrls: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    staticPaths.map((path) => ({
      url: `${baseUrl}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: path === '' ? 1.0 : 0.6,
    }))
  );

  // 2. AntiPages across all locales
  const antiPageUrls: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    antipages.map((page) => ({
      url: `${baseUrl}/${locale}/${page.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    }))
  );

  // Add the root landing redirect page (optional but good for crawlers to find the language versions)
  const rootUrls: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
  ];

  return [...rootUrls, ...staticUrls, ...antiPageUrls];
}
