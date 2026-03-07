import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Nuestros Servicios | Documentos.legal',
    description: 'Genere sus escritos jurídicos listos para presentar en minutos. Ejecución única. Sin cuentas. Sin almacenamiento.',
};

export default function OurServicesLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
