const { test, expect } = require('@playwright/test');

test.describe('Password Reset - Plataforma Altempo', () => {

  test('Solicitud exitosa de restablecimiento de contraseña', async ({ page }) => {

    await page.goto('https://altempo.dev/signin');

    // Recover Password 
    await page.getByRole('button', { name: /recover password/i }).click();

    await expect(
      page.getByRole('heading', { name: /recover password/i })
    ).toBeVisible();

    await page
      .locator('input[name="email"]')
      .fill('2346jonathan@gmail.com');

    // Submit Request
    await page.getByRole('button', { name: /^recover$/i }).click();

    await expect(
      page.getByText(/error al solicitar el restablecimiento/i)
    ).not.toBeVisible();

    await expect(
      page.getByRole('heading', { name: /recover password/i })
    ).toBeVisible();
  });


  test('Solicitud fallida de restablecimiento de contraseña', async ({ page }) => {

    await page.goto('https://altempo.dev/signin');

    await page.getByRole('button', { name: /recover password/i }).click();

    // Recover Password
    await expect(
      page.getByRole('heading', { name: /recover password/i })
    ).toBeVisible();

    // Wrong Email
    await page
      .locator('input[name="email"]')
      .fill('2346jhsr@gmail.com');

    await page.getByRole('button', { name: /^recover$/i }).click();

    await expect(
      page.getByText('Error al solicitar el restablecimiento de la contraseña.')
    ).toBeVisible();

    await expect(
      page.locator('input[name="email"]')
    ).toBeVisible();
  });

});
