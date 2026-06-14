export default function PreparePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 p-8 text-slate-100">
      <div className="max-w-2xl">
        <p className="uppercase tracking-widest text-slate-400">Ruta retirada</p>
        <h1 className="mt-4 text-4xl font-bold">Documentos.legal está archivado</h1>
        <p className="mt-5 leading-7 text-slate-300">
          Esta ruta ya no inicia procesos ni ofrece servicios.
        </p>
        <a className="mt-8 inline-block underline" href="/">
          Volver al archivo
        </a>
      </div>
    </main>
  );
}
