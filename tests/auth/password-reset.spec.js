const { test, expect } = require('@playwright/test');

test.describe('Password Reset - Plataforma Altempo', () => {

  test('Solicitud de recuperación de contraseña se procesa sin errores visibles', async ({ page }) => {
    await page.goto('https://altempo.dev/signin');

    // Completar email
    await page.locator('input').first().fill('test@mail.com');

    // Click en Recover
    await page.getByRole('button', { name: /recover/i }).click();

    // Validar que la página no navega ni crashea
    await expect(page).toHaveURL(/signin/i);

    // Validar que el botón sigue presente (UI estable)
    await expect(
      page.getByRole('button', { name: /recover/i })
    ).toBeVisible();
  });

  test('Validación al enviar solicitud de recuperación sin email', async ({ page }) => {
    await page.goto('https://altempo.dev/signin');

    await page.getByRole('button', { name: /recover/i }).click();

    // En este caso el sistema bloquea o ignora la acción
    // Validamos estabilidad de la vista
    await expect(page).toHaveURL(/signin/i);
  });

});
