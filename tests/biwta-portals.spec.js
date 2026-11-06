import { test, expect } from '@playwright/test';

for (const width of [1440, 360]) {
  test(`BIWTA ${width}px connects four persona stories to independent portal galleries`, async ({ page, request, baseURL }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    const errors = [];
    const failedAssets = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('response', response => {
      if (response.url().startsWith(baseURL) && response.status() >= 400) failedAssets.push(response.url());
    });
    await page.goto(baseURL);
    await expect(page.locator('#world-loading')).toHaveClass(/loaded/);
    await page.locator('[data-panel="projects"]').click();
    const opener = page.getByRole('button', { name: 'Read BIWTA project story', exact: true });
    await opener.click();
    const dialog = page.getByRole('dialog');
    const personas = dialog.locator('#case-biwta-personas');
    const names = ['Farhana', 'Rafiq', 'Nusrat', 'Mahmud'];
    const needs = ['deck admission', 'ticket number or mobile number', 'requested times', 'disbursement'];
    await expect(personas).toContainText('Names and stories are reconstructed');
    for (let index = 0; index < names.length; index++) {
      const control = personas.locator('[data-study-persona-select]').nth(index);
      await control.focus();
      await page.keyboard.press('Enter');
      await expect(control).toContainText(names[index]);
      const profile = personas.locator('[data-study-persona-detail]:visible');
      await expect(profile).toHaveCount(1);
      await expect(profile.locator('.study-persona-story')).toContainText(needs[index]);
      await expect(profile).toContainText('Design response');
    }
    await dialog.locator('a[href="#case-biwta-showcase"]').click();
    const portals = dialog.locator('[data-study-portals]');
    const labels = ['Passenger', 'Agent', 'Vessel Authority', 'Vessel Owner'];
    const counts = [8, 2, 3, 4];
    for (let index = 0; index < labels.length; index++) {
      const control = portals.locator('[data-study-portal-select]').nth(index);
      await control.focus();
      await page.keyboard.press('Space');
      await expect(control).toBeFocused();
      await expect(control).toHaveAttribute('aria-pressed', 'true');
      const panel = portals.locator('[data-study-portal-detail]:visible');
      await expect(panel).toHaveCount(1);
      await expect(portals.locator('[data-study-portal-status]')).toContainText(labels[index]);
      const gallery = panel.locator('[data-study-gallery]');
      await expect(gallery.locator('[data-study-picture-select]')).toHaveCount(counts[index]);
      for (let screen = 0; screen < counts[index]; screen++) {
        const select = gallery.locator('[data-study-picture-select]').nth(screen);
        await select.focus();
        await page.keyboard.press('Enter');
        await expect(select).toHaveAttribute('aria-pressed', 'true');
        const figure = gallery.locator('[data-study-picture-detail]:visible');
        await expect(figure).toHaveCount(1);
        const image = figure.locator('img');
        await image.scrollIntoViewIfNeeded();
        await expect.poll(() => image.evaluate(node => node.complete && node.naturalWidth > 0)).toBe(true);
        await expect(figure.locator('figcaption > p').last()).not.toBeEmpty();
        const fullSize = figure.locator('a');
        await expect(fullSize).toHaveAttribute('target', '_blank');
        if (width === 1440) {
          const response = await request.get(await fullSize.getAttribute('href'));
          expect(response.ok()).toBe(true);
          expect(response.headers()['content-type']).toMatch(/^image\//);
        }
      }
    }
    // Return to Passenger: its previous image selection survives the portal handoff.
    await portals.locator('[data-study-portal-select]').first().click();
    await expect(portals.locator('[data-study-portal-detail]:visible [data-study-picture-select]').last()).toHaveAttribute('aria-pressed', 'true');
    const sketches = dialog.locator('#case-biwta-sketches');
    await expect(sketches.locator('[data-study-picture-select]')).toHaveCount(3);
    for (let index = 0; index < 3; index++) {
      await sketches.locator('[data-study-picture-select]').nth(index).click();
      const figure = sketches.locator('[data-study-picture-detail]:visible');
      await figure.locator('img').scrollIntoViewIfNeeded();
      await expect.poll(() => figure.locator('img').evaluate(node => node.complete && node.naturalWidth > 0)).toBe(true);
      await expect(figure.locator('.study-picture-basis')).toContainText(index < 2 ? 'Original notebook photograph' : 'Supplied generated reconstruction');
    }
    const overflow = await dialog.locator('#dialog-content, .study-portals, .study-portal-panel:visible, .study-persona:visible').evaluateAll(nodes => nodes.filter(node => node.scrollWidth > node.clientWidth + 1).map(node => node.className));
    expect(overflow).toEqual([]);
    expect(errors).toEqual([]);
    expect(failedAssets).toEqual([]);
    await page.keyboard.press('Escape');
    await expect(opener).toBeFocused();
  });
}
