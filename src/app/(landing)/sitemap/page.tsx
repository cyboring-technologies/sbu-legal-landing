import type { Metadata } from 'next';
import { ArchivedRouteNotice } from '../../../components/archive/ArchiveLanding';

export const metadata: Metadata = {
  title: 'Ruta archivada | Documentos.legal',
  robots: { index: false, follow: false, nocache: true },
};

export default function SitemapPage() {
  return <ArchivedRouteNotice />;
}
