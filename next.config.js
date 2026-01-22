const path = require('path');
const createNextIntlPlugin = require('next-intl/plugin');

// Configure next-intl with the request config path
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export for Cloudflare Pages
  output: 'export',

  // OPCIONAL: Asegura el correcto manejo de rutas
  trailingSlash: true,

  // Enhanced development experience
  reactStrictMode: true,

  // Faster hot reload by watching only necessary files
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.watchOptions = {
        poll: 1000, // Check for changes every second (useful for Docker/WSL)
        aggregateTimeout: 300, // Delay rebuild after the first change
        ignored: /node_modules/,
      };
    }
    return config;
  },
};

module.exports = withNextIntl(nextConfig);
