import Link from 'next/link';

const archivedAt = '14 de junio de 2026';

export function ArchiveLanding() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-slate-950 px-6 py-16 text-slate-100 sm:px-10">
      <div className="mx-auto max-w-3xl min-w-0">
        <p className="mb-8 text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
          Archivo institucional
        </p>

        <h1 className="font-plex text-3xl font-bold leading-tight break-words sm:text-6xl">
          Documentos.legal está archivado
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
          Documentos.legal ya no ofrece generación de documentos legales ni mantiene una operación
          comercial activa. Esta página conserva únicamente un registro institucional del proyecto.
        </p>

        <div className="mt-14 space-y-12 border-t border-slate-800 pt-12">
          <section aria-labelledby="estado">
            <h2 id="estado" className="font-plex text-2xl font-semibold">
              Estado
            </h2>
            <p className="mt-3 leading-7 text-slate-300">
              El producto fue retirado de operación pública el {archivedAt}. No hay compras, cargas
              de archivos, procesamiento documental ni entregas disponibles desde este sitio.
            </p>
          </section>

          <section aria-labelledby="que-fue">
            <h2 id="que-fue" className="font-plex text-2xl font-semibold">
              Qué fue
            </h2>
            <p className="mt-3 leading-7 text-slate-300">
              Fue una iniciativa experimental de Cyboring Technologies LLC orientada a investigar
              flujos automatizados para documentos legales.
            </p>
          </section>

          <section aria-labelledby="que-no-es">
            <h2 id="que-no-es" className="font-plex text-2xl font-semibold">
              Qué no es
            </h2>
            <p className="mt-3 leading-7 text-slate-300">
              Este sitio no es un bufete de abogados, no presta asesoría legal, no representa a
              personas ante autoridades y no ofrece documentos aptos para uso en procedimientos.
              El material histórico no debe utilizarse como sustituto de asesoría profesional.
            </p>
          </section>

          <section aria-labelledby="cyboring">
            <h2 id="cyboring" className="font-plex text-2xl font-semibold">
              Estado dentro de Cyboring
            </h2>
            <p className="mt-3 leading-7 text-slate-300">
              La iniciativa se conserva como referencia interna de investigación. Cyboring
              Technologies LLC no anuncia continuidad, soporte ni reactivación de este producto.
            </p>
            <a
              className="mt-5 inline-block text-sm font-semibold text-slate-200 underline decoration-slate-600 underline-offset-4 hover:decoration-slate-200"
              href="https://cyboring.com"
              rel="noreferrer"
            >
              Cyboring Technologies LLC
            </a>
          </section>

          <section id="legal" aria-labelledby="condicion-legal">
            <h2 id="condicion-legal" className="font-plex text-2xl font-semibold">
              Condición legal y privacidad
            </h2>
            <p className="mt-3 leading-7 text-slate-300">
              Esta superficie archivada es exclusivamente informativa y se ofrece sin promesas de
              disponibilidad, exactitud o idoneidad. No solicita documentos ni datos para procesar
              servicios. El alojamiento puede conservar registros técnicos mínimos de acceso por
              razones de seguridad y operación.
            </p>
          </section>
        </div>

        <footer className="mt-16 border-t border-slate-800 pt-8 text-sm text-slate-500">
          <p>Documentos.legal · Archivo institucional de Cyboring Technologies LLC</p>
          <Link className="mt-2 inline-block underline underline-offset-4" href="/">
            documentos.legal
          </Link>
        </footer>
      </div>
    </main>
  );
}

export function ArchivedRouteNotice() {
  return (
    <main className="flex min-h-screen items-center overflow-x-hidden bg-slate-950 px-6 py-16 text-slate-100">
      <div className="mx-auto w-full max-w-2xl min-w-0">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
          Ruta retirada
        </p>
        <h1 className="mt-5 font-plex text-3xl font-bold leading-tight break-words sm:text-4xl">
          Documentos.legal está archivado
        </h1>
        <p className="mt-5 leading-7 text-slate-300">
          Esta ruta pertenecía a una operación que ya no está disponible. No se ofrecen servicios
          legales ni procesamiento de documentos.
        </p>
        <Link
          className="mt-8 inline-block text-sm font-semibold underline decoration-slate-600 underline-offset-4 hover:decoration-slate-200"
          href="/"
        >
          Ver el registro institucional
        </Link>
      </div>
    </main>
  );
}
