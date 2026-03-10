'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useTheme } from 'next-themes';
import { X, Mail, MessageCircle } from 'lucide-react';
import { buildEngineURL } from '../../../config/runtimeOrigins';
import { useLocale } from 'next-intl';

export default function ClientTerminal() {
    const { theme, resolvedTheme } = useTheme();
    const locale = useLocale();
    const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);

    const closeModal = useCallback(() => setIsSupportModalOpen(false), []);

    // Close on ESC
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeModal();
        };
        if (isSupportModalOpen) {
            window.addEventListener('keydown', handleEsc);
        }
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isSupportModalOpen, closeModal]);

    return (
        <div className="min-h-[100dvh] bg-background text-foreground flex flex-col justify-between items-center px-4 py-8 md:py-16 selection:bg-primary/20 relative">

            {/* Logo / Header - Matches Engine header positioning exactly */}
            <header className="absolute top-2 left-2 flex items-center gap-[0.5rem] font-logo font-bold">
                <div className="relative w-[27px] h-[27px] shrink-0">
                    <img src="/logo-light-mode.svg" alt="Documentos.legal Logo" width="27" height="27" className="absolute inset-0 block dark:hidden" />
                    <img src="/logo-dark-mode.svg" alt="Documentos.legal Logo" width="27" height="27" className="absolute inset-0 hidden dark:block" />
                </div>
                <span className="text-[1.275rem] font-bold tracking-[-0.02em]">
                    Documentos<span className="text-inherit font-semibold">.legal</span>
                </span>
            </header>

            {/* Top Container: Text Content */}
            <div className="w-full max-w-3xl mx-auto flex flex-col items-center text-center space-y-6 mt-16 md:mt-32">

                {/* Block 1 — Confirmación seca */}
                <div className="space-y-4">
                    <h1 className="font-logo text-3xl md:text-5xl font-extrabold tracking-tight text-foreground">
                        El archivo ha sido descargado.
                    </h1>
                    <p className="text-xl md:text-2xl text-foreground font-medium">
                        No existe copia en el sistema.
                    </p>
                </div>

                {/* Block 2 — Nota técnica breve */}
                <div className="pt-2">
                    <p className="text-sm md:text-base text-muted-foreground">
                        Si no lo encuentra, revise el gestor de descargas del navegador.
                    </p>
                </div>
            </div>

            {/* Block 3 — Espacio vacío dominante >= 50% viewport */}
            <div className="flex-grow min-h-[50vh] w-full" aria-hidden="true" />

            {/* Block 4 — Único bloque inferior */}
            <div className="w-full max-w-xs md:max-w-sm mx-auto flex flex-col items-center gap-4 mb-8">
                <div className="w-full flex flex-col gap-4">
                    <button
                        onClick={() => {
                            const activeTheme = resolvedTheme || theme || 'light';
                            const url = buildEngineURL(locale, activeTheme);
                            window.location.assign(url);
                        }}
                        className="w-full inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-ring shadow-lg hover:shadow-xl hover:scale-95 px-8 py-4 text-lg"
                    >
                        Iniciar nueva ejecución
                    </button>

                    <button
                        onClick={() => {
                            try {
                                window.close();
                                setTimeout(() => {
                                    if (!window.closed) {
                                        window.location.assign('/');
                                    }
                                }, 300);
                            } catch (e) {
                                window.location.assign('/');
                            }
                        }}
                        className="w-full inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 border-2 border-border text-foreground hover:border-primary hover:text-primary focus:ring-ring px-6 py-3 text-base"
                    >
                        Cerrar
                    </button>

                    {/* Micro-link Support/Refunds */}
                    <div className="pt-2 text-center">
                        <button
                            onClick={() => setIsSupportModalOpen(true)}
                            className="text-xs text-muted-foreground hover:text-foreground transition-colors focus:outline-none cursor-pointer"
                        >
                            ¿Necesita ayuda o un reembolso?
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal - Local Component */}
            {isSupportModalOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
                    onClick={closeModal}
                >
                    <div
                        className="bg-background border border-border rounded-lg shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-6 space-y-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-bold font-logo text-foreground">
                                    Soporte y reembolsos
                                </h2>
                                <button
                                    onClick={closeModal}
                                    className="text-muted-foreground hover:text-foreground transition-colors p-1"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="text-sm text-foreground space-y-4 leading-relaxed">
                                <p>
                                    Si tuvo un problema técnico durante la ejecución,<br />
                                    si el archivo no cumple sus expectativas,<br />
                                    o si desea solicitar un reembolso,
                                </p>
                                <p className="font-medium text-foreground">
                                    contáctenos directamente.
                                </p>
                                <p className="text-muted-foreground italic">
                                    Resolvemos cada caso de forma directa. No es necesario iniciar una disputa bancaria.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-3 pt-2">
                                <a
                                    href="mailto:hello@documentos.legal"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-md border border-border text-sm font-medium hover:bg-muted transition-colors text-foreground"
                                >
                                    <Mail className="w-4 h-4" />
                                    hello@documentos.legal
                                </a>
                                <a
                                    href="https://wa.me/50687504770"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-md border border-border text-sm font-medium hover:bg-muted transition-colors text-foreground"
                                >
                                    <MessageCircle className="w-4 h-4 text-green-600 dark:text-green-500" />
                                    WhatsApp
                                </a>
                            </div>

                            <div className="pt-2">
                                <button
                                    onClick={closeModal}
                                    className="w-full py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    Cerrar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}
