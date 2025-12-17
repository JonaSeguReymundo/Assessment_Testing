const { test, expect } = require('@playwright/test');

test.describe('Notifications - Plataforma Altempo', () => {

  test('Recepción, lectura y persistencia de notificaciones', async ({ page }) => {

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
    // STEP 2: NOTIFICATION BUTTON
    // =========================
    const notificationButton = page.locator('button.notification-button');
    const unreadIndicator = notificationButton.locator('.dot-indicator');

    await expect(notificationButton).toBeVisible();
    await expect(notificationButton).toBeEnabled();

    // =========================
    // UNREAD INDICATOR
    // =========================
    await expect(unreadIndicator).toBeVisible();

    // =========================
    // INTERACT WITH NOTIFICATIONS
    // =========================
    await notificationButton.click();
    await expect(notificationButton).toBeVisible();

    // =========================
    // READ A NOTIFICATION
    // =========================
    await expect(unreadIndicator).toBeVisible();

    // =========================
    // PERSISTENCE 
    // =========================
    await page.reload();

    await expect(notificationButton).toBeVisible();
    await expect(unreadIndicator).toBeVisible();

  });

});
