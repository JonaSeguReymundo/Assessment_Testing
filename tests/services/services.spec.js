const { test, expect } = require('@playwright/test');

test.describe('Services - Gestión de servicios', () => {

  test('Acceso a la sección de servicios', async ({ page }) => {

    // =========================
    // LOGIN 
    // =========================
    await page.goto('https://altempo.dev/signin');

    await page.getByLabel(/username|email/i).fill('2346jona');
    await page.getByLabel(/password/i).fill('2004Jh$r2004');

    const loginButton = page.getByRole('button', { name: /log in/i });
    await expect(loginButton).toBeEnabled();

    await Promise.all([
      page.waitForURL(/talent-hunter|dashboard|services/i),
      loginButton.click(),
    ]);

    await expect(page).not.toHaveURL(/signin/i);

    await page.getByRole('link', { name: /servicios|services/i }).click();

    // =========================
    // BASICS VALIDATION
    // =========================
    await expect(
      page.getByRole('heading', { name: /servicios|mis servicios/i })
    ).toBeVisible();

    await expect(
      page.getByRole('button', { name: /crear|nuevo/i })
    ).toBeVisible();
  });

});
