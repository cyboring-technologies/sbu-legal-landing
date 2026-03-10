import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import ClientTerminal from './ClientTerminal';

export const metadata: Metadata = {
    title: 'Terminal | Documentos.legal',
    robots: {
        index: false,
        follow: false,
    },
};

export default async function TerminalPage() {
    const locale = 'es';
    // Enable static rendering for this route
    setRequestLocale(locale);
    
    const messages = await getMessages({ locale });

    return (
        <NextIntlClientProvider locale={locale} messages={messages}>
            <ClientTerminal />
        </NextIntlClientProvider>
    );
}
