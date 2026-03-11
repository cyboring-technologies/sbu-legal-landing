import { MetadataRoute } from 'next';
import antipages from '../../data/antipages.json';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://documentos.legal';
  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
  ];

  const antiPageUrls: MetadataRoute.Sitemap = antipages.map((page) => ({
    url: `${baseUrl}/${page.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  return [...staticUrls, ...antiPageUrls];
}
