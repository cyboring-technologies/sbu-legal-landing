import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/en/', '/es/', '/engine/', '/prepare/', '/terminal/', '/sitemap/', '/api/'],
      },
    ],
    sitemap: 'https://documentos.legal/sitemap.xml',
  };
}
