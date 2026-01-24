'use client';

import React, { useState, use } from 'react';

/**
 * Login Holding Page
 * 
 * Temporary page to replace 404 on /login.
 * Designed to be easily removable.
 * 
 * Features:
 * - Single screen, no scroll.
 * - Simple email capture (mock).
 * - Bi-lingual support (EN/ES) via internal dictionary.
 */

interface PageProps {
    params: { locale: string };
}

export default function LoginPage({ params }: PageProps) {
    const { locale } = params;
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

    const content = {
        es: {
            headline: 'Acceso en activación',
            subtext: 'Estamos habilitando el sistema de acceso. Estará disponible en breve.',
            placeholder: 'tu@email.com',
            button: 'Notifícame cuando esté listo',
            buttonSuccess: '¡Te avisaremos!',
            footer: 'Infraestructura segura · Cloud-Agnostic · Sin lock-in',
            alt: 'Logotipo',
        },
        en: {
            headline: 'Access Activating',
            subtext: 'We are enabling the access system. It will be available shortly.',
            placeholder: 'you@email.com',
            button: 'Notify me when ready',
            buttonSuccess: 'We will notify you!',
            footer: 'Secure Infrastructure · Cloud-Agnostic · No lock-in',
            alt: 'Logo',
        }
    };

    const t = content[locale as keyof typeof content] || content.es;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus('submitting');

        try {
            // Fire and forget - don't block user experience on logging success
            // We still mock the delay for UX "intent", but trigger the log immediately
            fetch('/api/log-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            }).catch(err => console.error('Failed to log email:', err));

            // Mock network delay for "Sobriedad" and "Control" feel
            setTimeout(() => {
                setStatus('success');
                setEmail('');
            }, 800);
        } catch (error) {
            // Fallback -> still show success to user to maintain trust/conversion flow
            setStatus('success');
        }
    };

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background text-foreground p-4">
            {/* Main Container - Centered */}
            <div className="w-full max-w-md mx-auto text-center space-y-8 animate-in fade-in zoom-in duration-500">

                {/* Header Section */}
                <div className="space-y-4">
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                        {t.headline}
                    </h1>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                        {t.subtext}
                    </p>
                </div>

                {/* Action Section */}
                <div className="pt-2">
                    {status === 'success' ? (
                        <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 font-medium animate-in fade-in slide-in-from-bottom-2">
                            {t.buttonSuccess}
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                            <input
                                type="email"
                                placeholder={t.placeholder}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={status === 'submitting'}
                                className="w-full px-4 py-3 rounded-lg border border-input bg-background/50 focus:bg-background transition-all duration-200 outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
                                required
                            />
                            <button
                                type="button"
                                onClick={(e) => handleSubmit(e as any)}
                                disabled={status === 'submitting' || !email}
                                className="w-full px-4 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none"
                            >
                                {status === 'submitting' ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <span className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
                                    </span>
                                ) : (
                                    t.button
                                )}
                            </button>
                        </form>
                    )}
                </div>

                {/* Footer Trust Signal */}
                <div className="pt-12">
                    <p className="text-xs text-muted-foreground/60 font-medium uppercase tracking-wider">
                        {t.footer}
                    </p>
                </div>

            </div>
        </div>
    );
}
