export default function EnginePage() {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        padding: '2rem',
        background: '#020617',
        color: '#e2e8f0',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <div style={{ maxWidth: '40rem' }}>
        <p style={{ color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
          Ruta retirada
        </p>
        <h1>Documentos.legal está archivado</h1>
        <p style={{ color: '#cbd5e1', lineHeight: 1.7 }}>
          Esta ruta ya no inicia procesos ni ofrece servicios. Consulte el registro institucional en
          documentos.legal.
        </p>
        <a style={{ color: '#e2e8f0' }} href="/">
          Volver al archivo
        </a>
      </div>
    </main>
  );
}
