const { test, expect } = require('@playwright/test');

test.describe('Gestión y edición de equipo de trabajo / banda', () => {
  test.beforeEach(async ({ page }) => {
    // 1. Login
    // NOTE: Hardcoded credentials are used here for demonstration purposes.
    // In a real-world scenario, these should be loaded from a secure source.
    await page.goto('https://altempo.dev/signin');
    await page.getByLabel(/email/i).fill('2346jona');
    await page.getByLabel(/password/i).fill('2004Jh$r2004');
    await page.locator('button[type="submit"]').click();

    // Wait for navigation to the dashboard
    await expect(page).toHaveURL(/talent-hunter/i, { timeout: 10000 });

    // 2. Navigate to the team section
    await page.goto('https://altempo.dev/talent-hunter/team');
  });

  test('Creación de equipo o banda', async ({ page }) => {
    // 3. Click the "Crear equipo" button
    await page.getByRole('button', { name: /crear equipo/i }).click();

    // 4. Fill out the team creation form
    await page.getByLabel(/nombre de la banda/i).fill('Mi Banda de Prueba');
    await page.getByLabel(/género musical/i).fill('Rock');
    await page.getByLabel(/descripción/i).fill('Una banda de rock de prueba.');
    await page.getByRole('button', { name: /guardar/i }).click();

    // 5. Verify that the team was created successfully
    await expect(page.getByText(/banda creada con éxito/i)).toBeVisible();
    await expect(page.getByText(/mi banda de prueba/i)).toBeVisible();
  });

  test('Edición de información del equipo', async ({ page }) => {
    // 3. Click the "Editar" button for the team
    await page.getByRole('button', { name: /editar/i }).first().click();

    // 4. Edit the team information
    await page.getByLabel(/nombre de la banda/i).fill('Mi Banda de Prueba Editada');
    await page.getByRole('button', { name: /guardar/i }).click();

    // 5. Verify that the team was edited successfully
    await expect(page.getByText(/banda actualizada con éxito/i)).toBeVisible();
    await expect(page.getByText(/mi banda de prueba editada/i)).toBeVisible();
  });

  test('Invitación de miembros', async ({ page }) => {
    // 3. Click the "Invitar" button for the team
    await page.getByRole('button', { name: /invitar/i }).first().click();

    // 4. Fill out the invitation form
    await page.getByLabel(/email del miembro/i).fill('miembro@email.com');
    await page.getByRole('button', { name: /enviar invitación/i }).click();

    // 5. Verify that the invitation was sent successfully
    await expect(page.getByText(/invitación enviada/i)).toBeVisible();
    await expect(page.getByText(/miembro@email.com/i)).toBeVisible();
    await expect(page.getByText(/pendiente/i)).toBeVisible();
  });
});
