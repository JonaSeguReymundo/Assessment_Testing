const { test, expect } = require('@playwright/test');

test.describe('Gestión y edición de equipo de trabajo / banda - Plataforma Altempo', () => {

  test('Visualización del flujo de gestión de banda hasta la visualización del concepto', async ({ page }) => {

    // =========================
    // 1. LOGIN (Mantenido)
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
    // 2. NAVEGACIÓN DESDE EL DASHBOARD
    // =========================
    
    const bandSectionHeader = page.getByRole('heading', {
      name: /personalización en composición para tu banda/i
    });
    await bandSectionHeader.scrollIntoViewIfNeeded();
    
    const bandCard = page.getByText(/orquesta tropical/i).first();
    await expect(bandCard).toBeVisible();
    await bandCard.click();

    // =========================
    // 3. PASO 1: ESTRUCTURA DE LA BANDA
    // =========================
    
    await expect(page).toHaveURL(/signup-client/i);
    await expect(page.getByText('1 de 2')).toBeVisible();
    
    const nextButton = page.getByRole('button', { name: /siguiente/i });
    await expect(nextButton).toBeVisible();
    await nextButton.click();

    // =========================
    // 4. PASO 2: LUGAR Y LOGÍSTICA (CAMPOS OBLIGATORIOS)
    // =========================

    await expect(page.getByText('2 de 2')).toBeVisible();
    
    // 4.1 Modalidad (Presencial es usualmente requerida para mostrar mapa)
    await page.getByRole('button', { name: /presencial/i }).click();

    // 4.2 Ubicación y Ciudad
    const cityInput = page.locator('#event_city');
    await expect(cityInput).toBeVisible();
    await cityInput.fill('Bogotá');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');

    const addressInput = page.locator('#event_address');
    await expect(addressInput).toBeVisible();
    await addressInput.fill('Calle Ficticia 123, Barrio Central');
    
    // 4.3 Tipo de espacio
    await page.getByRole('button', { name: /espacio cerrado/i }).click();

    // 4.4 Equipo de sonido y montaje
    await page.getByRole('button', { name: /tenemos equipo propio/i }).click();

    // 4.5 Aforo estimado
    await page.getByRole('button', { name: /entre 50 y 100/i }).click();

    // 4.6 Fechas obligatorias (Visita y Evento)
    // Interactuamos con los contenedores de fecha
    await page.getByText(/fecha de la visita/i).click();
    await page.keyboard.type('18122025');
    await page.keyboard.press('Enter');

    await page.getByText(/fecha del evento/i).click();
    await page.keyboard.type('20122025');
    await page.keyboard.press('Enter');

    // 4.7 Duración del evento
    await page.getByRole('button', { name: /3 - 4 horas/i }).click();

    // 4.8 Fuente de información (¿Cómo te enteraste?)
    await page.getByLabel(/redes sociales/i).check();

    // Esperar a que el Mapa cargue correctamente
    await expect(page.locator('.gm-style')).toBeVisible();

    // Acción: Finalizar el proceso (El botón ya no debería estar disabled)
    const searchProsButton = page.getByRole('button', { name: /buscar profesionales/i });
    await expect(searchProsButton).toBeEnabled();
    await searchProsButton.click();

    // =========================
    // 5. CONFIRMACIÓN DE ÉXITO
    // =========================

    await expect(page.getByText(/order created successfully/i)).toBeVisible({ timeout: 15000 });
    await expect(page.getByText(/orden id: #ord-/i)).toBeVisible();

    const viewConceptButton = page.getByRole('button', { name: /ver concepto/i });
    await expect(viewConceptButton).toBeVisible();
    await viewConceptButton.click();

    // =========================
    // 6. VISTA FINAL DE LA ORDEN
    // =========================

    await expect(page).toHaveURL(/.*\/order\?id=ORD-.*/);
    const toaster = page.locator('div[data-rht-toaster]');
    await expect(toaster).toBeAttached();

    console.log('Flujo completado exitosamente con todos los requerimientos técnicos.');
  });

});