import type { Metadata } from 'next';
import Link from 'next/link';
import antipages from '../../../data/antipages.json';

export const metadata: Metadata = {
    title: 'Sitemap — documentos.legal',
    description:
        'Mapa de contenido de documentos.legal: servicios, blog y páginas de infraestructura legal.',
    alternates: {
        canonical: 'https://documentos.legal/sitemap',
    },
};

const staticPages = [
    { href: '/', label: 'Inicio' },
    { href: '/es', label: 'Inicio (ES)' },
    { href: '/en', label: 'Home (EN)' },
    { href: '/es/blog', label: 'Blog — Manuales de Ingeniería Documental' },
    { href: '/es/our-services', label: 'Servicios' },
    { href: '/es/about-us', label: 'Sobre Nosotros' },
    { href: '/es/questions-and-answers', label: 'Preguntas Frecuentes' },
    { href: '/es/contact', label: 'Contacto' },
    { href: '/es/prices', label: 'Precios' },
    {
        href: '/es/blog/el-modelo-one-shot',
        label: 'Blog: El Modelo One-Shot',
    },
    {
        href: '/es/blog/protocolo-incinerador',
        label: 'Blog: El Protocolo Incinerador',
    },
    {
        href: '/es/blog/pago-como-autoridad',
        label: 'Blog: Pago como Autoridad',
    },
    {
        href: '/es/blog/fin-horas-facturables',
        label: 'Blog: El Fin de las Horas Facturables',
    },
];

export default function SitemapPage() {
    return (
        <main
            style={{
                maxWidth: '860px',
                margin: '0 auto',
                padding: '4rem 1.5rem',
                fontFamily:
                    'var(--font-inter, system-ui, -apple-system, sans-serif)',
                color: 'var(--foreground, #111)',
            }}
        >
            <h1
                style={{
                    fontSize: '1.75rem',
                    fontWeight: 700,
                    marginBottom: '0.5rem',
                    letterSpacing: '-0.02em',
                }}
            >
                Sitemap — documentos.legal
            </h1>
            <p
                style={{
                    fontSize: '0.95rem',
                    color: 'var(--muted-foreground, #666)',
                    marginBottom: '3rem',
                    lineHeight: 1.6,
                }}
            >
                Índice completo de páginas de la infraestructura documental.
            </p>

            {/* Static pages */}
            <section style={{ marginBottom: '3rem' }}>
                <h2
                    style={{
                        fontSize: '1rem',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        color: 'var(--muted-foreground, #888)',
                        marginBottom: '1rem',
                    }}
                >
                    Páginas Principales
                </h2>
                <ul
                    style={{
                        listStyle: 'none',
                        margin: 0,
                        padding: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.5rem',
                    }}
                >
                    {staticPages.map((page) => (
                        <li key={page.href}>
                            <Link
                                href={page.href}
                                style={{
                                    fontSize: '0.95rem',
                                    color: 'var(--foreground, #111)',
                                    textDecoration: 'none',
                                    borderBottom: '1px solid transparent',
                                }}
                            >
                                {page.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>

            {/* AntiPages */}
            <section>
                <h2
                    style={{
                        fontSize: '1rem',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        color: 'var(--muted-foreground, #888)',
                        marginBottom: '1rem',
                    }}
                >
                    Servicios por Jurisdicción ({antipages.length})
                </h2>
                <ul
                    style={{
                        listStyle: 'none',
                        margin: 0,
                        padding: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.4rem',
                    }}
                >
                    {antipages.map((page) => (
                        <li key={page.slug}>
                            <Link
                                href={`/${page.slug}`}
                                style={{
                                    fontSize: '0.875rem',
                                    color: 'var(--foreground, #111)',
                                    textDecoration: 'none',
                                }}
                            >
                                {page.hero.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>

            <footer
                style={{
                    marginTop: '4rem',
                    paddingTop: '2rem',
                    borderTop: '1px solid var(--border, #e5e7eb)',
                    fontSize: '0.8rem',
                    color: 'var(--muted-foreground, #999)',
                }}
            >
                <p>
                    <Link href="/sitemap.xml" style={{ color: 'inherit' }}>
                        sitemap.xml
                    </Link>
                    {' · '}
                    <Link href="/robots.txt" style={{ color: 'inherit' }}>
                        robots.txt
                    </Link>
                    {' · '}
                    <Link href="/rss.xml" style={{ color: 'inherit' }}>
                        rss.xml
                    </Link>
                </p>
            </footer>
        </main>
    );
}
