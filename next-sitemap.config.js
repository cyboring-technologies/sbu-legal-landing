/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://documentos.legal',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/**'],
  additionalPaths: async () => [
    {
      loc: '/',
      changefreq: 'yearly',
      priority: 1,
      lastmod: '2026-06-14',
    },
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/en/', '/es/', '/engine/', '/prepare/', '/terminal/', '/sitemap/', '/api/'],
      },
    ],
  },
};
