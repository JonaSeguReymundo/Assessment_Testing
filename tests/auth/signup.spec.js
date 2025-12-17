const { test, expect } = require('@playwright/test');

test.describe('Sign Up - Plataforma Altempo', () => {

  test('Registro completo de un nuevo usuario', async ({ page }) => {

    await page.goto('https://altempo.dev/signin');

    // Iniciar registro
    await page.getByRole('button', { name: /sign up/i }).click();

    // =====================
    // STEP 1: PASSION
    // =====================
    await page.locator('button', { hasText: /student/i }).first().click();

    await expect(
      page.getByRole('heading', { name: /choose the profile/i })
    ).toBeVisible();

    // =====================
    // STEP 2: PROFILE
    // =====================
    await page.locator('button', { hasText: /individual/i }).first().click();

    await expect(
      page.getByRole('heading', { name: /user type/i })
    ).toBeVisible();

    // =====================
    // STEP 3: USER TYPE
    // =====================
    await page.locator('.card-hunter').nth(1).click();

    await page.getByRole('button', { name: /next/i }).click();

    // =====================
    // STEP 4: FORM
    // =====================
    await expect(
      page.getByRole('heading', { name: /personal information/i })
    ).toBeVisible();

    const uniqueUser = `user${Date.now()}`;

    await page.locator('input[name="name"]').fill('Test User');
    await page.locator('input[name="username"]').fill(uniqueUser);
    await page.locator('input[name="email"]').fill(`${uniqueUser}@test.com`);
    await page.locator('input[name="password1"]').fill('Password123!');
    await page.locator('input[name="password2"]').fill('Password123!');
    await page.locator('input[name="phone_number"]').fill('70123456');

    // =====================
    // STEP 5: CREATE ACCOUNT
    // =====================
    await page.getByRole('button', { name: /create account/i }).click();

    await expect(page).not.toHaveURL(/signin/i);
  });

});
