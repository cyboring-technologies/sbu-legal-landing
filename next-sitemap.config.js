/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://cyboring.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,

  // Exclude private routes
  exclude: ['/api/*', '/admin/*', '/_next/*', '/404', '/500'],

  // Alternate language refs - Corporate supports 4 locales
  alternateRefs: [
    {
      href: 'https://cyboring.com',
      hreflang: 'en',
    },
    {
      href: 'https://cyboring.com/es',
      hreflang: 'es',
    },
    {
      href: 'https://cyboring.com/fr',
      hreflang: 'fr',
    },
    {
      href: 'https://cyboring.com/de',
      hreflang: 'de',
    },
  ],

  // Transform function for custom modifications
  transform: async (config, path) => {
    // Set priority based on path
    let priority = 0.7;
    let changefreq = 'weekly';

    // Homepage has highest priority
    if (path === '/' || path.match(/^\/(es|fr|de)\/?$/)) {
      priority = 1.0;
      changefreq = 'daily';
    }
    // About, services, contact
    else if (path.includes('/about') || path.includes('/contact') || path.includes('/services')) {
      priority = 0.9;
      changefreq = 'monthly';
    }
    // Blog posts
    else if (path.includes('/blog')) {
      priority = 0.8;
      changefreq = 'weekly';
    }
    // Legal pages
    else if (path.includes('/legal') || path.includes('/privacy') || path.includes('/terms')) {
      priority = 0.3;
      changefreq = 'yearly';
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
    };
  },

  // Robots.txt configuration
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/_next/'],
      },
    ],
  },
};
