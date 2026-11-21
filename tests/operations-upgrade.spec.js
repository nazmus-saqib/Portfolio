import { test, expect } from '@playwright/test';

const siteUrl = (baseURL, project) => `${baseURL.replace(/\/?$/, '/')}?project=${project}`;

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
});

test('Operations separates documented examples, recurring methods and the role overview', async ({ page, baseURL }) => {
  await page.goto(baseURL);
  await page.locator('#panel-nav [data-panel="projects"]').click();
  await expect(page.getByRole('button', { name: 'Operations', exact: true })).toHaveAttribute('aria-pressed', 'true');
  const groups = page.locator('[data-project-group]');
  await expect(groups.locator(':scope > h2')).toHaveText(['Documented Projects', 'How I Work', 'Role overview']);
  await expect(page.locator('.case-open')).toHaveCount(6);
  expect(await page.locator('.case-open').evaluateAll(buttons => buttons.map(button => button.dataset.project))).toEqual([
    'conference', 'multi-city-event', 'invoice-investigation', 'supplier-coordination', 'change-coordination', 'identify',
  ]);
  for (const [id, type] of [
    ['multi-city-event', 'Project example'], ['invoice-investigation', 'Project example'],
    ['supplier-coordination', 'Recurring workflow'], ['change-coordination', 'Recurring workflow'], ['identify', 'Role overview'],
  ]) {
    const card = page.locator(`.case-open[data-project="${id}"]`);
    await expect(card).toContainText(type);
    await card.focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('#project-dialog')).toBeVisible();
    await expect(page.locator('#project-dialog')).toContainText(type);
    await expect(page.locator('[data-copy-project-link]')).toHaveCount(0);
    await page.keyboard.press('Escape');
    await expect(card).toBeFocused();
  }
  await page.getByRole('button', { name: 'Earlier digital work', exact: true }).click();
  await expect(page.locator('.case-open')).toHaveCount(8);
  await page.getByRole('button', { name: 'All work', exact: true }).click();
  await expect(page.locator('.case-open')).toHaveCount(14);
});

for (const width of [1440, 320]) {
  test(`new project examples preserve bounded outcomes, ownership and history at ${width}px`, async ({ page, baseURL }) => {
    await page.setViewportSize({ width, height: 850 });
    await page.goto(siteUrl(baseURL, 'multi-city-event'));
    await expect(page.locator('[data-coordination-case]')).toHaveAttribute('data-coordination-case', 'multi-city-event');
    const multiResult = page.locator('.coordination-result');
    await expect(multiResult).toContainText(/ready for collection/i);
    await expect(multiResult).toContainText(/receipt.*acceptance.*not.*(established|confirmed)/i);
    await page.reload();
    await expect(page.locator('[data-coordination-case]')).toHaveAttribute('data-coordination-case', 'multi-city-event');
    const ownership = page.locator('.coordination-ownership');
    await expect(ownership.getByRole('heading', { name: 'Who did what', exact: true })).toBeVisible();
    await expect(ownership.locator('dl')).toBeVisible();
    await expect(ownership).toContainText(/vendor|supplier/i);
    await page.keyboard.press('Escape');
    await expect(page.locator('#project-dialog')).not.toBeVisible();
    await page.locator('#panel-nav [data-panel="projects"]').click();
    await page.locator('.case-open[data-project="invoice-investigation"]').click();
    await expect(page.locator('.coordination-result')).toContainText(/administrator.*(different|distinct) work/i);
    await expect(page.locator('.coordination-result')).toContainText(/recovery.*balance.*not established/i);
    await expect(page.locator('.coordination-ownership dl')).toBeVisible();
    await expect(page.locator('.coordination-ownership')).toContainText(/administrator/i);
    await expect(page.locator('.coordination-ownership')).toContainText(/payment follow-up/i);
    await page.reload();
    await expect(page.locator('[data-coordination-case]')).toHaveAttribute('data-coordination-case', 'invoice-investigation');
    await page.goBack();
    await expect(page.locator('#project-dialog')).not.toBeVisible();
    await page.goForward();
    await expect(page.locator('[data-coordination-case]')).toHaveAttribute('data-coordination-case', 'invoice-investigation');
    await page.keyboard.press('Escape');
    await expect(page.locator('#project-dialog')).not.toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });
}

test('risk notes describe the real Trello practice and clearly identify the proposed illustration', async ({ page, baseURL }) => {
  await page.goto(siteUrl(baseURL, 'change-coordination'));
  const dialog = page.locator('#project-dialog');
  await expect(dialog.locator('#dialog-title')).toHaveText('Managing Project Risks, Changes & Delivery Dependencies');
  await expect(dialog.locator('.case-summary')).toContainText(/Trello card descriptions/i);
  await expect(dialog.locator('.case-summary')).toContainText(/CEO.*when needed/i);
  await expect(dialog).toContainText(/risk.*(future|could|potential)/i);
  await expect(dialog).toContainText(/issue.*(occurred|happened|already)/i);
  const reconstructed = dialog.locator('[data-coordination-template="trello-description"]');
  await expect(reconstructed.getByRole('heading', { name: 'Illustrative risk note based on Trello descriptions', exact: true })).toBeVisible();
  await expect(reconstructed.getByRole('region')).toBeVisible();
  await expect(reconstructed).toContainText(/proposed|suggested/i);
  await expect(reconstructed).toContainText(/not.*(standard|previous|original)/i);
  await expect(reconstructed).toContainText(/artwork/i);
  await expect(reconstructed).toContainText(/CEO/i);
  await page.goto(siteUrl(baseURL, 'supplier-coordination'));
  const comparison = page.locator('[data-coordination-template="supplier-comparison"]');
  await expect(comparison).toContainText('Vendor A');
  await expect(comparison).toContainText('Vendor B');
  await expect(comparison).toContainText(/delivery risk/i);
  await expect(comparison).toContainText(/approval owner/i);
});

test('personal AI fluency and practical risk awareness remain distinct from workplace results', async ({ page, baseURL }) => {
  await page.goto(baseURL);
  await page.locator('.professional-quick-view > summary').click();
  await expect(page.locator('.professional-quick-view')).toContainText(/risk/i);
  await expect(page.locator('.professional-quick-view')).toContainText(/Trello card descriptions/i);
  await page.locator('[data-profile-tab="1"]').click();
  const skills = page.locator('#profile-view-1');
  await expect(skills).toContainText(/Risk Awareness.*Delivery Dependencies/i);
  await page.locator('[data-profile-tab="2"]').click();
  const learning = page.locator('#profile-view-2');
  await expect(learning).toContainText(/Personal AI-assisted productivity/i);
  await expect(learning).toContainText(/Codex/);
  await expect(learning).toContainText(/GitHub/);
  await expect(learning).toContainText(/review outputs before relying/i);
  await expect(learning).not.toContainText(/employer-wide AI automation|saved \d+ hours/i);
});
