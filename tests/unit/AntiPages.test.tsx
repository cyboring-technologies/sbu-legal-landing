import React from 'react';
import { render } from '@testing-library/react';
import AntiPage from '../../src/components/AntiPage';
import data from '../../src/data/antipages.json';
import { validateAntiPages } from '../../src/lib/antiPageSchema';

const mockData = {
  slug: 'test-slug',
  service: 'Test Service',
  jurisdiction: 'JUR_1',
  variant: 'V1',
  audience: 'Direct',
  hero: { title: 'Test Service in JUR_1' },
  context: { title: 'Context', body: 'Body context' },
  scope: { title: 'Scope', body: 'Body scope' },
  irreversibility: { title: 'Irreversibility', body: 'Body irreversibility' },
  process: { title: 'Process', body: 'Process body' },
  trust: { title: 'Trust', body: 'Trust body' },
  cta: { label: 'Start execution' },
} as any;

describe('AntiPages Structural Audit', () => {
  it('matches the structural DOM snapshot', () => {
    const { container } = render(<AntiPage data={mockData} />);
    expect(container).toMatchSnapshot();
  });

  it('renders sections in the EXACT required order', () => {
    const { container } = render(<AntiPage data={mockData} />);
    const sections = Array.from(container.querySelectorAll('section'));
    const sectionIds = sections.map((s) => s.id);
    const expectedOrder = [
      'hero',
      'context',
      'execution-scope',
      'irreversibility-statement',
      'process-summary',
      'trust-guarantees',
      'cta-block',
    ];
    expect(sectionIds).toEqual(expectedOrder);
  });
});

describe('AntiPages Data Layer', () => {
  it('validates antipages.json against schema without extra fields or HTML', () => {
    const validated = validateAntiPages(data);
    expect(validated.length).toBe(24);

    validated.forEach((page) => {
      expect(page.jurisdiction).toBe('JUR_1');
      expect(['V1', 'V2', 'V3']).toContain(page.variant);
      const str = JSON.stringify(page);
      expect(str).not.toMatch(/<|class=|style=/i);

      // Check H1 contract
      const expectedH1 = `${page.service} en ${page.jurisdiction}`;
      const expectedH1Eng = `${page.service} in ${page.jurisdiction}`;
      expect(page.hero.title === expectedH1 || page.hero.title === expectedH1Eng).toBe(true);
    });
  });
});
