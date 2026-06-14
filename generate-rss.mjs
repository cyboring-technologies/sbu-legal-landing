/**
 * Generates a neutral archive feed after the static export.
 */
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(root, 'out');

if (!existsSync(outDir)) {
  mkdirSync(outDir, { recursive: true });
}

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Documentos.legal está archivado</title>
    <link>https://documentos.legal</link>
    <description>Registro institucional del proyecto archivado Documentos.legal.</description>
    <language>es-ES</language>
    <lastBuildDate>Sun, 14 Jun 2026 00:00:00 GMT</lastBuildDate>
  </channel>
</rss>`;

writeFileSync(path.join(outDir, 'rss.xml'), rss, 'utf-8');
console.log('[generate-rss] Archive feed generated.');
