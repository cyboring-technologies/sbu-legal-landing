import type { Metadata, Viewport } from 'next';
import { IBM_Plex_Sans, Inter } from 'next/font/google';
import { ThemeProvider, ThemeScript } from '../../components/providers/ThemeProvider';
import './global.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const plexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  display: 'swap',
  variable: '--font-plex',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://documentos.legal'),
  title: 'Documentos.legal está archivado',
  description:
    'Registro institucional del proyecto archivado Documentos.legal de Cyboring Technologies LLC.',
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Documentos.legal está archivado',
    description: 'Registro institucional de un proyecto archivado de Cyboring Technologies LLC.',
    url: 'https://documentos.legal',
    siteName: 'Documentos.legal',
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Documentos.legal está archivado',
    description: 'Registro institucional de un proyecto archivado de Cyboring Technologies LLC.',
  },
  icons: {
    icon: [
      { url: '/favicon-light.svg', media: '(prefers-color-scheme: light)' },
      { url: '/favicon-dark.svg', media: '(prefers-color-scheme: dark)' },
    ],
  },
};

const archiveSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'Documentos.legal está archivado',
  url: 'https://documentos.legal',
  description: 'Registro institucional de un proyecto archivado de Cyboring Technologies LLC.',
  isPartOf: {
    '@type': 'WebSite',
    name: 'Documentos.legal',
    url: 'https://documentos.legal',
  },
  about: {
    '@type': 'Organization',
    name: 'Cyboring Technologies LLC',
    url: 'https://www.cyboring.com',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning className={`${inter.variable} ${plexSans.variable}`}>
      <head>
        <ThemeScript />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(archiveSchema) }}
        />
      </head>
      <body className={`${inter.className} bg-background text-foreground antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          storageKey="theme"
          suppressHydrationWarning
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
