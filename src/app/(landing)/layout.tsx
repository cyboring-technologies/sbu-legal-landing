import type { Metadata, Viewport } from 'next';
import { Inter, IBM_Plex_Sans } from 'next/font/google';
import './global.css';
import { ThemeProvider, ThemeScript } from '../../components/providers/ThemeProvider';

// Optimize font loading with next/font to prevent CLS
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
  title: {
    default: 'Documentos.legal | Infraestructura Legal Automatizada',
    template: '%s - Documentos.legal',
  },
  description:
    'Infraestructura legal confiable, mínima y eficiente. Automatización de documentos sin fricción visual ni cognitiva.',
  keywords: 'legal, automatización, documentos, b2b, infraestructura legal, documentos.legal',
  authors: [{ name: 'Documentos.legal' }],
  metadataBase: new URL('https://documentos.legal'),
  openGraph: {
    title: 'Documentos.legal',
    description: 'Infraestructura legal confiable y automatizada.',
    url: 'https://documentos.legal',
    siteName: 'Documentos.legal',
    images: [],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Documentos.legal',
    description: 'Infraestructura legal confiable y automatizada.',
  },
  icons: {
    icon: [
      { url: '/favicon-light.svg', media: '(prefers-color-scheme: light)' },
      { url: '/favicon-dark.svg', media: '(prefers-color-scheme: dark)' },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning className={`${inter.variable} ${plexSans.variable}`}>
      <head>
        <ThemeScript />
      </head>
      <body className={`${inter.className} antialiased bg-background text-foreground`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          storageKey="theme"
          suppressHydrationWarning
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
