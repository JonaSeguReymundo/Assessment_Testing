const { test, expect } = require('@playwright/test');

test.describe('Gestión y edición de disponibilidad - Plataforma Altempo', () => {

  test('Estado sin disponibilidad implementada no rompe la aplicación', async ({ page }) => {

    // =========================
    // LOGIN
    // =========================
    await page.goto('https://altempo.dev/signin');

    await page.locator('input').first().fill('2346jona');
    await page.locator('input[type="password"]').fill('2004Jh$r2004');
    await page.getByRole('button', { name: /log in/i }).click();

    await expect(page).toHaveURL(/talent-hunter/i);
    await expect(
      page.getByRole('heading', { name: /bienvenid/i })
    ).toBeVisible();

    // =========================
    // PROFILE ACCESS
    // =========================
    await page.getByRole('link', { name: /my profile/i }).click();
    await expect(page).toHaveURL(/profile/i);

    // =========================
    // AVAILABILITY SECTION
    // =========================

    await expect(
      page.getByText(/disponibilidad/i)
    ).toHaveCount(0);

    // =========================
    // VALIDATION 
    // =========================
    await page.reload();

    await expect(
      page.getByRole('heading', { name: /jonatan segura/i })
    ).toBeVisible();

  });

});
