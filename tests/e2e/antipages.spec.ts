import { test, expect } from '@playwright/test';

const urls = [
  '/es/iniciar-proceso-jur-1',
  '/es/contestar-oponerse-jur-1-v2',
  '/es/solicitar-medida-jur-1-v3',
];

for (const url of urls) {
  test(`Auditor E2E for AntiPage: ${url}`, async ({ page }) => {
    await page.goto(url);

    // Validar H1 (sólo un H1)
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBe(1);

    const h1Text = await page.locator('h1').innerText();
    expect(h1Text).toMatch(/(en|in)\s+JUR_1/i);

    // Validar bloques obligatorios
    const sectionIds = await page.evaluate(() =>
      Array.from(document.querySelectorAll('section')).map((s) => s.id)
    );
    expect(sectionIds).toEqual([
      'hero',
      'context',
      'execution-scope',
      'irreversibility-statement',
      'process-summary',
      'trust-guarantees',
      'cta-block',
    ]);

    // Validar CTA principal (único en el bloque)
    const ctaLinks = await page.locator('section#cta-block a').count();
    expect(ctaLinks).toBe(1);

    // Validar ausencia de forms y capturas de email
    const formCount = await page.locator('form').count();
    expect(formCount).toBe(0);

    const emailInputs = await page.locator('input[type="email"]').count();
    expect(emailInputs).toBe(0);

    // Validar ausencia de Stripe u otro pago directo
    const stripeIframes = await page.locator('iframe[src*="stripe"]').count();
    expect(stripeIframes).toBe(0);

    // Meta tags
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(canonical).toBeTruthy();
    expect(canonical).toContain(url.replace('/es/', ''));

    const title = await page.title();
    expect(title).toContain('| SBU-Legal');

    // Validar que no hay contenedores de persistencia o dashboards engañosos
    const persistWords = await page.evaluate(() => {
      const h = document.body.innerText.toLowerCase();
      return (
        h.includes('dashboard') || h.includes('suscripción') || h.includes('volver al proyecto')
      );
    });
    expect(persistWords).toBe(false);
  });
}
