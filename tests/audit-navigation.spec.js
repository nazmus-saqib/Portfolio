import { test, expect } from '@playwright/test';
import { projects } from '../src/content.js';

const siteUrl = (baseURL, params = '') => `${baseURL.replace(/\/?$/, '/')}?${params}`;

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
});

test('every project has a refreshable direct link, while invalid project IDs recover safely', async ({ page, baseURL }) => {
  test.setTimeout(120_000);
  for (const project of projects) {
    await page.goto(siteUrl(baseURL, `ref=recruiter&project=${encodeURIComponent(project.id)}`));
    await expect(page.locator('#project-dialog')).toBeVisible();
    await expect(page.locator('#dialog-title')).toHaveText(project.title);
    await expect(page.locator('.case-project-tools')).toHaveCount(1);
    await expect(page.locator('.case-project-tools')).toContainText('Tools & methods');
    for (const tool of project.tools) await expect(page.locator('.case-project-tools')).toContainText(tool);
    expect(new URL(page.url()).searchParams.get('ref')).toBe('recruiter');
    await page.locator('#dialog-close').click();
    await expect(page.locator('#project-dialog')).not.toBeVisible();
    expect(new URL(page.url()).searchParams.has('project')).toBe(false);
    expect(new URL(page.url()).searchParams.get('ref')).toBe('recruiter');
  }
  await page.goto(siteUrl(baseURL, 'ref=recruiter&project=unknown-project'));
  await expect(page.locator('#about-card')).toBeVisible();
  await expect(page.locator('#project-dialog')).not.toBeVisible();
  expect(new URL(page.url()).searchParams.has('project')).toBe(false);
  expect(new URL(page.url()).searchParams.get('ref')).toBe('recruiter');
});

test('project links follow back/forward, survive reload, and Escape removes only the project parameter', async ({ page, baseURL }) => {
  await page.goto(siteUrl(baseURL, 'ref=career'));
  await page.locator('#panel-nav [data-panel="projects"]').click();
  await page.locator('[data-filter="digital"]').click();
  await page.locator('[data-project="ereturn"]').click();
  await expect(page.locator('#dialog-title')).toHaveText('eReturn');
  expect(new URL(page.url()).searchParams.get('project')).toBe('ereturn');
  await page.goBack();
  await expect(page.locator('#project-dialog')).not.toBeVisible();
  await page.goForward();
  await expect(page.locator('#dialog-title')).toHaveText('eReturn');
  await page.reload();
  await expect(page.locator('#dialog-title')).toHaveText('eReturn');
  await page.keyboard.press('Escape');
  await expect(page.locator('#project-dialog')).not.toBeVisible();
  expect(new URL(page.url()).searchParams.has('project')).toBe(false);
  expect(new URL(page.url()).searchParams.get('ref')).toBe('career');
});

test('case-study link copying provides a usable fallback when clipboard permission is denied', async ({ page, baseURL }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'clipboard', { value: { writeText: async () => { throw new Error('Permission denied'); } }, configurable: true });
  });
  await page.goto(siteUrl(baseURL, 'project=ereturn'));
  await page.getByRole('button', { name: 'Copy case study link', exact: false }).click();
  const field = page.getByRole('textbox', { name: 'Case study link', exact: true });
  await expect(field).toBeVisible();
  await expect(field).toHaveValue(page.url());
  await expect(field).toBeFocused();
});

test('Reading view preserves About tabs, project filters, Contact, and their reading positions', async ({ page, baseURL }) => {
  await page.goto(baseURL);
  await page.locator('[data-profile-tab="1"]').click();
  await page.locator('#sidebar-body').evaluate(node => { node.scrollTop = 160; });
  const before = await page.locator('#sidebar-body').evaluate(node => node.scrollTop);
  await page.locator('#reading-toggle').click();
  await expect(page.locator('#panel-nav [data-panel="profile"]')).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('[data-profile-tab="1"]')).toHaveAttribute('aria-selected', 'true');
  const position = await page.locator('#sidebar-body').evaluate(node => ({ top: node.scrollTop, max: node.scrollHeight - node.clientHeight }));
  expect(position.top).toBeCloseTo(Math.min(before, position.max), 0);
  await page.locator('#reading-toggle').click();
  await expect(page.locator('[data-profile-tab="1"]')).toHaveAttribute('aria-selected', 'true');
  await page.locator('#panel-nav [data-panel="projects"]').click();
  await page.locator('[data-filter="operations"]').click();
  await page.locator('#reading-toggle').click();
  await expect(page.locator('#panel-nav [data-panel="projects"]')).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('[data-filter="operations"]')).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('.project-list .case-card')).toHaveCount(4);
  await page.locator('#panel-nav [data-panel="contact"]').click();
  await page.locator('#reading-toggle').click();
  await expect(page.locator('#panel-nav [data-panel="contact"]')).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('.contact-email')).toHaveAttribute('href', 'mailto:saqibmollanazmus@gmail.com');
});

test('mobile keeps a readable résumé action and direct access to current experience', async ({ page, baseURL, request }) => {
  await page.setViewportSize({ width: 320, height: 780 });
  const worldRequests=[];
  page.on('request',request=>{if(/(?:world-[^/]+\.js|\/src\/world\.js)(?:\?|$)/.test(request.url()))worldRequests.push(request.url());});
  await page.goto(baseURL);
  const resume = page.locator('.header-actions .resume-link');
  await expect(resume).toBeVisible();
  expect(await resume.evaluate(node => parseFloat(getComputedStyle(node).fontSize))).toBeGreaterThanOrEqual(14);
  expect((await request.get(await resume.getAttribute('href'))).status()).toBe(200);
  await expect(page.locator('.professional-position')).toBeVisible();
  await expect(page.locator('#world-pane')).not.toBeVisible();
  await expect(page.locator('canvas.world-canvas')).toHaveCount(0);
  expect(worldRequests).toEqual([]);
  await page.locator('#mobile-world-toggle').click();
  await expect(page.locator('#world-pane')).toBeVisible();
  await expect(page.locator('canvas.world-canvas')).toBeVisible();
  await expect(page.locator('#world')).toHaveAttribute('data-active-station','-1');
  await expect.poll(()=>worldRequests.length).toBeGreaterThan(0);
  await expect(page.locator('#mobile-world-toggle')).toHaveAttribute('aria-expanded', 'true');
  await page.locator('#mobile-world-toggle').click();
  await expect(page.locator('#world-pane')).not.toBeVisible();
  await page.locator('.professional-current[data-current-experience]').click();
  await expect(page.locator('#company-name')).toHaveText('Identify BDA');
  await expect(page.locator('#company-role')).toHaveText('Project Coordinator');
  // A visitor can enter reading mode on a phone, then resume 3D after resizing.
  await page.goto(baseURL);
  await page.locator('#reading-toggle').click();
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.locator('#reading-toggle').click();
  await expect(page.locator('canvas.world-canvas')).toBeVisible();
  await expect(page.locator('#world')).toHaveAttribute('data-active-station', '-1');
});


test('related coordination cases open inside the dialog and remain navigable with browser history', async ({page,baseURL})=>{
  await page.goto(siteUrl(baseURL,'project=change-coordination'));
  await page.locator('#project-dialog [data-project="conference"]').click();
  await expect(page.locator('#dialog-title')).toHaveText('Coordinating a $55,000 conference project');
  expect(new URL(page.url()).searchParams.get('project')).toBe('conference');
  await page.goBack();
  await expect(page.locator('#dialog-title')).toHaveText('Managing changes and urgent orders');
  await page.keyboard.press('Escape');
  await expect(page.locator('#project-dialog')).not.toBeVisible();
  await expect(page.locator('#panel-nav [data-panel="profile"]')).toBeFocused();
});
