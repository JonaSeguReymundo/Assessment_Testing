const { test, expect } = require('@playwright/test');

test.describe('Onboarding - Plataforma Altempo', () => {

  test('Onboarding visible correctamente tras login exitoso (Talent Hunter)', async ({ page }) => {

    // =========================
    // STEP 1: LOGIN 
    // =========================
    await page.goto('https://altempo.dev/signin');

    await page.locator('input').first().fill('2346jona');
    await page.locator('input[type="password"]').fill('2004Jh$r2004');

    await page.locator('button[type="submit"]').click();

    await expect(page).toHaveURL(/talent-hunter/i);

    // =========================
    // STEP 2: ONBOARDING VALIDATIONS
    // =========================

    await expect(
      page.getByRole('heading', { name: /bienvenid@/i })
    ).toBeVisible();

    // Sidebar 
    await expect(
      page.locator('aside')
    ).toBeVisible();

    await expect(
      page.getByText(/nuestra selección para eventos/i)
    ).toBeVisible();

    // Carrusel 
    await expect(
      page.locator('.swiper')
    ).toBeVisible();

    await expect(
      page.getByText(/ordenes activas/i)
    ).toBeVisible();

    await expect(
      page.getByText(/servicios que necesitas/i)
    ).toBeVisible();
  });

});
