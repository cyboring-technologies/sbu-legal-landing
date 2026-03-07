import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Sobre Nosotros | Documentos.legal',
    description: 'Genere su infraestructura legal lista para presentar en minutos. Ejecución única. Sin cuentas. Sin almacenamiento.',
};

export default function AboutUsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
