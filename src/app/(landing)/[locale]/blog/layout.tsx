import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Blog | Documentos.legal',
    description: 'Genere su conocimiento jurídico y documentos listos para presentar en minutos. Ejecución única. Sin cuentas. Sin almacenamiento.',
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
