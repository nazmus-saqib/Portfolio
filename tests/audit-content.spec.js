import { test, expect } from '@playwright/test';

test('conference case connects the verified example to responsibilities, decisions and reusable templates', async ({ page, baseURL }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(`${baseURL}?project=conference`);
  const dialog = page.locator('#project-dialog');
  await expect(dialog.getByRole('heading', { name: 'Coordinating a $55,000 conference project', exact: true })).toBeVisible();
  await expect(dialog.locator('.coordination-facts')).toContainText('8 vendors');
  await expect(dialog.locator('.coordination-facts')).toContainText('3 weeks');
  await expect(dialog.locator('.coordination-result')).toContainText('without delaying the conference');
  await expect(dialog.getByRole('heading', { name: 'Who did what', exact: true })).toBeVisible();
  await expect(dialog.locator('.coordination-ownership dl')).toBeVisible();
  await expect(dialog.locator('.coordination-ownership')).toContainText('My contribution');
  const tracker = dialog.locator('[data-coordination-template="task-tracker"]');
  await expect(tracker.getByRole('heading', { name: 'Task tracker template', exact: true })).toBeVisible();
  await expect(tracker.getByRole('region')).toBeVisible();
  await expect(tracker.getByRole('columnheader', { name: 'Next action', exact: true })).toBeVisible();
  await expect(tracker).toContainText('[Responsible person]');
});

test('all coordination templates remain usable on a narrow phone without overflowing the page', async ({ page, baseURL }) => {
  await page.setViewportSize({ width: 320, height: 780 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const id of ['conference', 'multi-city-event', 'invoice-investigation', 'supplier-coordination', 'change-coordination']) {
    await page.goto(`${baseURL}?project=${id}`);
    await expect(page.locator('[data-coordination-case]')).toHaveAttribute('data-coordination-case', id);
    for (const template of await page.locator('.coordination-template').all()) {
      const region = template.getByRole('region');
      await region.scrollIntoViewIfNeeded();
      await expect(region).toBeVisible();
      await region.focus();
      await expect(region).toBeFocused();
      const sizes = await region.evaluate(node => ({ client: node.clientWidth, scroll: node.scrollWidth }));
      expect(sizes.scroll).toBeGreaterThan(sizes.client);
      await page.keyboard.press('End');
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await expect(page.locator('.case-art-note')).toHaveCount(0);
  }
});

test('the delivered HTML, social image and approved résumé remain useful without JavaScript', async ({ browser, baseURL, request }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 360, height: 800 } });
  const page = await context.newPage();
  await page.goto(baseURL);
  await expect(page.getByRole('heading', { name: 'Molla Nazmus Saqib', exact: true })).toBeVisible();
  await expect(page.locator('.static-position')).toHaveText('Project & Operations Coordinator');
  await expect(page.locator('p.static-summary')).toContainText('I connect requirements, stakeholders, suppliers, schedules and deliverables to move projects forward.');
  await expect(page.locator('.static-case')).toHaveCount(8);
  const email = page.locator('a[href="mailto:saqibmollanazmus@gmail.com"]').first();
  await expect(email).toBeVisible();
  const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
  expect(canonical).toBe('https://nazmus-saqib.github.io/Portfolio/');
  const image = await request.get(`${baseURL}social-preview.png`);
  expect(image.status()).toBe(200);
  const png = await image.body();
  expect(png.subarray(1, 4).toString()).toBe('PNG');
  expect(png.readUInt32BE(16)).toBe(1200);
  expect(png.readUInt32BE(20)).toBe(630);
  const pdf = await request.get(`${baseURL}Molla_Nazmus_Saqib_Project_Coordinator_Resume.pdf`);
  expect((await pdf.body()).subarray(0, 5).toString()).toBe('%PDF-');
  await context.close();
});
