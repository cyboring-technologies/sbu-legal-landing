'use client';

import React from 'react';
import { CTAButton } from './CTAButtons';
import antipages from '../data/antipages.json';

export type AntiPageData = {
  slug: string;
  service: string;
  jurisdiction: string;
  variant: string;
  audience: string;
  seo?: {
    title?: string;
    description?: string;
    canonical?: string;
  };
  hero: { title: string };
  context: { title: string; body: string };
  scope: { title: string; body: string };
  irreversibility: { title: string; body: string };
  process: { title: string; body: string };
  trust: { title: string; body: string };
  cta: { label: string };
};

export type AntiPageProps = {
  data: AntiPageData;
  locale: string;
};

const JURISDICTION_LABELS: Record<string, string> = {
  JUR_1: 'México',
  JUR_2: 'Colombia',
  JUR_3: 'Chile',
};

export default function AntiPage({ data }: AntiPageProps) {
  const jurisdictionLabel = JURISDICTION_LABELS[data.jurisdiction] || data.jurisdiction;

  const replaceLabel = (text: string) => {
    return text.replace(new RegExp(data.jurisdiction, 'g'), jurisdictionLabel);
  };

  const relatedPages = antipages
    .filter(
      (p) =>
        p.jurisdiction === data.jurisdiction &&
        p.service !== data.service &&
        p.variant === data.variant // Ensure we match the same variant context to avoid duplicate links of same semantic service
    )
    // Create unique list by service just to be sure we are showing distinct procedures
    .filter((v, i, a) => a.findIndex(t => (t.service === v.service)) === i)
    .slice(0, 5);

  return (
    <main className="prose dark:prose-invert max-w-3xl mx-auto px-6 py-12">
      <section id="hero">
        <h1>{replaceLabel(data.hero.title)}</h1>
      </section>

      <section id="context">
        <h2>{replaceLabel(data.context.title)}</h2>
        <p>
          Este servicio permite generar el escrito legal necesario para <strong>{data.service} en {jurisdictionLabel}</strong>.
        </p>
        <p>
          El documento se produce automáticamente a partir del material que usted proporcione y se ajusta a los requisitos formales aplicables dentro de esta jurisdicción.
        </p>
        <p>El documento puede utilizarse en situaciones como:</p>
        <ul>
          <li>Escrito de {data.service.toLowerCase()}</li>
          <li>Formato de {data.service.toLowerCase()}</li>
          <li>Modelo de {data.service.toLowerCase()}</li>
          <li>Solicitud de {data.service.toLowerCase()} ante tribunal</li>
        </ul>
      </section>

      <section id="execution-scope">
        <h2>{replaceLabel(data.scope.title)}</h2>
        <p>La ejecución produce un único documento legal listo para revisión y edición.</p>
        <p>
          El contenido se genera mediante un sistema automatizado diseñado para estructurar escritos jurídicos conforme a parámetros procesales previamente definidos para <strong>{jurisdictionLabel}</strong>. Costo típico de ejecución: $15 – $35 USD según la extensión del documento proporcionado.
        </p>
      </section>

      <section id="irreversibility-statement">
        <h2>{replaceLabel(data.irreversibility.title)}</h2>
        <p>Esta ejecución ocurre una sola vez.</p>
        <p>
          Una vez generado y entregado el documento final, todos los datos utilizados durante la sesión se destruyen permanentemente.
        </p>
        <p>
          El sistema no conserva archivos, cuentas, historiales ni copias del documento generado.
        </p>
      </section>

      <section id="process-summary">
        <h2>{replaceLabel(data.process.title)}</h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>Cargue el documento base relacionado con su proceso.</li>
          <li>Revise la información antes de autorizar la ejecución.</li>
          <li>El sistema genera el escrito jurídico correspondiente.</li>
          <li>Descargue el documento final.</li>
          <li>La sesión se destruye automáticamente después de la entrega.</li>
        </ol>
        <div className="video-container">
          <iframe
            width="640"
            height="360"
            src="https://www.youtube.com/embed/zDObk6cPUdc"
            title="Ejemplo de ejecución del motor"
            frameBorder="0"
            allowFullScreen
          />
        </div>
      </section>

      <section id="trust-guarantees">
        <h2>{replaceLabel(data.trust.title)}</h2>
        <p>
          La generación del documento se realiza mediante un sistema automatizado diseñado para producir textos jurídicos consistentes y verificables.
        </p>
        <p>
          El proceso no depende de intervención humana ni implica almacenamiento posterior de la información utilizada durante la ejecución.
        </p>
      </section>

      {relatedPages.length > 0 && (
        <section id="related-procedures" className="mt-12 bg-muted/10 p-6 rounded-lg border border-border">
          <h2 className="text-xl font-bold mb-4">Procedimientos Relacionados</h2>
          <ul className="space-y-2">
            {relatedPages.map((page) => (
              <li key={page.slug}>
                <a href={`/${page.slug}`} className="text-primary hover:underline font-medium">
                  {page.service} en {jurisdictionLabel}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section id="cta-block" className="mt-12 flex justify-center">
        <CTAButton ctaType="cta-1" variant="primary" size="lg" icon={true}>
          {replaceLabel(data.cta.label)}
        </CTAButton>
      </section>
    </main>
  );
}
