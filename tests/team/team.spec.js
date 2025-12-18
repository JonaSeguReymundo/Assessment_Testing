const { test, expect } = require('@playwright/test');

test.describe('Team / Signup Client - Flujo completo', () => {

  test('Completar personalización de banda y buscar profesionales', async ({ page }) => {

    // =========================
    // LOGIN
    // =========================
    await page.goto('https://altempo.dev/signin');

    await page.getByLabel(/username|email/i).fill('2346jona');
    await page.getByLabel(/password/i).fill('2004Jh$r2004');

    const loginButton = page.getByRole('button', { name: /log in/i });
    await expect(loginButton).toBeEnabled();

    await Promise.all([
      page.waitForURL(/signup-client|talent-hunter/i),
      loginButton.click(),
    ]);

    await expect(page).not.toHaveURL(/signin/i);

    // =========================
    // STEP 1: BAND STRUCTURE
    // =========================
    await expect(
      page.getByRole('heading', { name: /estructura a la banda que buscas/i })
    ).toBeVisible();

    await expect(page.getByText(/1 de 2/i)).toBeVisible();

    await page.getByRole('button', { name: /siguiente/i }).click();

    // =========================
    // STEP 2: EVENT DETAILS
    // =========================
    await expect(
      page.getByRole('heading', { name: /lugar y logística/i })
    ).toBeVisible();

    await expect(page.getByText(/2 de 2/i)).toBeVisible();

    const searchButton = page.getByRole('button', {
      name: /buscar profesionales/i,
    });

    await expect(searchButton).toBeDisabled();

    // =========================
    // COMPLETE FORM
    // =========================
    await page.locator('#event_city').fill('San Salvador');
    await page.locator('#event_address').fill('Colonia Escalón');

    await page.getByText('Al aire libre').click();

    await page.getByText('Tenemos equipo propio').click();

    await page.getByText('Entre 50 y 100').click();

    await page.getByText(/fecha del evento/i).click();
    await page.key
    await page.getByText('1 - 2 horas').click();

    // =========================
    // SEARCH AND VALIDATE
    // =========================
    await expect(searchButton).toBeEnabled();

    await Promise.all([
      page.waitForURL(/profesionales|resultados|search/i),
      searchButton.click(),
    ]);
  });

});
