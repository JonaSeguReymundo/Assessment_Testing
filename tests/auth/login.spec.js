const { test, expect } = require('@playwright/test');

test.describe('Login - Plataforma Altempo', () => {

  test('Login exitoso redirige según rol (Talent Hunter)', async ({ page }) => {
    await page.goto('https://altempo.dev/signin');

    await page.locator('input').first().fill('2346jona');
    await page.locator('input[type="password"]').fill('2004Jh$r2004');

    await page.locator('button[type="submit"]').click();

    // Validación por rol
    await expect(page).toHaveURL(/talent-hunter/i);
  });

  test('Error al iniciar sesión con credenciales inválidas', async ({ page }) => {
    await page.goto('https://altempo.dev/signin');

    await page.locator('input').first().fill('fakeuser');
    await page.locator('input[type="password"]').fill('wrongpassword');

    await page.locator('button[type="submit"]').click();

    await expect(
      page.locator('text=/invalid|incorrect|error/i')
    ).toBeVisible();
  });

});
