import { test, expect } from '@playwright/test';

for (const width of [1440, 360]) {
  test(`eReturn ${width}px pairs each solution with its prototype evidence`, async ({ page, request, baseURL }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(baseURL);
    await expect(page.locator('#world-loading')).toHaveClass(/loaded/);
    await page.locator('[data-panel="projects"]').click();
    const opener = page.getByRole('button', { name: 'Read eReturn project story', exact: true });
    await opener.click();
    const dialog = page.getByRole('dialog');
    const cards = dialog.locator('#case-ereturn-challenges .study-challenge');
    await expect(cards).toHaveCount(4);
    for (let index = 0; index < 4; index += 1) {
      const card = cards.nth(index);
      await card.locator(':scope > summary').focus();
      await page.keyboard.press('Enter');
      await expect(card).toHaveAttribute('open', '');
      const evidence = card.locator('.study-picture');
      await expect(evidence).toHaveCount(1);
      const image = evidence.locator('img');
      await expect(image).toHaveAttribute('src', new RegExp(`prototype-solution-${index + 1}\\.webp$`));
      await image.scrollIntoViewIfNeeded();
      await expect.poll(() => image.evaluate(node => node.complete && node.naturalWidth > 0)).toBe(true);
      const full = evidence.locator('a');
      await expect(full).toHaveAttribute('href', new RegExp(`prototype-solution-${index + 1}\\.png$`));
      await expect(full).toHaveAttribute('target', '_blank');
      if (width === 1440) {
        const response = await request.get(await full.getAttribute('href'));
        expect(response.ok()).toBe(true);
        expect(response.headers()['content-type']).toContain('image/png');
      }
    }
    await expect(cards.nth(1).locator('.study-challenge-response')).toContainText('checkboxes');
    await expect(cards.nth(2)).toContainText('no autosave');
    await expect(cards.nth(2)).toContainText('Save Draft');
    await expect(cards.nth(2)).toContainText('Print');
    for (const section of ['Income', 'Rebate', 'Expenditure', 'Assets & Liabilities', 'Tax & Payment']) {
      await expect(cards.nth(3).locator('.study-challenge-response')).toContainText(section);
    }
    const gallery = dialog.locator('#case-ereturn-showcase [data-study-gallery]');
    await expect(gallery.locator('[data-study-picture-select]')).toHaveCount(3);
    for (const index of [1, 2]) {
      const button = gallery.locator('[data-study-picture-select]').nth(index);
      await button.focus();
      await page.keyboard.press('Space');
      await expect(button).toHaveAttribute('aria-pressed', 'true');
      await expect(gallery.locator('[data-study-picture-detail]:visible')).toHaveCount(1);
      const image = gallery.locator('[data-study-picture-detail]:visible img');
      await image.scrollIntoViewIfNeeded();
      await expect.poll(() => image.evaluate(node => node.complete && node.naturalWidth > 0)).toBe(true);
    }
    await expect(dialog.locator('#case-ereturn-sketches [data-study-picture-select]')).toHaveCount(3);
    const overflow = await dialog.locator('#dialog-content, .study-challenge[open], .study-picture:visible').evaluateAll(nodes => nodes.filter(node => node.scrollWidth > node.clientWidth + 1).map(node => node.className));
    expect(overflow).toEqual([]);
    expect(errors).toEqual([]);
    await page.keyboard.press('Escape');
    await expect(opener).toBeFocused();
  });
}
