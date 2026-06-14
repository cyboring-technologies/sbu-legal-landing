import { expect, test } from '@playwright/test';

test.describe('Documentos.legal archive', () => {
  test('publishes the institutional archive without operational actions', async ({ page }) => {
    await page.goto('/');

    await expect(
      page.getByRole('heading', { level: 1, name: 'Documentos.legal está archivado' })
    ).toBeVisible();
    await expect(page.getByText(/ya no ofrece generación de documentos legales/i)).toBeVisible();

    await expect(page.locator('form')).toHaveCount(0);
    await expect(page.locator('input[type="file"]')).toHaveCount(0);
    await expect(page.locator('a[href*="engine"]')).toHaveCount(0);
  });

  test('marks operational routes as retired', async ({ page }) => {
    for (const path of ['/engine/', '/prepare/', '/terminal/']) {
      await page.goto(path);
      await expect(page.getByText(/archivado/i).first()).toBeVisible();
      await expect(page.locator('form')).toHaveCount(0);
    }
  });
});
