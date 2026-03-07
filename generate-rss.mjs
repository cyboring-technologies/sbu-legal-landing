/**
 * generate-rss.mjs
 * Post-build script: generates /out/rss.xml from blog post data.
 *
 * Runs automatically via the "postbuild" npm script after `next build`.
 * Uses static export output dir "out/" (matches next.config.js output: 'export').
 */

import { writeFileSync, mkdirSync, existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const BASE_URL = 'https://documentos.legal';
const SITE_TITLE = 'documentos.legal — Manuales de Ingeniería Documental';
const SITE_DESCRIPTION =
  'Documentación técnica oficial sobre la arquitectura de producción de documentos.legal: Protocolo Incinerador, Modelo One-Shot, y Soberanía Humana.';

// Blog posts — mirrors es.json blog.posts data (canonical ES slugs)
const posts = [
  {
    title: 'El Modelo One-Shot',
    slug: 'el-modelo-one-shot',
    description:
      'Por qué el futuro de la infraestructura legal no se encuentra en suscripciones recurrentes, sino en actos de ejecución con propósito.',
    pubDate: new Date('2025-10-15T00:00:00Z'),
    tag: 'Arquitectura',
  },
  {
    title: 'El Protocolo Incinerador',
    slug: 'protocolo-incinerador',
    description:
      'Inmersión profunda en nuestra arquitectura sin estado y cómo garantizamos la destrucción total de la información tras la ejecución.',
    pubDate: new Date('2025-11-02T00:00:00Z'),
    tag: 'Seguridad',
  },
  {
    title: 'Pago como Autoridad',
    slug: 'pago-como-autoridad',
    description:
      'La economía de la irreversibilidad: cómo redefinimos el pago como autorización de un acto único.',
    pubDate: new Date('2025-12-10T00:00:00Z'),
    tag: 'Modelo Económico',
  },
  {
    title: 'El Fin de las Horas Facturables por Redacción',
    slug: 'fin-horas-facturables',
    description:
      'Cómo la ingeniería documental está desplazando el enfoque del tiempo artesanal a la precisión técnica.',
    pubDate: new Date('2026-01-20T00:00:00Z'),
    tag: 'Análisis de Industria',
  },
];

function escapeXml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function buildRss() {
  const lastBuildDate = new Date().toUTCString();

  const items = posts
    .map((post) => {
      const url = `${BASE_URL}/es/blog/${post.slug}`;
      return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(post.description)}</description>
      <pubDate>${post.pubDate.toUTCString()}</pubDate>
      <category>${escapeXml(post.tag)}</category>
    </item>`;
    })
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_TITLE)}</title>
    <link>${BASE_URL}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>es-ES</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${BASE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <copyright>© ${new Date().getFullYear()} Cyboring Technologies LLC</copyright>${items}
  </channel>
</rss>`;
}

// Write to out/rss.xml (Next.js static export output directory)
const outDir = path.join(__dirname, 'out');

if (!existsSync(outDir)) {
  console.warn(
    '[generate-rss] Warning: out/ directory not found. Running build first?'
  );
  mkdirSync(outDir, { recursive: true });
}

const rssPath = path.join(outDir, 'rss.xml');
writeFileSync(rssPath, buildRss(), 'utf-8');
console.log(`[generate-rss] ✓ RSS feed generated → ${rssPath}`);
