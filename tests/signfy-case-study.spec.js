import { test, expect } from '@playwright/test';

for (const width of [1440, 360]) {
  test(`Signfy ${width}px preserves original personas and connects research, prototype, and testing`, async ({ page, request, baseURL }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(baseURL);
    await expect(page.locator('#world-loading')).toHaveClass(/loaded/);
    await page.locator('[data-panel="projects"]').click();
    const opener = page.getByRole('button', { name: 'Read Signfy project story', exact: true });
    await opener.click();
    const dialog = page.getByRole('dialog');
    await expect(dialog.locator('#dialog-title')).toHaveText('Signfy');
    const personas = dialog.locator('#case-signfy-personas');
    await expect(personas).toContainText('reproduced as supplied');
    await expect(personas.locator('.study-persona-copy, .study-reconstruction-tag')).toHaveCount(0);
    const names = ['mark-jenny', 'miller', 'henry-rose', 'lily'];
    await expect(personas.locator('[data-study-picture-select]')).toHaveCount(names.length);
    for (let index = 0; index < names.length; index++) {
      const control = personas.locator('[data-study-picture-select]').nth(index);
      await control.focus();
      await page.keyboard.press('Enter');
      await expect(control).toHaveAttribute('aria-pressed', 'true');
      const picture = personas.locator('[data-study-picture-detail]:visible');
      await expect(picture).toHaveCount(1);
      const image = picture.locator('img');
      await image.scrollIntoViewIfNeeded();
      await expect.poll(() => image.evaluate(node => node.complete && node.naturalWidth > 0)).toBe(true);
      const full = picture.locator('a');
      await expect(full).toHaveAttribute('href', new RegExp(`persona-${names[index]}-original\\.png$`));
      await expect(full).toHaveAttribute('target', '_blank');
      if (width === 1440) expect((await request.get(await full.getAttribute('href'))).ok()).toBe(true);
    }
    await dialog.locator('a[href="#case-signfy-showcase"]').click();
    const showcase = dialog.locator('#case-signfy-showcase');
    const launch = showcase.locator('.case-prototype-launch');
    const prototype = new URL(await launch.getAttribute('href'));
    expect(prototype.protocol).toBe('https:');
    expect(prototype.hostname).toBe('www.figma.com');
    expect(prototype.searchParams.get('node-id')).toBe('102-1434');
    expect(prototype.searchParams.get('starting-point-node-id')).toBe('78:1387');
    await expect(launch).toHaveAttribute('rel', 'noopener noreferrer');
    const gallery = showcase.locator('[data-study-gallery]');
    await expect(gallery.locator('[data-study-picture-select]')).toHaveCount(6);
    for (let index = 0; index < 6; index++) {
      await gallery.locator('[data-study-picture-select]').nth(index).focus();
      await page.keyboard.press('Space');
      const picture = gallery.locator('[data-study-picture-detail]:visible');
      await expect(picture).toHaveCount(1);
      await expect(picture).toHaveClass(/study-picture--phone/);
      const image = picture.locator('img');
      await image.scrollIntoViewIfNeeded();
      await expect.poll(() => image.evaluate(node => node.complete && node.naturalWidth > 0)).toBe(true);
      expect(await image.evaluate(node => node.getBoundingClientRect().height)).toBeLessThanOrEqual(width === 360 ? 561 : 681);
      await expect(picture.locator('.study-picture-basis')).toContainText(index === 0 ? 'Final presentation' : 'Initial design.pdf');
      if (width === 1440) expect((await request.get(await picture.locator('a').getAttribute('href'))).ok()).toBe(true);
    }
    await expect(dialog.locator('#case-signfy-sketches .study-sketch-layout')).toHaveCount(0);
    await dialog.locator('a[href="#case-signfy-evaluation"]').click();
    const testing = dialog.locator('#case-signfy-evaluation');
    await expect(testing.getByRole('heading', { name: 'User testing and learnings', exact: true })).toBeFocused();
    await expect(testing.locator('.study-evaluation > article')).toHaveCount(5);
    await expect(testing).toContainText('qualitative feedback');
    await expect(testing.locator('h5', { hasText: 'Recorded feedback' })).toHaveCount(5);
    await expect(testing).not.toContainText('Proposed evaluation tasks');
    await dialog.locator('.case-study-disclosure > summary').filter({ hasText: 'Site map' }).click();
    const map = dialog.locator('#case-signfy-sitemap');
    await expect(map.locator('.study-sitemap > ul > li')).toHaveCount(5);
    await map.locator('[data-study-map-select]').last().click();
    await expect(map.locator('[data-study-map-status]')).not.toContainText('Select an area');
    const ids = await dialog.locator('[id]').evaluateAll(nodes => nodes.map(node => node.id));
    expect(new Set(ids).size).toBe(ids.length);
    const overflow = await dialog.locator('#dialog-content, .study-persona-artifacts, .study-picture:visible, .study-evaluation').evaluateAll(nodes => nodes.filter(node => node.scrollWidth > node.clientWidth + 1).map(node => node.className));
    expect(overflow).toEqual([]);
    expect(errors).toEqual([]);
    await page.keyboard.press('Escape');
    await expect(opener).toBeFocused();
  });
}
