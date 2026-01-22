#!/usr/bin/env node
/**
 * generate-sitemap.js
 * Generates sitemap.xml and robots.txt for the corporate marketing website
 * Supports multiple locales and static marketing pages
 */

const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://vortex-saas.com',
  outputDir: path.join(__dirname, '..', 'public'),
  locales: ['en', 'es', 'fr', 'de'], // Supported locales for corporate site
  defaultLocale: 'en',
  priority: {
    home: 1.0,
    main: 0.9,
    services: 0.8,
    features: 0.7,
    blog: 0.6,
    secondary: 0.5,
    tertiary: 0.4,
  },
  changefreq: {
    daily: 'daily',
    weekly: 'weekly',
    monthly: 'monthly',
    yearly: 'yearly',
  },
};

// Static routes configuration for corporate website
const STATIC_ROUTES = [
  // Main pages
  { path: '/', priority: CONFIG.priority.home, changefreq: CONFIG.changefreq.weekly },
  { path: '/about', priority: CONFIG.priority.main, changefreq: CONFIG.changefreq.monthly },
  { path: '/contact', priority: CONFIG.priority.main, changefreq: CONFIG.changefreq.monthly },

  // Services (Strategic Business Units)
  { path: '/services', priority: CONFIG.priority.services, changefreq: CONFIG.changefreq.weekly },
  {
    path: '/services/ipa',
    priority: CONFIG.priority.services,
    changefreq: CONFIG.changefreq.weekly,
  },
  {
    path: '/services/legal',
    priority: CONFIG.priority.services,
    changefreq: CONFIG.changefreq.weekly,
  },
  {
    path: '/services/hr',
    priority: CONFIG.priority.services,
    changefreq: CONFIG.changefreq.weekly,
  },
  {
    path: '/services/finance',
    priority: CONFIG.priority.services,
    changefreq: CONFIG.changefreq.weekly,
  },

  // Features & Product
  { path: '/features', priority: CONFIG.priority.features, changefreq: CONFIG.changefreq.monthly },
  {
    path: '/features/ai-processing',
    priority: CONFIG.priority.features,
    changefreq: CONFIG.changefreq.monthly,
  },
  {
    path: '/features/document-conversion',
    priority: CONFIG.priority.features,
    changefreq: CONFIG.changefreq.monthly,
  },
  {
    path: '/features/integrations',
    priority: CONFIG.priority.features,
    changefreq: CONFIG.changefreq.monthly,
  },
  { path: '/pricing', priority: CONFIG.priority.main, changefreq: CONFIG.changefreq.weekly },

  // Blog
  { path: '/blog', priority: CONFIG.priority.blog, changefreq: CONFIG.changefreq.daily },
  {
    path: '/blog/category/product-updates',
    priority: CONFIG.priority.blog,
    changefreq: CONFIG.changefreq.weekly,
  },
  {
    path: '/blog/category/tutorials',
    priority: CONFIG.priority.blog,
    changefreq: CONFIG.changefreq.weekly,
  },
  {
    path: '/blog/category/case-studies',
    priority: CONFIG.priority.blog,
    changefreq: CONFIG.changefreq.monthly,
  },

  // Legal & Support
  { path: '/privacy', priority: CONFIG.priority.tertiary, changefreq: CONFIG.changefreq.yearly },
  { path: '/terms', priority: CONFIG.priority.tertiary, changefreq: CONFIG.changefreq.yearly },
  { path: '/support', priority: CONFIG.priority.secondary, changefreq: CONFIG.changefreq.monthly },
  { path: '/faq', priority: CONFIG.priority.secondary, changefreq: CONFIG.changefreq.monthly },

  // Company
  { path: '/careers', priority: CONFIG.priority.secondary, changefreq: CONFIG.changefreq.weekly },
  { path: '/press', priority: CONFIG.priority.secondary, changefreq: CONFIG.changefreq.monthly },
  { path: '/partners', priority: CONFIG.priority.secondary, changefreq: CONFIG.changefreq.monthly },
];

/**
 * Generates URL entries for sitemap
 */
function generateSitemapUrls() {
  const urls = [];
  const today = new Date().toISOString().split('T')[0];

  STATIC_ROUTES.forEach((route) => {
    CONFIG.locales.forEach((locale) => {
      const localePath = locale === CONFIG.defaultLocale ? '' : `/${locale}`;
      const fullPath = `${localePath}${route.path}`.replace(/\/+/g, '/');

      urls.push({
        loc: `${CONFIG.baseUrl}${fullPath}`,
        lastmod: today,
        changefreq: route.changefreq,
        priority: route.priority,
      });
    });
  });

  return urls;
}

/**
 * Creates sitemap XML content
 */
function createSitemapXml(urls) {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
  xml += '        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';

  urls.forEach((url) => {
    xml += '  <url>\n';
    xml += `    <loc>${url.loc}</loc>\n`;
    xml += `    <lastmod>${url.lastmod}</lastmod>\n`;
    xml += `    <changefreq>${url.changefreq}</changefreq>\n`;
    xml += `    <priority>${url.priority}</priority>\n`;
    xml += '  </url>\n';
  });

  xml += '</urlset>';
  return xml;
}

/**
 * Creates robots.txt content
 */
function createRobotsTxt() {
  let content = '# Robots.txt for Vortex SaaS Corporate Website\n\n';
  content += '# Allow all crawlers\n';
  content += 'User-agent: *\n';
  content += 'Allow: /\n\n';
  content += '# Disallow private areas\n';
  content += 'Disallow: /api/\n';
  content += 'Disallow: /_next/\n';
  content += 'Disallow: /admin/\n\n';
  content += '# Crawl delay (optional)\n';
  content += '# Crawl-delay: 1\n\n';
  content += `# Sitemap location\n`;
  content += `Sitemap: ${CONFIG.baseUrl}/sitemap.xml\n`;

  return content;
}

/**
 * Main execution
 */
function main() {
  console.log('🚀 Generating sitemap and robots.txt for corporate website...');
  console.log(`Base URL: ${CONFIG.baseUrl}`);
  console.log(`Output directory: ${CONFIG.outputDir}`);
  console.log(`Locales: ${CONFIG.locales.join(', ')}`);

  try {
    // Ensure output directory exists
    if (!fs.existsSync(CONFIG.outputDir)) {
      fs.mkdirSync(CONFIG.outputDir, { recursive: true });
      console.log(`✓ Created output directory: ${CONFIG.outputDir}`);
    }

    // Generate sitemap
    const urls = generateSitemapUrls();
    const sitemapXml = createSitemapXml(urls);
    const sitemapPath = path.join(CONFIG.outputDir, 'sitemap.xml');
    fs.writeFileSync(sitemapPath, sitemapXml, 'utf8');
    console.log(`✓ Generated sitemap with ${urls.length} URLs`);
    console.log(`  Saved to: ${sitemapPath}`);

    // Generate robots.txt
    const robotsTxt = createRobotsTxt();
    const robotsPath = path.join(CONFIG.outputDir, 'robots.txt');
    fs.writeFileSync(robotsPath, robotsTxt, 'utf8');
    console.log(`✓ Generated robots.txt`);
    console.log(`  Saved to: ${robotsPath}`);

    console.log('\n✅ Sitemap generation complete!');
    console.log(`📊 Summary: ${urls.length} URLs across ${CONFIG.locales.length} locales`);
  } catch (error) {
    console.error('❌ Error generating sitemap:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { generateSitemapUrls, createSitemapXml, createRobotsTxt };
