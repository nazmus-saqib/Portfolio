import { test, expect } from '@playwright/test';

const browserErrors = new WeakMap();

test.beforeEach(async ({ page }) => {
  const errors = [];
  browserErrors.set(page, errors);
  page.on('pageerror', error => errors.push(error.message));
});

test.afterEach(async ({ page }) => {
  expect(browserErrors.get(page), 'No uncaught browser exceptions').toEqual([]);
});

async function loadWorld(page) {
  await page.goto('/');
  await expect(page.locator('#world-loading')).toHaveClass(/loaded/);
  await expect(page.locator('canvas.world-canvas')).toBeVisible();
  await expect(page.locator('.world-label')).toHaveCount(4);
}

test('visitors can travel through chapters and read the same story without 3D', async ({ page }) => {
  await loadWorld(page);
  await expect(page.locator('#story-copy')).toContainText('Today, I coordinate projects and operations at Identify BDA');
  await expect(page.locator('#chapter-counter')).toHaveText('04');
  await page.getByRole('button', { name: 'Back to the beginning' }).click();
  await expect(page.locator('#story-copy h2')).toHaveText('Understand the need first.');
  await expect(page.locator('#chapter-counter')).toHaveText('01');
  await page.getByRole('button', { name: 'Visit chapter 2: Systems' }).click();
  await expect(page.locator('#story-copy')).toContainText('ODIN');
  await expect(page.locator('#story-location')).toHaveText('Malaysia');
  await page.getByRole('button', { name: 'Next chapter' }).click();
  await expect(page.locator('#story-copy')).toContainText('Centennial College');
  await page.getByRole('button', { name: 'Switch to reading view' }).click();
  await expect(page.locator('#reading-view')).toBeVisible();
  await expect(page.locator('#reading-view article')).toHaveCount(4);
  await expect(page.locator('#reading-view')).toContainText('Identify BDA');
  await expect(page.locator('#scene-layout')).toBeHidden();
  await page.getByRole('button', { name: 'Switch to 3D view' }).click();
  await expect(page.locator('canvas.world-canvas')).toBeVisible();
  await expect(page.locator('#chapter-counter')).toHaveText('03');
});

test('the character moves with touch controls and focused keyboard controls', async ({ page }) => {
  await loadWorld(page);
  await page.getByRole('button', { name: 'Pause scene animation' }).click();
  await page.getByRole('button', { name: 'Visit chapter 1: Design' }).click();
  await page.getByRole('button', { name: 'Explore freely' }).click();
  await expect(page.getByRole('button', { name: 'Explore freely' })).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('canvas.world-canvas')).toBeFocused();
  await expect(page.getByRole('button', { name: 'Move forward', exact: true })).toBeVisible();
  const canvas = page.locator('canvas.world-canvas');
  const beforeTouch = await canvas.screenshot();
  await page.getByRole('button', { name: 'Move forward', exact: true }).click();
  const afterTouch = await canvas.screenshot();
  expect(beforeTouch.equals(afterTouch), 'A paused single-step control moves the rendered character').toBe(false);
  await page.getByRole('button', { name: 'Resume scene animation' }).click();
  await canvas.focus();
  const beforeKeys = await canvas.screenshot();
  const scrollBefore = await page.evaluate(() => scrollY);
  await page.keyboard.down('ArrowRight');
  await page.waitForTimeout(450);
  await page.keyboard.up('ArrowRight');
  await page.getByRole('button', { name: 'Pause scene animation' }).click();
  const afterKeys = await canvas.screenshot();
  expect(beforeKeys.equals(afterKeys), 'Focused arrow keys change the rendered character position').toBe(false);
  expect(await page.evaluate(() => scrollY), 'Arrow movement does not scroll the page').toBe(scrollBefore);
  await expect(page.getByRole('button', { name: 'Resume scene animation' })).toBeVisible();
});

test('work filters, expanded collection, case studies, image gallery, and résumé work', async ({ page, request }) => {
  await loadWorld(page);
  await expect(page.locator('#project-grid article')).toHaveCount(3);
  await page.getByRole('button', { name: 'Project & operations', exact: true }).click();
  await expect(page.locator('#project-grid article')).toHaveCount(1);
  const currentRole = page.getByRole('button', { name: 'Read From request to delivery project story' });
  await currentRole.click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page.locator('#dialog-title')).toHaveText('From request to delivery');
  await expect(page.getByRole('dialog')).toContainText('Print Project Coordinator');
  await expect(page.getByRole('dialog')).toContainText('20+ external vendors');
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toBeHidden();
  await expect(currentRole).toBeFocused();

  await page.getByRole('button', { name: 'Earlier digital work', exact: true }).click();
  await expect(page.locator('#project-grid article')).toHaveCount(3);
  await page.getByRole('button', { name: 'Explore the rest' }).click();
  await expect(page.locator('#project-grid article')).toHaveCount(8);
  await page.getByRole('button', { name: /^All work/ }).click();
  await page.getByRole('button', { name: 'Explore the rest' }).click();
  await expect(page.locator('#project-grid article')).toHaveCount(9);

  await page.getByRole('button', { name: 'Read BIWTA project story' }).click();
  await page.getByText('Explore the prototype screens', { exact: true }).click();
  await expect(page.locator('.project-gallery figure')).toHaveCount(5);
  await page.locator('.project-gallery figure').last().scrollIntoViewIfNeeded();
  await expect.poll(() => page.locator('.project-gallery img').evaluateAll(images => images.every(image => image.complete && image.naturalWidth > 0))).toBe(true);
  await page.getByRole('button', { name: 'Close project' }).click();

  const resume = await request.get('/nazmus-saqib-resume.pdf');
  expect(resume.status()).toBe(200);
  expect(resume.headers()['content-type']).toContain('application/pdf');
  expect((await resume.body()).subarray(0, 5).toString()).toBe('%PDF-');
  await expect(page.getByRole('link', { name: 'Get the full résumé' })).toHaveAttribute('download', '');
  await expect(page.getByRole('link', { name: 'Let’s start a conversation' })).toHaveAttribute('href', 'mailto:saqib.uxui@gmail.com');
});

test('mobile visitors can explore, read projects, and browse without horizontal overflow', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await loadWorld(page);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.getByRole('button', { name: 'Explore freely' }).click();
  await page.getByRole('button', { name: 'Move right', exact: true }).click();
  await page.getByRole('button', { name: 'Visit chapter 3: Growth' }).click();
  await expect(page.locator('#story-copy')).toContainText('Project Management at Fleming College');
  await page.getByRole('button', { name: 'Read From request to delivery project story' }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page.locator('#dialog-title')).toHaveText('From request to delivery');
  await page.getByRole('button', { name: 'Close project' }).click();
  await page.getByRole('button', { name: 'Switch to reading view' }).click();
  await expect(page.locator('#reading-view')).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test('reduced motion keeps chapter navigation and the static 3D story usable', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await loadWorld(page);
  await expect(page.getByRole('button', { name: 'Resume scene animation' })).toBeVisible();
  const before = await page.locator('canvas.world-canvas').screenshot();
  await page.getByRole('button', { name: 'Visit chapter 2: Systems' }).click();
  await expect(page.locator('#story-copy')).toContainText('iStoreiSend');
  const after = await page.locator('canvas.world-canvas').screenshot();
  expect(before.equals(after), 'Changing chapters redraws the character without continuous motion').toBe(false);
  await page.getByRole('button', { name: 'Switch to reading view' }).click();
  await expect(page.locator('#reading-view article')).toHaveCount(4);
});

test('devices without WebGL get a complete readable journey and usable work section', async ({ page }) => {
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function(type, ...args) {
      if (String(type).startsWith('webgl') || type === 'experimental-webgl') return null;
      return original.call(this, type, ...args);
    };
  });
  await page.goto('/');
  await expect(page.locator('.world-fallback')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Explore freely' })).toBeDisabled();
  await page.getByRole('button', { name: 'Read my journey' }).click();
  await expect(page.locator('#reading-view')).toBeVisible();
  await expect(page.locator('#reading-view article')).toHaveCount(4);
  await expect(page.locator('#reading-view')).toContainText('Identify BDA');
  await page.getByRole('button', { name: 'Read From request to delivery project story' }).click();
  await expect(page.locator('#dialog-title')).toHaveText('From request to delivery');
});
