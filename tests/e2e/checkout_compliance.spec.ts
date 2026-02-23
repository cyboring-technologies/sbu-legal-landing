import { test, expect } from '@playwright/test';

test.describe('Checkout Flow Compliance', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display strict execution authorization copy', async ({ page }) => {
    // 1. Open Checkout Modal
    // Finding a button that opens the checkout. The "Execute Document" button in Hero should do it.
    // Use a broad selector for the "Execute Document" text.
    const executeBtn = page
      .getByRole('button', { name: /Execute Document|Get Started|Transact/i })
      .first();

    // If we can't find it easily by text, we fallback to a known CTA class or similar, but text is best for "user-like" testing.
    // In page.tsx: text: "Execute Document"
    await executeBtn.click();

    // 2. Verify Modal Header (Immediate View)
    // "Execution Authorization (One-Shot)"
    const modalHeader = page.getByRole('heading', { name: 'Execution Authorization (One-Shot)' });
    await expect(modalHeader).toBeVisible();

    // 3. Verify Preflight/Analysis Text
    // This requires uploading a file to trigger 'analyzing' state.
    // We create a dummy file in memory or use a buffer.

    const fileInput = page.locator('input[type="file"]');
    await expect(fileInput).toBeVisible();

    // Create a dummy PDF file buffer
    const buffer = Buffer.from(
      '%PDF-1.4\n1 0 obj\n<<\n/Type /Catalog\n/Pages 2 0 R\n>>\nendobj\n2 0 obj\n<<\n/Type /Pages\n/Kids [3 0 R]\n/Count 1\n>>\nendobj\n3 0 obj\n<<\n/Type /Page\n/MediaBox [0 0 595 842]\n>>\nendobj\ntrailer\n<<\n/Root 1 0 R\n>>\nEOF'
    );

    await fileInput.setInputFiles({
      name: 'test-contract.pdf',
      mimeType: 'application/pdf',
      buffer: buffer,
    });

    // 4. Verify Spinner Text "Structural Signal Check (Non-Executing)"
    // The state might transition quickly, so we check if it appears.
    // It might go straight to estimation if the mock analysis is fast.
    // CheckoutFlow.tsx: setStatus('analyzing'); ... await calculatePrice ... setStatus('estimation');
    // It mocks immediately, so it might be very fast.
    // However, if we can catch it, good. If not, we verify the Estimation state text.

    // 5. Verify Estimation State Text
    // "Execution Token Cost (Single-Use)"
    // "Payment is the sole causal act. This action authorizes exactly one irreversible execution."
    // "Transact & Execute (Irreversible)"

    const tokenCostLabel = page.getByText('Execution Token Cost (Single-Use)');
    await expect(tokenCostLabel).toBeVisible({ timeout: 5000 }); // Wait for analysis to finish

    const disclaimer = page.getByText(
      'Payment is the sole causal act. This action authorizes exactly one irreversible execution.'
    );
    await expect(disclaimer).toBeVisible();

    const transactBtn = page.getByRole('button', { name: /Transact & Execute/i });
    await expect(transactBtn).toBeVisible();
  });
});
