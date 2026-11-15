import { test, expect } from '@playwright/test';

test('single-viewport company journey preserves public assets and résumé links at the deployment base', async ({ page, request, baseURL }) => {
  const site = new URL(baseURL.endsWith('/') ? baseURL : `${baseURL}/`);
  const errors = [];
  const failedAssets = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('response', response => {
    const url = new URL(response.url());
    if (url.origin === site.origin && response.status() >= 400) failedAssets.push(url.pathname);
  });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(site.href);
  await expect(page.locator('#world-loading')).toHaveClass(/loaded/);
  await expect(page.locator('canvas.world-canvas')).toBeVisible();
  await expect(page.locator('#profile-view-0 #about-card')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Molla Nazmus Saqib', exact: true })).toBeVisible();
  await expect(page.locator('.professional-position')).toHaveText('Project & Operations Coordinator');
  await expect(page.locator('.professional-actions')).toHaveCount(0);
  await expect(page.locator('#scene-hint')).toHaveClass(/sr-only/);
  const controls = page.locator('.stage-tools');
  const today = controls.getByRole('link', { name: 'Meet me today', exact: false });
  await expect(today).toBeVisible();
  await expect(today).toHaveAttribute('href', 'mailto:saqibmollanazmus@gmail.com');
  await expect(controls.locator('#explore-toggle')).toBeVisible();
  await expect(controls.locator('#pause-world')).toBeVisible();
  const positions = await controls.evaluate(node => ({
    today: node.querySelector('#go-today').getBoundingClientRect().right,
    explore: node.querySelector('#explore-toggle').getBoundingClientRect().left,
    pause: node.querySelector('#pause-world').getBoundingClientRect().left,
  }));
  expect(positions.today).toBeLessThan(positions.explore);
  expect(positions.explore).toBeLessThan(positions.pause);
  await expect(page.locator('#about-personal')).not.toHaveAttribute('open', '');
  await expect(page.locator('.professional-personal-links')).toHaveCount(0);
  await expect(page.locator('.professional-quick-view > summary .profile-preview-excerpt')).toBeVisible();
  await expect(page.locator('#about-personal > summary .profile-preview-excerpt')).toBeVisible();
  await expect(page.locator('#world')).toHaveAttribute('data-active-station', '-1');
  await expect(page.locator('#world')).toHaveAttribute('data-traveling', 'false');
  await expect(page.locator('[data-world-home]')).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('#panel-nav [data-panel="profile"]')).toHaveText('About Me');
  await expect(page.locator('.world-label')).toHaveCount(6);
  await page.locator('#panel-nav button[data-panel="journey"]').click();
  await expect(page.locator('#company-name')).toHaveText('Identify BDA');
  await expect(page.locator('#company-card .eyebrow')).toHaveText('01 / Canada');
  await expect(page.locator('#about-card')).toHaveCount(0);
  await expect(page.locator('#world')).toHaveAttribute('data-active-station', '5');

  const icon = await page.locator('link[rel="icon"]').getAttribute('href');
  expect(new URL(icon, site).href).toBe(new URL('favicon.svg', site).href);
  expect((await request.get(new URL('favicon.svg', site).href)).status()).toBe(200);
  const resumeLink = page.getByRole('link', { name: 'Résumé', exact: true });
  await expect(resumeLink).toHaveAttribute('href', `${site.pathname}Molla_Nazmus_Saqib_Project_Coordinator_Resume.pdf`);
  const resume = await request.get(new URL(await resumeLink.getAttribute('href'), site).href);
  expect(resume.status()).toBe(200);
  expect(resume.headers()['content-type']).toContain('application/pdf');
  expect((await resume.body()).subarray(0, 5).toString()).toBe('%PDF-');

  await page.getByRole('button', { name: 'Visit company 06 Synesis IT', exact: true }).click();
  await page.getByRole('button', { name: 'Read BIWTA project story' }).click();
  await page.getByText('Explore the prototype screens', { exact: true }).click();
  const previews = await page.locator('.project-gallery figure img').evaluateAll(images => images.map(image => image.getAttribute('src')));
  expect(previews).toHaveLength(17);
  for (const path of previews) {
    expect(path).toMatch(new RegExp(`^${site.pathname}projects/`));
    const preview = await request.get(new URL(path, site).href);
    expect(preview.status()).toBe(200);
    expect(preview.headers()['content-type']).toContain('image/webp');
  }
  await page.locator('#dialog-close').click();
  const html = await (await request.get(site.href)).text();
  expect(html).toContain(`href="${site.pathname}resume.html"`);
  const resumeHtml = await (await request.get(new URL('resume.html', site).href)).text();
  expect(resumeHtml).toContain('href="./"');
  expect(resumeHtml).toContain('href="./Molla_Nazmus_Saqib_Project_Coordinator_Resume.pdf"');
  expect(await page.evaluate(() => document.documentElement.scrollHeight <= innerHeight)).toBe(true);
  expect(errors).toEqual([]);
  expect(failedAssets).toEqual([]);
});
