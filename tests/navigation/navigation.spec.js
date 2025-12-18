const { test, expect } = require('@playwright/test');

test.describe('Flujo de navegación principal - Plataforma Altempo', () => {

  test('Acceso restringido sin sesión', async ({ page }) => {
    await page.goto('https://altempo.dev/talent-hunter');

    // Debe redirigir al login
    await expect(page).toHaveURL(/signin/i);
    await expect(
      page.getByRole('heading', { name: /iniciar sesión|login/i })
    ).toBeVisible();
  });

  test('Navegación correcta con sesión activa', async ({ page }) => {

    // =========================
    // STEP 1: LOGIN
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
    // STEP 2: PRINCIPAL NAVIGATION
    // =========================

    // Dashboard
    await expect(page.locator('aside')).toBeVisible();

    // Profile
    await page.getByRole('link', { name: /my profile/i }).click();
    await expect(page).toHaveURL(/profile/i);

    // Musics / services
    await page.getByRole('link', { name: /musics/i }).click();
    await expect(page).toHaveURL(/musics/i);

    // Events
    await page.getByRole('link', { name: /events/i }).click();
    await expect(page).toHaveURL(/events/i);

    // =========================
    // PERSISTENCE AFTER RELOAD
    // =========================
    await page.reload();
    await expect(page).not.toHaveURL(/signin/i);
    await expect(page.locator('aside')).toBeVisible();
  });

});
