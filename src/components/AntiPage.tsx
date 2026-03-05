'use client';

import React from 'react';
import { CTAButton } from './CTAButtons';

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

export default function AntiPage({ data }: AntiPageProps) {
  return (
    <main className="prose dark:prose-invert max-w-3xl mx-auto px-6 py-12">
      <section id="hero">
        <h1>{data.hero.title}</h1>
      </section>

      <section id="context">
        <h2>{data.context.title}</h2>
        <p>{data.context.body}</p>
      </section>

      <section id="execution-scope">
        <h2>{data.scope.title}</h2>
        <p>{data.scope.body}</p>
      </section>

      <section id="irreversibility-statement">
        <h2>{data.irreversibility.title}</h2>
        <p>{data.irreversibility.body}</p>
      </section>

      <section id="process-summary">
        <h2>{data.process.title}</h2>
        <p className="whitespace-pre-line">{data.process.body}</p>
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
        <h2>{data.trust.title}</h2>
        <p>{data.trust.body}</p>
      </section>

      <section id="cta-block" className="mt-12 flex justify-center">
        <CTAButton ctaType="cta-1" variant="primary" size="lg" icon={true}>
          {data.cta.label}
        </CTAButton>
      </section>
    </main>
  );
}
