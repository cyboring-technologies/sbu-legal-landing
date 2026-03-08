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
    'Genere su documento jurídico listo para presentar en minutos. Ejecución única. Sin cuentas. Sin almacenamiento.',
  keywords: 'legal, automatización, documentos, b2b, infraestructura legal, documentos.legal',
  authors: [{ name: 'Documentos.legal' }],
  metadataBase: new URL('https://documentos.legal'),
  openGraph: {
    title: 'Documentos.legal',
    description: 'Genere su documento jurídico listo para presentar en minutos. Ejecución única. Sin cuentas. Sin almacenamiento.',
    url: 'https://documentos.legal',
    siteName: 'Documentos.legal',
    images: [],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Documentos.legal',
    description: 'Genere su documento jurídico listo para presentar en minutos. Ejecución única. Sin cuentas. Sin almacenamiento.',
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Cyboring Technologies LLC",
              "legalName": "Cyboring Technologies LLC",
              "foundingOrganization": {
                "@type": "Organization",
                "name": "Cyboring Technologies LLC"
              },
              "url": "https://documentos.legal",
              "logo": "https://documentos.legal/logo-light-mode.svg",
              "brand": {
                "@type": "Brand",
                "name": "documentos.legal"
              },
              "sameAs": [
                "https://documentos.legal"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "email": "hello@documentos.legal",
                "contactType": "customer support"
              },
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "131 Continental Dr, Suite 305",
                "addressLocality": "Newark",
                "addressRegion": "DE",
                "postalCode": "19713",
                "addressCountry": "US"
              }
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "documentos.legal",
              "url": "https://documentos.legal",
              "publisher": {
                "@type": "Organization",
                "name": "Cyboring Technologies LLC"
              }
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Brand",
              "name": "documentos.legal",
              "url": "https://documentos.legal",
              "description": "Infraestructura de ejecución documental para generar escritos judiciales listos para presentar."
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "SiteNavigationElement",
                  "name": "Home",
                  "url": "https://documentos.legal"
                },
                {
                  "@type": "SiteNavigationElement",
                  "name": "Servicios",
                  "url": "https://documentos.legal/our-services"
                },
                {
                  "@type": "SiteNavigationElement",
                  "name": "Pricing",
                  "url": "https://cyboring.com/pricing"
                },
                {
                  "@type": "SiteNavigationElement",
                  "name": "Questions",
                  "url": "https://documentos.legal/questions-and-answers"
                },
                {
                  "@type": "SiteNavigationElement",
                  "name": "Blog",
                  "url": "https://documentos.legal/blog"
                }
              ]
            })
          }}
        />
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
