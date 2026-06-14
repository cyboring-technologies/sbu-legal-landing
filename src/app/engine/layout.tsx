import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ruta archivada | Documentos.legal',
  description: 'Ruta histórica retirada de Documentos.legal.',
  robots: { index: false, follow: false, nocache: true },
};

export default function EngineLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
