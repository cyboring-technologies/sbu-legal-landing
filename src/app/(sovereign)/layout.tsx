import React from 'react';
import './sovereign.css';

export const metadata = {
    title: 'Draft Generator | SBU-Legal',
    description: 'Legal Document Processing',
};

export default function SovereignLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="h-full" suppressHydrationWarning>
            <head>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            (function() {
                                try {
                                    const urlParams = new URLSearchParams(window.location.search);
                                    let theme = urlParams.get('theme');
                                    if (!theme) {
                                        theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                                    }
                                    if (theme === 'dark') {
                                        document.documentElement.classList.add('dark');
                                    } else {
                                        document.documentElement.classList.remove('dark');
                                    }
                                } catch (e) {}
                            })();
                        `,
                    }}
                />
            </head>
            <body className="h-full overflow-hidden">
                {children}
            </body>
        </html>
    );
}
