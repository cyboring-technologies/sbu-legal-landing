import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Preguntas Frecuentes | Documentos.legal',
    description: 'Genere sus escritos y resolver dudas legales listos para presentar en minutos. Ejecución única. Sin cuentas. Sin almacenamiento.',
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
