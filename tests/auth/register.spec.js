const { test, expect } = require('@playwright/test');

test.describe('User Registration', () => {
  test('should register a new user', async ({ page }) => {
    await page.goto('https://altempo.dev/signup');

    const uniqueEmail = `testuser-${Date.now()}@example.com`;

    // Fill out the registration form
    await page.getByLabel(/nombre/i).fill('Test User');
    await page.getByLabel(/email/i).fill(uniqueEmail);
    await page.getByLabel(/password/i).first().fill('Password123!');
    await page.getByLabel(/confirm password/i).fill('Password123!');

    // Click the register button
    await page.getByRole('button', { name: /register/i }).click();

    // Verify that the user is redirected to the dashboard
    await expect(page.getByRole('heading', { name: /bienvenid/i })).toBeVisible({ timeout: 10000 });
  });
});
