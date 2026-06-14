import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://documentos.legal',
      lastModified: new Date('2026-06-14'),
      changeFrequency: 'yearly' as const,
      priority: 1.0,
    },
  ];
}
