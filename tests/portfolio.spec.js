import { test, expect } from '@playwright/test';
import { formatTenure } from '../src/content.js';

const companies = ['WebNSofTech', 'Synesis IT', 'iQuantile', 'iStoreiSend', 'Dynamic Infotech', 'UPS & Staples', 'Identify BDA'];
const errorsByPage = new WeakMap();

test.beforeEach(async ({ page }) => {
  const errors = [];
  errorsByPage.set(page, errors);
  page.on('pageerror', error => errors.push(error.message));
  await page.emulateMedia({ reducedMotion: 'reduce' });
});

test.afterEach(async ({ page }) => {
  expect(errorsByPage.get(page), 'No uncaught browser errors').toEqual([]);
});

async function loadWorld(page, baseURL) {
  await page.goto(baseURL || '/');
  await expect(page.locator('#world-loading')).toHaveClass(/loaded/);
  await expect(page.locator('canvas.world-canvas')).toBeVisible();
  await expect(page.locator('.world-label')).toHaveCount(7);
  await expect(page.locator('#career-track [data-stop-index]')).toHaveCount(8);
}

async function assertSingleViewport(page) {
  const dimensions = await page.evaluate(() => ({
    width: innerWidth, height: innerHeight,
    documentWidth: document.documentElement.scrollWidth,
    documentHeight: document.documentElement.scrollHeight,
    bodyHeight: document.body.scrollHeight,
    x: scrollX, y: scrollY,
  }));
  expect(dimensions.documentWidth, 'No horizontal document overflow').toBeLessThanOrEqual(dimensions.width);
  expect(dimensions.documentHeight, 'Portfolio stays inside the viewport').toBeLessThanOrEqual(dimensions.height);
  expect(dimensions.bodyHeight, 'Only internal panels may scroll').toBeLessThanOrEqual(dimensions.height);
  expect(dimensions.x).toBe(0);
  expect(dimensions.y).toBe(0);
}

test('chapter 00 introduces Saqib and his story before the employer journey', async ({ page, baseURL }) => {
  await loadWorld(page, baseURL);
  const about = page.locator('#about-card');
  await expect(about).toBeVisible();
  for (const text of ['About Me & My Story', 'Nazmus Saqib', 'Project & Operations Coordinator', 'Print Project Coordinator', 'Identify BDA', 'Bringing it all together.', 'Bangladesh', 'Canada', '2022', 'Centennial College', 'Sir Sandford Fleming College', 'October 2024', 'Assistant Project Manager']) {
    await expect(about).toContainText(text);
  }
  await expect(page.locator('#career-track [data-stop-index]').first()).toHaveAttribute('data-stop-index', '-1');
  await expect(page.locator('[data-stop-index="-1"]')).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('#world')).toHaveAttribute('data-active-station', '-1');
  await expect(page.locator('#previous-stop')).toBeDisabled();
  await expect(page.locator('#next-stop')).toContainText('First company');

  await page.getByRole('button', { name: 'Read my story: Bangladesh to Canada', exact: true }).click();
  await expect(page.locator('#about-story-title')).toBeInViewport();
  await expect(page.locator('#about-story-title')).toBeFocused();
  await assertSingleViewport(page);
  await page.locator('[data-stop-index="-1"]').click();
  await page.getByRole('button', { name: 'My career goal', exact: true }).click();
  await expect(page.locator('#about-goal-title')).toBeInViewport();
  await page.locator('[data-stop-index="-1"]').click();

  await page.locator('#next-stop').click();
  await expect(page.locator('#company-name')).toHaveText('WebNSofTech');
  await expect(page.locator('#previous-stop')).toBeEnabled();
  await page.locator('#previous-stop').click();
  await expect(about).toBeVisible();
  await expect(page.locator('#world')).toHaveAttribute('data-active-company', 'About Me & My Story');

  await page.locator('[data-stop-index="-1"]').focus();
  await page.keyboard.press('End');
  await expect(page.locator('#company-name')).toHaveText('Identify BDA');
  await page.keyboard.press('Home');
  await expect(about).toBeVisible();
  await expect(page.locator('[data-stop-index="-1"]')).toBeFocused();
  await page.locator('#go-today').click();
  await page.getByRole('button', { name: 'Nazmus Saqib, start of journey', exact: true }).click();
  await expect(about).toBeVisible();

  await page.locator('#reading-toggle').click();
  await expect(page.locator('#about-card.reading-about')).toBeVisible();
  await expect(page.locator('#reading-view .reading-company')).toHaveCount(7);
  await page.locator('#about-card').getByText('In October 2024,', { exact: false }).scrollIntoViewIfNeeded();
  await assertSingleViewport(page);
});

test('seven employer cards follow career chronology with dates, tenure, and accurate roles', async ({ page, baseURL }) => {
  await loadWorld(page, baseURL);
  await page.locator('#next-stop').click();
  await expect(page.locator('#company-name')).toHaveText(companies[0]);
  await expect(page.locator('#company-dates')).toHaveText('Jan 2018–Jul 2020');
  await expect(page.locator('#company-tenure')).toHaveText('2 yrs 7 mos');
  await expect(page.locator('#previous-stop')).toBeEnabled();

  for (let index = 1; index < companies.length; index += 1) {
    await page.locator('#next-stop').click();
    await expect(page.locator('#company-name')).toHaveText(companies[index]);
    await expect(page.locator('#world')).toHaveAttribute('data-active-company', companies[index]);
    await expect(page.locator(`[data-stop-index="${index}"]`)).toHaveAttribute('aria-pressed', 'true');
  }
  await expect(page.locator('#company-role')).toHaveText('Print Project Coordinator');
  await expect(page.locator('#company-dates')).toHaveText('Oct 2024–Present');
  await expect(page.locator('#next-stop')).toContainText('Back to my story');
  await page.locator('#next-stop').click();
  await expect(page.locator('#about-card')).toBeVisible();

  await page.getByRole('button', { name: 'Visit company 2: Synesis IT', exact: true }).click();
  await expect(page.locator('#company-dates')).toHaveText('Aug 2020–Nov 2021');
  await expect(page.locator('#company-tenure')).toHaveText('1 yr 4 mos');
  await expect(page.locator('#company-role')).toHaveText('UX Intern → UX Designer');
  await expect(page.getByRole('button', { name: 'Read BIWTA project story' })).toBeVisible();
  await page.locator('[data-stop-index="4"]').click();
  await expect(page.locator('#company-card')).toContainText('Overlapping roles');
  await page.locator('[data-stop-index="5"]').click();
  await expect(page.locator('#company-card')).toContainText('Overlapping roles');
  await assertSingleViewport(page);
});

test('the character renders movement with on-screen and focused keyboard controls', async ({ page, baseURL }) => {
  await loadWorld(page, baseURL);
  await expect(page.locator('#pause-world')).toHaveAttribute('aria-label', 'Resume scene animation');
  await page.locator('#explore-toggle').click();
  await expect(page.locator('#explore-toggle')).toHaveAttribute('aria-pressed', 'true');
  const canvas = page.locator('canvas.world-canvas');
  await expect(canvas).toBeFocused();
  const beforeTouch = await canvas.screenshot();
  await page.getByRole('button', { name: 'Move forward', exact: true }).click();
  const afterTouch = await canvas.screenshot();
  expect(beforeTouch.equals(afterTouch), 'A single step changes the rendered character').toBe(false);
  await canvas.focus();
  await page.keyboard.press('ArrowRight');
  const afterKeyboard = await canvas.screenshot();
  expect(afterTouch.equals(afterKeyboard), 'Focused arrow keys move the rendered character').toBe(false);
  await assertSingleViewport(page);
});

test('company project names open details and return focus to the selected employer card', async ({ page, request, baseURL }) => {
  await loadWorld(page, baseURL);
  await page.locator('[data-stop-index="1"]').click();
  const biwta = page.getByRole('button', { name: 'Read BIWTA project story' });
  await biwta.click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page.locator('#dialog-title')).toHaveText('BIWTA');
  await expect(page.getByRole('dialog')).toContainText('Individual project');
  await page.getByText('Explore the prototype screens', { exact: true }).click();
  await expect(page.locator('.project-gallery figure')).toHaveCount(5);
  for (const src of await page.locator('.project-gallery img').evaluateAll(images => images.map(image => image.src))) {
    const result = await request.get(src);
    expect(result.status()).toBe(200);
    expect(result.headers()['content-type']).toContain('image/webp');
  }
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toBeHidden();
  await expect(biwta).toBeFocused();
  await expect(page.locator('#company-name')).toHaveText('Synesis IT');
  await page.locator('[data-stop-index="2"]').click();
  await page.getByRole('button', { name: 'Read Quantibly project story' }).click();
  await expect(page.getByRole('dialog')).toContainText('Internal product details stay confidential');
  await page.locator('#dialog-close').click();
  await page.locator('#go-today').click();
  await page.getByRole('button', { name: 'Read From request to delivery project story' }).click();
  await expect(page.getByRole('dialog')).toContainText('Print Project Coordinator');
  await expect(page.getByRole('dialog')).toContainText('20+ external vendors');
  await page.locator('#dialog-close').click();
  await assertSingleViewport(page);
});

test('profile, qualifications, projects, and contact remain in the same viewport', async ({ page, request, baseURL }) => {
  await loadWorld(page, baseURL);
  await expect(page.locator('#profile-intro')).toContainText('Project Coordinator / Assistant Project Manager');
  await page.locator('[data-panel="profile"]').click();
  const detail = page.locator('#sidebar-body');
  await expect(detail).toContainText('Computer Science & Engineering');
  await expect(detail).toContainText('Sir Sandford Fleming College');
  await expect(detail).toContainText('Centennial College');
  await expect(detail).toContainText('Assistant Project Manager');
  await detail.evaluate(element => element.scrollTop = element.scrollHeight);
  await expect(page.getByRole('link', { name: 'Download my résumé' })).toBeVisible();
  const pdf = await request.get(await page.getByRole('link', { name: 'Download my résumé' }).getAttribute('href'));
  expect(pdf.status()).toBe(200);
  expect((await pdf.body()).subarray(0, 5).toString()).toBe('%PDF-');
  await assertSingleViewport(page);

  await page.locator('[data-panel="projects"]').click();
  await expect(page.locator('.case-card')).toHaveCount(9);
  await page.getByRole('button', { name: 'Operations', exact: true }).click();
  await expect(page.locator('.case-card')).toHaveCount(1);
  await page.getByRole('button', { name: 'Earlier digital work', exact: true }).click();
  await expect(page.locator('.case-card')).toHaveCount(8);
  await page.getByRole('button', { name: 'All work', exact: true }).click();
  await expect(page.locator('.case-card')).toHaveCount(9);
  await detail.evaluate(element => element.scrollTop = element.scrollHeight);
  await page.getByRole('button', { name: 'Read Cozey project story' }).click();
  await expect(page.getByRole('dialog')).toContainText('Academic project');
  await page.locator('#dialog-close').click();

  await page.locator('[data-panel="contact"]').click();
  await expect(page.getByRole('link', { name: 'Start a conversation' })).toHaveAttribute('href', 'mailto:saqib.uxui@gmail.com');
  await expect(page.locator('#sidebar-body')).toContainText('Assistant Project Manager');
  await assertSingleViewport(page);
});

test('automatic journey advances chronologically and stops when a company is chosen', async ({ page, baseURL }) => {
  await loadWorld(page, baseURL);
  await page.clock.install();
  await page.locator('#tour-toggle').click();
  await expect(page.locator('#tour-toggle')).toHaveAttribute('aria-pressed', 'true');
  await page.clock.runFor(16_010);
  await expect(page.locator('#company-name')).toHaveText('WebNSofTech');
  await page.clock.runFor(16_010);
  await expect(page.locator('#company-name')).toHaveText('Synesis IT');
  await page.locator('[data-stop-index="6"]').click();
  await expect(page.locator('#tour-toggle')).toHaveAttribute('aria-pressed', 'false');
  await page.clock.runFor(20_000);
  await expect(page.locator('#company-name')).toHaveText('Identify BDA');
});

for (const viewport of [{ width: 390, height: 844 }, { width: 360, height: 640 }]) {
  test(`mobile ${viewport.width}×${viewport.height} keeps the world, company card, and panels within the viewport`, async ({ page, baseURL }) => {
    await page.setViewportSize(viewport);
    await loadWorld(page, baseURL);
    await assertSingleViewport(page);
    await expect(page.locator('#world-pane')).toBeVisible();
    await expect(page.locator('#about-card')).toBeVisible();
    await page.locator('#about-card').getByText('In October 2024,', { exact: false }).scrollIntoViewIfNeeded();
    await assertSingleViewport(page);
    await page.locator('[data-stop-index="1"]').click();
    await expect(page.locator('#company-name')).toHaveText('Synesis IT');
    const biwta = page.getByRole('button', { name: 'Read BIWTA project story' });
    await biwta.click();
    await expect(page.locator('#dialog-title')).toHaveText('BIWTA');
    await expect(page.locator('#dialog-close')).toBeInViewport();
    await page.locator('#dialog-close').click();
    await assertSingleViewport(page);
    await page.locator('[data-panel="profile"]').click();
    await page.locator('#sidebar-body').evaluate(element => element.scrollTop = element.scrollHeight);
    await expect(page.getByRole('link', { name: 'Download my résumé' })).toBeVisible();
    await assertSingleViewport(page);
    await page.locator('#reading-toggle').click();
    await expect(page.locator('#reading-view .reading-company')).toHaveCount(7);
    await expect(page.locator('#about-card.reading-about')).toHaveCount(1);
    await expect(page.locator('#world-pane')).toBeHidden();
    await page.locator('#sidebar-body').evaluate(element => element.scrollTop = element.scrollHeight);
    await expect(page.getByRole('button', { name: 'Read From request to delivery project story' })).toBeVisible();
    await assertSingleViewport(page);
    await page.locator('#reading-toggle').click();
    await expect(page.locator('#world-pane')).toBeVisible();
    await assertSingleViewport(page);
  });
}

test('without WebGL the complete career and clickable projects remain available in reading view', async ({ page, baseURL }) => {
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function(type, ...args) {
      if (String(type).startsWith('webgl') || type === 'experimental-webgl') return null;
      return original.call(this, type, ...args);
    };
  });
  await page.goto(baseURL || '/');
  await expect(page.locator('.world-fallback')).toBeVisible();
  await expect(page.locator('#explore-toggle')).toBeDisabled();
  await page.getByRole('button', { name: 'Read my journey' }).click();
  await expect(page.locator('#about-card')).toContainText('Bangladesh');
  await expect(page.locator('#about-card')).toContainText('Canada');
  await expect(page.locator('#reading-view .reading-company')).toHaveCount(7);
  await expect(page.locator('#reading-view')).toContainText('Oct 2024–Present');
  await page.getByRole('button', { name: 'Read From request to delivery project story' }).click();
  await expect(page.locator('#dialog-title')).toHaveText('From request to delivery');
  await page.locator('#dialog-close').click();
  await assertSingleViewport(page);
});

test('month-level tenure remains consistent for completed and current roles', () => {
  expect(formatTenure('2018-01', '2020-07')).toBe('2 yrs 7 mos');
  expect(formatTenure('2020-08', '2021-11')).toBe('1 yr 4 mos');
  expect(formatTenure('2021-12', '2022-03')).toBe('4 mos');
  expect(formatTenure('2022-04', '2022-11')).toBe('8 mos');
  expect(formatTenure('2023-01', '2024-09')).toBe('1 yr 9 mos');
  expect(formatTenure('2024-10', null, new Date('2026-10-30T12:00:00Z'))).toBe('2 yrs');
});
