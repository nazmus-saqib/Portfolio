import { test, expect } from '@playwright/test';

test('public assets and résumé links follow the deployment base path', async ({ page, request, baseURL }) => {
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
  await expect(page.locator('#story-copy')).toContainText('Identify BDA');

  const icon = await page.locator('link[rel="icon"]').getAttribute('href');
  expect(new URL(icon, site).href).toBe(new URL('favicon.svg', site).href);
  expect((await request.get(new URL('favicon.svg', site).href)).status()).toBe(200);

  const resumeLink = page.getByRole('link', { name: 'Get the full résumé' });
  await expect(resumeLink).toHaveAttribute('href', `${site.pathname}nazmus-saqib-resume.pdf`);
  const resume = await request.get(new URL(await resumeLink.getAttribute('href'), site).href);
  expect(resume.status()).toBe(200);
  expect(resume.headers()['content-type']).toContain('application/pdf');
  expect((await resume.body()).subarray(0, 5).toString()).toBe('%PDF-');

  await page.getByRole('button', { name: 'Read BIWTA project story' }).click();
  await page.getByText('Explore the prototype screens', { exact: true }).click();
  const previews = await page.locator('.project-gallery img').evaluateAll(images => images.map(image => image.getAttribute('src')));
  expect(previews).toHaveLength(5);
  for (const path of previews) {
    expect(path).toMatch(new RegExp(`^${site.pathname}projects/`));
    const preview = await request.get(new URL(path, site).href);
    expect(preview.status()).toBe(200);
    expect(preview.headers()['content-type']).toContain('image/webp');
  }

  const html = await (await request.get(site.href)).text();
  expect(html).toContain(`href="${site.pathname}resume.html"`);
  expect(errors).toEqual([]);
  expect(failedAssets).toEqual([]);
});
