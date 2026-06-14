import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { ArchiveLanding, ArchivedRouteNotice } from '../../src/components/archive/ArchiveLanding';

describe('archived public surface', () => {
  it('states the archived status and absence of active services', () => {
    render(<ArchiveLanding />);

    expect(
      screen.getByRole('heading', { level: 1, name: 'Documentos.legal está archivado' })
    ).toBeInTheDocument();
    expect(screen.getByText(/ya no ofrece generación de documentos legales/i)).toBeInTheDocument();
    expect(screen.queryByText(/comprar|iniciar ejecución|subir archivo/i)).not.toBeInTheDocument();
  });

  it('renders a neutral notice for retired routes', () => {
    render(<ArchivedRouteNotice />);

    expect(screen.getByText('Ruta retirada')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Ver el registro institucional' })).toHaveAttribute(
      'href',
      '/'
    );
  });
});
