import { MetadataRoute } from 'next';
import antipages from '../../data/antipages.json';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://documentos.legal';
  const corporateUrl = 'https://cyboring.com';

  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: corporateUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${corporateUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${corporateUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${corporateUrl}/legal/terms`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${corporateUrl}/legal/privacy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  const antiPageUrls: MetadataRoute.Sitemap = antipages.map((page) => ({
    url: `${baseUrl}/${page.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [...staticUrls, ...antiPageUrls];
}
