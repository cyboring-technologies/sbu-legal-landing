'use client';

/**
 * SOVEREIGN ENGINE ENTRY POINT — Static Shell
 *
 * Required by Next.js `output: 'export'` to own the `/engine` route.
 * Without this file, Next.js falls through to `/(landing)/[locale]/page`
 * and fails: "Page is missing param '/engine' in generateStaticParams()".
 *
 * In production, the CDN/gateway serves the actual Sovereign Engine SPA
 * at this path before Next.js is ever consulted. This shell is a safety
 * net and will never render in a properly routed environment.
 *
 * In development, CTAs open the engine directly at its wrangler dev port
 * (NEXT_PUBLIC_ENGINE_URL), so this page is also never reached.
 */

export default function EnginePage() {
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                background: '#0f172a',
                color: '#94a3b8',
                fontFamily: 'sans-serif',
                fontSize: '14px',
            }}
        >
            Initializing…
        </div>
    );
}
