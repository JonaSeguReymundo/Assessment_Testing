const { test, expect } = require('@playwright/test');

test.describe('Profile - Plataforma Altempo', () => {

  test('Visualización correcta del perfil de usuario (Talent Hunter)', async ({ page }) => {

    // =========================
    // STEP 1: LOGIN
    // =========================
    await page.goto('https://altempo.dev/signin');

    await page.locator('input').first().fill('2346jona');
    await page.locator('input[type="password"]').fill('2004Jh$r2004');

    await page.locator('button[type="submit"]').click();

    await expect(page).toHaveURL(/talent-hunter/i);

    // =========================
    // STEP 2: NAVEGATE TO PERFIL 
    // =========================
    await page.getByRole('link', { name: /my profile/i }).click();

    await expect(page).toHaveURL(/profile/i);

    // =========================
    // STEP 3: VALIDACIONS
    // =========================

    await expect(
      page.getByRole('heading', { level: 1 })
    ).toBeVisible();

    await expect(
      page.getByRole('button', { name: /editar perfil/i })
    ).toBeVisible();

    await expect(page.getByText(/acerca de mí/i)).toBeVisible();
    await expect(page.getByText(/industria/i)).toBeVisible();
    await expect(page.getByText(/localidad/i)).toBeVisible();

    await expect(
        page.getByText('Frecuencia y Agenda')
    ).toBeVisible();

  });

});
