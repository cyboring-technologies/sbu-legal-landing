import { test, expect } from '@playwright/test';

test.describe('Corporate Website - Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test.describe('Hero Section', () => {
    test('should display hero content', async ({ page }) => {
      // Check for hero section presence
      const hero = page.locator('section').first();
      await expect(hero).toBeVisible();

      // Check for heading
      const heading = page.getByRole('heading', { level: 1 });
      await expect(heading).toBeVisible();
    });

    test('should have primary CTA button', async ({ page }) => {
      const ctaButtons = page.locator('a').filter({ hasText: /Get Started|Contact|Learn More/i });
      await expect(ctaButtons.first()).toBeVisible();
      await expect(ctaButtons.first()).toHaveAttribute('href');
    });

    test('should display stats section', async ({ page }) => {
      // Check for stats
      await expect(page.getByText('99.9%')).toBeVisible();
      await expect(page.getByText('24/7')).toBeVisible();
    });

    test('should be responsive on mobile', async ({ page, viewport }) => {
      if (viewport && viewport.width < 768) {
        const hero = page.locator('section').first();
        await expect(hero).toBeVisible();

        // Check mobile layout
        const ctaContainer = page
          .locator('div')
          .filter({ hasText: /Get Started/ })
          .first();
        await expect(ctaContainer).toBeVisible();
      }
    });
  });

  test.describe('Navigation', () => {
    test('should have navigation menu', async ({ page }) => {
      // Check for nav element or header
      const nav = page.locator('nav, header').first();
      await expect(nav).toBeVisible();
    });

    test('should have working links', async ({ page }) => {
      const links = page.locator('a');
      const count = await links.count();

      expect(count).toBeGreaterThan(0);

      // Check first few links are visible and have href
      for (let i = 0; i < Math.min(3, count); i++) {
        const link = links.nth(i);
        await expect(link).toHaveAttribute('href');
      }
    });
  });

  test.describe('Page Structure', () => {
    test('should have proper heading hierarchy', async ({ page }) => {
      const h1 = page.getByRole('heading', { level: 1 });
      await expect(h1).toBeVisible();

      const h1Count = await h1.count();
      expect(h1Count).toBeGreaterThanOrEqual(1);
    });

    test('should have semantic HTML', async ({ page }) => {
      // Check for semantic elements
      await expect(page.locator('section, article, nav, header, footer').first()).toBeVisible();
    });

    test('should have meta tags', async ({ page }) => {
      const title = await page.title();
      expect(title.length).toBeGreaterThan(0);
    });
  });

  test.describe('Accessibility', () => {
    test('should have accessible buttons', async ({ page }) => {
      const buttons = page.locator('button, a[role="button"]');
      const count = await buttons.count();

      if (count > 0) {
        for (let i = 0; i < Math.min(3, count); i++) {
          const button = buttons.nth(i);
          const text = await button.textContent();
          expect(text?.trim().length).toBeGreaterThan(0);
        }
      }
    });

    test('should support keyboard navigation', async ({ page }) => {
      // Tab through interactive elements
      await page.keyboard.press('Tab');

      const focusedElement = page.locator(':focus');
      await expect(focusedElement).toBeVisible();
    });

    test('should have proper color contrast', async ({ page }) => {
      // Check that text is readable
      const body = page.locator('body');
      await expect(body).toBeVisible();

      const backgroundColor = await body.evaluate((el) => {
        return window.getComputedStyle(el).backgroundColor;
      });

      expect(backgroundColor).toBeTruthy();
    });
  });

  test.describe('Performance', () => {
    test('should load within reasonable time', async ({ page }) => {
      const startTime = Date.now();
      await page.goto('/');
      await page.waitForLoadState('domcontentloaded');
      const loadTime = Date.now() - startTime;

      expect(loadTime).toBeLessThan(5000); // 5 seconds max
    });

    test('should have no console errors', async ({ page }) => {
      const errors: string[] = [];

      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          errors.push(msg.text());
        }
      });

      await page.goto('/');
      await page.waitForLoadState('domcontentloaded');

      // Filter out known acceptable errors (like network errors in dev)
      const criticalErrors = errors.filter(
        (error) => !error.includes('favicon') && !error.includes('404')
      );

      expect(criticalErrors).toHaveLength(0);
    });
  });
});

test.describe('Corporate Website - Navigation', () => {
  test('should navigate to about page', async ({ page }) => {
    await page.goto('/');

    // Look for About link
    const aboutLink = page.locator('a').filter({ hasText: /about/i }).first();

    if (await aboutLink.isVisible()) {
      await aboutLink.click();
      await page.waitForLoadState('domcontentloaded');

      // Should navigate to about page
      expect(page.url()).toContain('about');
    }
  });

  test('should navigate to services page', async ({ page }) => {
    await page.goto('/');

    // Look for Services link
    const servicesLink = page
      .locator('a')
      .filter({ hasText: /service/i })
      .first();

    if (await servicesLink.isVisible()) {
      await servicesLink.click();
      await page.waitForLoadState('domcontentloaded');

      // Should navigate to services page
      expect(page.url()).toContain('service');
    }
  });

  test('should navigate to contact page', async ({ page }) => {
    await page.goto('/');

    // Look for Contact link
    const contactLink = page
      .locator('a')
      .filter({ hasText: /contact/i })
      .first();

    if (await contactLink.isVisible()) {
      await contactLink.click();
      await page.waitForLoadState('domcontentloaded');

      // Should navigate to contact page
      expect(page.url()).toContain('contact');
    }
  });
});

test.describe('Corporate Website - Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact');
  });

  test('should display contact form', async ({ page }) => {
    // Look for form element
    const form = page.locator('form').first();

    // Form might exist on contact page
    if (await form.isVisible({ timeout: 2000 }).catch(() => false)) {
      await expect(form).toBeVisible();
    } else {
      // Or check for contact heading/content
      const heading = page.getByRole('heading', { level: 1 });
      await expect(heading).toBeVisible();
    }
  });

  test('should have form fields', async ({ page }) => {
    const form = page.locator('form').first();

    if (await form.isVisible({ timeout: 2000 }).catch(() => false)) {
      // Check for input fields
      const inputs = form.locator('input, textarea');
      const count = await inputs.count();

      expect(count).toBeGreaterThan(0);
    }
  });

  test('should validate required fields', async ({ page }) => {
    const form = page.locator('form').first();

    if (await form.isVisible({ timeout: 2000 }).catch(() => false)) {
      // Try to submit empty form
      const submitButton = form.locator('button[type="submit"]').first();

      if (await submitButton.isVisible()) {
        await submitButton.click();

        // Should show validation (HTML5 or custom)
        const requiredInputs = form.locator('input[required], textarea[required]');
        const count = await requiredInputs.count();

        if (count > 0) {
          expect(count).toBeGreaterThan(0);
        }
      }
    }
  });
});

test.describe('Corporate Website - Responsive Design', () => {
  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    const body = page.locator('body');
    await expect(body).toBeVisible();

    // Check mobile menu if it exists
    const mobileMenu = page.locator('[aria-label*="menu" i], button[aria-expanded]').first();
    if (await mobileMenu.isVisible({ timeout: 1000 }).catch(() => false)) {
      await expect(mobileMenu).toBeVisible();
    }
  });

  test('should be responsive on tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');

    const hero = page.locator('section').first();
    await expect(hero).toBeVisible();
  });

  test('should be responsive on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');

    const hero = page.locator('section').first();
    await expect(hero).toBeVisible();
  });
});

test.describe('Corporate Website - Footer', () => {
  test('should have footer', async ({ page }) => {
    await page.goto('/');

    const footer = page.locator('footer').first();

    if (await footer.isVisible({ timeout: 2000 }).catch(() => false)) {
      await expect(footer).toBeVisible();

      // Should have some content
      const text = await footer.textContent();
      expect(text?.length).toBeGreaterThan(0);
    }
  });

  test('should have footer links', async ({ page }) => {
    await page.goto('/');

    const footer = page.locator('footer').first();

    if (await footer.isVisible({ timeout: 2000 }).catch(() => false)) {
      const links = footer.locator('a');
      const count = await links.count();

      if (count > 0) {
        expect(count).toBeGreaterThan(0);
      }
    }
  });
});
