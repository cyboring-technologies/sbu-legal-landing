import type { Metadata } from 'next';
import ClientTerminal from './ClientTerminal';

export const metadata: Metadata = {
    title: 'Terminal | Documentos.legal',
    robots: {
        index: false,
        follow: false,
    },
};

export default function TerminalPage() {
    return <ClientTerminal />;
}
