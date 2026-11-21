import { test, expect } from '@playwright/test';
import { careerStops, formatTenure } from '../src/content.js';

const companies = ['Synesis IT', 'iQuantile', 'iStoreiSend', 'Dynamic Infotech', 'UPS & Staples', 'Identify BDA'];
const journeyCompanies = ['Identify BDA', 'UPS & Staples', 'Dynamic Infotech', 'iStoreiSend', 'iQuantile', 'Synesis IT'];
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

async function loadHome(page, baseURL) {
  await page.goto(baseURL || '/');
  await expect(page.locator('#world-loading')).toHaveClass(/loaded/);
  if (page.viewportSize().width <= 860) {
    await expect(page.locator('#world-pane')).toBeHidden();
    await expect(page.locator('canvas.world-canvas')).not.toBeVisible();
    await expect(page.locator('#mobile-world-toggle')).toBeVisible();
    await expect(page.locator('#mobile-world-toggle')).toHaveAttribute('aria-expanded', 'false');
  } else {
    await expect(page.locator('canvas.world-canvas')).toBeVisible();
    await expect(page.locator('.world-label')).toHaveCount(6);
  }
}

async function loadWorld(page, baseURL) {
  await loadHome(page, baseURL);
  await page.locator('#panel-nav button[data-panel="journey"]').click();
  await expect(page.locator('canvas.world-canvas')).toBeVisible();
  await expect(page.locator('.world-label')).toHaveCount(6);
}

async function selectCompany(page, company) {
  const chapter = String(companies.indexOf(company) + 1).padStart(2, '0');
  await page.getByRole('button', { name: `Visit company ${chapter} ${company}`, exact: true }).click();
  await expect(page.locator('#company-name')).toHaveText(company);
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

async function assertContributionDescriptionsVisible(page, stop) {
  const contribution = page.locator(`[data-role-contributions="${stop.id}"]`);
  await expect(contribution.getByRole('heading', { name: 'What I brought to the work', exact: true })).toBeVisible();
  const cards = contribution.locator('.contribution-cards [data-contribution-index]');
  const takeaway = contribution.locator('.contribution-takeaway');
  const items = takeaway.locator('.contribution-takeaway-item');
  await expect(cards).toHaveCount(stop.highlights.length);
  await expect(takeaway).toHaveCount(1);
  await expect(takeaway.getByText('What I carry forward', { exact: true })).toHaveCount(1);
  await expect(items).toHaveCount(stop.highlights.length);
  await expect(takeaway.locator('.contribution-takeaway-title')).toHaveCount(0);
  expect(await contribution.evaluate(element => {
    const cards = element.querySelector('.contribution-cards');
    const takeaway = element.querySelector('.contribution-takeaway');
    return !cards.contains(takeaway) && Boolean(cards.compareDocumentPosition(takeaway) & Node.DOCUMENT_POSITION_FOLLOWING);
  }), 'One takeaway card follows the complete contribution stack').toBe(true);
  for (let index = 0; index < stop.highlights.length; index += 1) {
    const card = cards.nth(index);
    const item = items.nth(index);
    await expect(card.getByText(stop.highlights[index], { exact: true })).toBeVisible();
    await expect(item).toBeVisible();
    await expect(item.locator('.contribution-takeaway-copy')).not.toBeEmpty();
    const takeawayId = await item.getAttribute('id');
    expect(takeawayId, 'Each takeaway row has an addressable ID').toMatch(/\S+/);
    await expect(card, 'Each contribution controls its matching takeaway row').toHaveAttribute('aria-controls', takeawayId);
  }
  return contribution;
}

test('Meet me today offers email options without changing the selected panel or Journey stop', async ({ page, baseURL }) => {
  await loadHome(page, baseURL);
  const meetMe = page.getByRole('link', { name: 'Meet me today', exact: false });
  await expect(meetMe).toHaveAttribute('id', 'go-today');
  await expect(meetMe).toHaveAttribute('href', 'mailto:saqibmollanazmus@gmail.com');
  await expect(meetMe).toHaveJSProperty('tagName', 'A');
  const originalURL = page.url();

  await meetMe.click();
  const emailDialog = page.getByRole('dialog', { name: 'Send an email', exact: true });
  await expect(emailDialog).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(emailDialog).not.toBeVisible();
  await expect(meetMe).toBeFocused();
  await expect(page.locator('#panel-nav [data-panel="profile"]')).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('#profile-view-0 #about-card')).toBeVisible();
  await expect(page.locator('#world')).toHaveAttribute('data-active-station', '-1');
  expect(page.url()).toBe(originalURL);

  await page.locator('#panel-nav button[data-panel="journey"]').click();
  await selectCompany(page, 'iQuantile');
  await meetMe.focus();
  await page.keyboard.press('Enter');
  await expect(emailDialog).toBeVisible();
  await emailDialog.getByRole('button', { name: 'Close email options', exact: true }).click();
  await expect(emailDialog).not.toBeVisible();
  await expect(meetMe).toBeFocused();
  await expect(page.locator('#panel-nav [data-panel="journey"]')).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('#company-name')).toHaveText('iQuantile');
  await expect(page.locator('#stop-counter')).toHaveText('02 / 06');
  await expect(page.locator('#world')).toHaveAttribute('data-active-station', '1');
  expect(page.url()).toBe(originalURL);
});

test('About Me opens at the centre and preserves the personal story outside the employer Journey', async ({ page, baseURL }) => {
  await loadHome(page, baseURL);
  await expect(page.locator('#world')).toHaveAttribute('data-active-station', '-1');
  await expect(page.locator('#world')).toHaveAttribute('data-traveling', 'false');
  await expect(page.locator('[data-world-home]')).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('#panel-nav [data-panel="profile"]')).toHaveText('About Me');
  await expect(page.locator('#panel-nav [data-panel="profile"]')).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByRole('tab', { name: 'Profile', exact: true })).toHaveAttribute('aria-selected', 'true');
  const about = page.locator('#profile-view-0 #about-card');
  await expect(about).toBeVisible();
  await expect(about.getByRole('heading', { name: 'Molla Nazmus Saqib', exact: true })).toBeVisible();
  await expect(about.locator('.professional-position')).toHaveText('Project & Operations Coordinator');
  await expect(about.locator('.professional-actions')).toHaveCount(0);
  await expect(about.getByRole('button', { name: 'View conference case study', exact: false })).toHaveCount(0);
  await expect(about.getByRole('link', { name: 'Download résumé', exact: true })).toHaveCount(0);
  await expect(about.getByRole('button', { name: 'Contact me', exact: true })).toHaveCount(0);
  await expect(page.locator('.header-actions .resume-link')).toBeVisible();
  const professionalCopy = about.locator('.professional-summary');
  await expect(professionalCopy).toHaveText('I connect requirements, stakeholders, suppliers, schedules and deliverables to move projects forward. My work includes quotation analysis, approvals, delivery coordination, practical risk monitoring, issue resolution and financial follow-up. I bring technical experience and formal project management education to cross-functional operations.');
  await expect(professionalCopy).not.toContainText('I’m seeking opportunities');
  await expect(page.locator('#reading-toggle')).toContainText('Focus on content');
  const desktopBalance = await page.locator('.experience-layout').evaluate(node => {
    const world = node.querySelector('.world-pane').getBoundingClientRect().width;
    const content = node.querySelector('.sidebar').getBoundingClientRect().width;
    return world / content;
  });
  expect(desktopBalance).toBeGreaterThanOrEqual(0.95);
  expect(desktopBalance).toBeLessThanOrEqual(1.05);
  await page.setViewportSize({width:1000,height:800});
  await expect.poll(()=>page.locator('.world-label').evaluateAll(labels=>{
    const boxes=labels.filter(label=>getComputedStyle(label).visibility==='visible').map(label=>label.getBoundingClientRect());
    return boxes.reduce((total,a,i)=>total+boxes.slice(i+1).filter(b=>Math.min(a.right,b.right)>Math.max(a.left,b.left)&&Math.min(a.bottom,b.bottom)>Math.max(a.top,b.top)).length,0);
  })).toBe(0);
  await page.setViewportSize({width:1440,height:1000});
  const personal = about.locator('#about-personal');
  const quickWork = about.locator('.professional-quick-view');
  await expect(about.locator('.professional-personal-links')).toHaveCount(0);
  await expect(about.getByRole('button', { name: 'My story: Bangladesh to Canada', exact: true })).toHaveCount(0);
  for (const card of [quickWork, personal]) {
    await expect(card).not.toHaveAttribute('open', '');
    await expect(card.locator('summary .profile-preview-excerpt')).toBeVisible();
    await expect(card.locator('summary .profile-preview-excerpt')).not.toHaveText('');
    await expect(card.locator('summary .profile-preview-toggle')).toBeVisible();
  }
  const quickWorkBody = quickWork.locator(':scope > div');
  await expect(quickWorkBody).toBeHidden();
  await quickWork.locator('summary').focus();
  await page.keyboard.press('Enter');
  await expect(quickWork).toHaveAttribute('open', '');
  await expect(quickWorkBody).toBeVisible();
  await expect(quickWorkBody).toContainText('Complex delivery');
  expect(await quickWork.locator('summary .profile-preview-excerpt').evaluate(node => node.scrollHeight <= node.clientHeight + 1)).toBe(true);
  await page.keyboard.press('Space');
  await expect(quickWork).not.toHaveAttribute('open', '');
  await expect(quickWorkBody).toBeHidden();
  await expect(personal.locator('.about-motivation')).toBeHidden();
  await expect(page.locator('.profile-stat-grid')).toHaveCount(0);
  await expect(about.locator('.about-position')).toHaveCount(0);
  await personal.locator(':scope > summary').click();
  await expect(personal).toHaveAttribute('open', '');
  expect(await personal.locator('summary .profile-preview-excerpt').evaluate(node => node.scrollHeight <= node.clientHeight + 1)).toBe(true);
  for (const text of ['About Me & My Story', 'Molla Nazmus Saqib', 'Bringing it all together.', 'Bangladesh', 'Canada', '2022', 'Centennial College', 'Sir Sandford Fleming College', 'October 2024', 'Fine Tuned Autos']) {
    await expect(about).toContainText(text);
  }
  await expect(about).toContainText(/two months/i);
  await expect(about.getByRole('link', { name: 'Fine Tuned Autos', exact: true })).toHaveAttribute('href', 'https://finetunedautos.ca/');
  await expect(personal).not.toContainText('Assistant Project Manager');
  await expect(about).not.toContainText('Where I’m headed');
  await expect(page.locator('.profile-target')).toHaveCount(0);
  await page.getByRole('button', { name: 'Read my story: Bangladesh to Canada', exact: true }).click();
  await expect(page.locator('#about-story-title')).toBeInViewport();
  await expect(page.locator('#about-story-title')).toBeFocused();
  await expect(page.locator('#story-panel-0')).toBeVisible();
  await expect(page.locator('#story-panel-0')).toContainText('North South University');
  await page.locator('[data-story-milestone="1"]').click();
  await expect(page.locator('#story-panel-1')).toBeVisible();
  await expect(page.locator('#story-panel-1')).toContainText('2022');
  await expect(page.locator('#story-panel-1')).toContainText('Centennial College');
  await expect(page.locator('#story-panel-1')).toContainText('Sir Sandford Fleming College');
  await page.keyboard.press('ArrowRight');
  await expect(page.locator('[data-story-milestone="2"]')).toBeFocused();
  await expect(page.locator('[data-story-milestone="2"]')).toHaveAttribute('aria-selected', 'true');
  await expect(page.locator('#story-panel-2')).toBeVisible();
  await expect(page.locator('#story-panel-2')).toContainText('Project Coordinator');
  await expect(page.locator('#story-panel-2')).toContainText('Identify BDA');
  await expect(page.locator('#story-journey [role="tabpanel"]:visible')).toHaveCount(1);
  await page.keyboard.press('Home');
  await expect(page.locator('[data-story-milestone="0"]')).toBeFocused();
  await expect(page.locator('#story-panel-0')).toBeVisible();
  await page.keyboard.press('End');
  await expect(page.locator('[data-story-milestone="2"]')).toBeFocused();
  await expect(page.locator('#story-panel-2')).toBeVisible();
  await page.getByRole('button', { name: 'Read about my auto repair learning', exact: true }).click();
  await expect(page.locator('#about-learning-title')).toBeInViewport();
  await expect(page.locator('#about-learning-title')).toBeFocused();
  await assertSingleViewport(page);

  await page.locator('#panel-nav button[data-panel="journey"]').click();
  await expect(page.locator('#company-name')).toHaveText('Identify BDA');
  await expect(page.locator('#company-card .eyebrow')).toHaveText('06 / Canada');
  await expect(page.locator('#stop-counter')).toHaveText('06 / 06');
  await expect(page.locator('#about-card')).toHaveCount(0);
  await expect(page.locator('#previous-stop')).toBeDisabled();
  await page.locator('#next-stop').click();
  await expect(page.locator('#company-name')).toHaveText('UPS & Staples');
  await expect(page.locator('#previous-stop')).toBeEnabled();
  await page.locator('#previous-stop').click();
  await expect(page.locator('#company-name')).toHaveText('Identify BDA');
  await expect(page.locator('#previous-stop')).toBeDisabled();

  await page.locator('#panel-nav button[data-panel="profile"]').click();
  await page.getByRole('tab', { name: 'Profile', exact: true }).click();
  await expect(page.locator('#panel-nav [data-panel="profile"]')).toHaveAttribute('aria-pressed', 'true');
  await expect(about).toBeVisible();
  await page.locator('#panel-nav button[data-panel="journey"]').click();
  await expect(page.locator('#company-name')).toHaveText('Identify BDA');
  await selectCompany(page, 'UPS & Staples');
  await page.locator('#panel-nav button[data-panel="profile"]').click();
  await page.locator('.professional-current[data-current-experience]').click();
  await expect(page.locator('#company-name')).toHaveText('Identify BDA');
  await page.getByRole('button', { name: 'Nazmus Saqib, About Me', exact: true }).click();
  await expect(about).toBeVisible();
  await expect(page.locator('#world')).toHaveAttribute('data-active-station', '-1');
  await page.locator('#panel-nav button[data-panel="journey"]').click();
  await expect(page.locator('#company-name')).toHaveText('Identify BDA');

  await page.locator('#reading-toggle').click();
  await expect(page.locator('#reading-view .reading-company')).toHaveCount(6);
  await expect(page.locator('#reading-view > .reading-company').first()).toContainText('06 / Canada');
  await expect(page.locator('#reading-view #about-card')).toHaveCount(0);
  await page.locator('#panel-nav button[data-panel="profile"]').click();
  await page.getByRole('tab', { name: 'Profile', exact: true }).click();
  await expect(about).toBeVisible();
  await personal.locator(':scope > summary').click();
  await page.locator('[data-story-milestone="2"]').click();
  await about.getByText('In October 2024,', { exact: false }).scrollIntoViewIfNeeded();
  await assertSingleViewport(page);
});

test('the centre About Me control returns from every workplace and preserves the remembered Journey stop', async ({ page, baseURL }) => {
  await loadHome(page, baseURL);
  const home = page.getByRole('button', { name: 'Go to About Me', exact: true });
  await expect(home).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('#world')).toHaveAttribute('data-active-station', '-1');
  await expect(page.locator('#world')).toHaveAttribute('data-traveling', 'false');

  for (const company of companies) {
    await selectCompany(page, company);
    await expect(page.locator('#company-name')).toHaveText(company);
    await expect(home).toHaveAttribute('aria-pressed', 'false');
    await home.click();
    await expect(page.locator('#world')).toHaveAttribute('data-active-station', '-1');
    await expect(home).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('#panel-nav [data-panel="profile"]')).toHaveAttribute('aria-pressed', 'true');
    await expect(page.getByRole('tab', { name: 'Profile', exact: true })).toHaveAttribute('aria-selected', 'true');
    await expect(page.locator('#profile-view-0 #about-card')).toBeVisible();
    await page.locator('#panel-nav button[data-panel="journey"]').click();
    await expect(page.locator('#company-name')).toHaveText(company);
    await expect(page.locator('#world')).toHaveAttribute('data-active-station', String(companies.indexOf(company)));
  }

  await page.locator('#panel-nav button[data-panel="profile"]').click();
  await page.getByRole('tab', { name: 'Skills', exact: true }).click();
  await page.locator('#panel-nav button[data-panel="journey"]').click();
  await expect(page.locator('#company-name')).toHaveText('Identify BDA');
  await page.locator('#panel-nav button[data-panel="profile"]').click();
  await expect(page.getByRole('tab', { name: 'Skills', exact: true })).toHaveAttribute('aria-selected', 'true');
  await expect(page.locator('#world')).toHaveAttribute('data-active-station', '-1');
  await page.locator('#panel-nav button[data-panel="journey"]').click();
  await expect(page.locator('#company-name')).toHaveText('Identify BDA');
  await home.focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('tab', { name: 'Profile', exact: true })).toHaveAttribute('aria-selected', 'true');
  await expect(page.locator('#world')).toHaveAttribute('data-active-station', '-1');
  await page.locator('#panel-nav button[data-panel="journey"]').click();
  await expect(page.locator('#company-name')).toHaveText('Identify BDA');
  await page.getByRole('button', { name: 'Nazmus Saqib, About Me', exact: true }).click();
  await expect(page.locator('#profile-view-0 #about-card')).toBeVisible();
  await expect(home).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('#world')).toHaveAttribute('data-active-station', '-1');
  await assertSingleViewport(page);
});

test('returning to the centre walks home and exits free exploration', async ({ page, baseURL }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await loadHome(page, baseURL);
  const campus = page.locator('#world');
  await expect(campus).toHaveAttribute('data-active-station', '-1');
  await expect(campus).toHaveAttribute('data-traveling', 'false');
  await page.locator('.professional-current[data-current-experience]').click();
  await expect(page.locator('#company-name')).toHaveText('Identify BDA');
  await expect(campus).toHaveAttribute('data-traveling', 'false', { timeout: 15_000 });
  await page.locator('#explore-toggle').click();
  await expect(page.locator('#explore-toggle')).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('button', { name: 'Go to About Me', exact: true }).click();
  await expect(campus).toHaveAttribute('data-traveling', 'true');
  await expect(campus).toHaveAttribute('data-active-station', '-1');
  await expect(page.locator('#explore-toggle')).toHaveAttribute('aria-pressed', 'false');
  await expect(page.locator('#touch-controls')).toBeHidden();
  await expect(page.locator('#profile-view-0 #about-card')).toBeVisible();
  await expect(campus).toHaveAttribute('data-traveling', 'false', { timeout: 15_000 });
  await expect(page.getByRole('button', { name: 'Go to About Me', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await assertSingleViewport(page);
});

test('Journey starts with current work and walks through six employers from current to previous', async ({ page, baseURL }) => {
  // Original company numbers and physical station positions stay fixed; the reader follows the reverse career sequence.
  expect(careerStops.map(stop => stop.company)).toEqual(companies);
  await loadWorld(page, baseURL);
  await expect(page.locator('.world-label')).toHaveText(journeyCompanies.map(company => `${String(companies.indexOf(company) + 1).padStart(2, '0')} ${company}`));
  await expect(page.locator('.journey-footer')).toHaveCount(0);
  await expect(page.locator('#company-name')).toHaveText('Identify BDA');
  await expect(page.locator('#company-role')).toHaveText('Project Coordinator');
  await expect(page.locator('#company-dates')).toHaveText('Oct 2024–Present');
  await expect(page.locator('#world')).toHaveAttribute('data-active-station', '5');
  await expect(page.locator('#previous-stop')).toHaveAttribute('aria-label', 'More recent role');
  await expect(page.locator('#previous-stop')).toBeDisabled();

  for (const [index, company] of journeyCompanies.entries()) {
    if (index > 0) {
      await expect(page.locator('#next-stop')).toContainText('Previous role');
      await page.locator('#next-stop').click();
    }
    const physicalIndex = companies.indexOf(company);
    const stop = careerStops[physicalIndex];
    const chapter = String(physicalIndex + 1).padStart(2, '0');
    await expect(page.locator('#company-name')).toHaveText(company);
    await expect(page.locator('#company-card .eyebrow')).toHaveText(`${chapter} / ${stop.location}`);
    await expect(page.locator('#stop-counter')).toHaveText(`${chapter} / 06`);
    await expect(page.locator('#world')).toHaveAttribute('data-active-company', company);
    await expect(page.locator('#world')).toHaveAttribute('data-active-station', String(physicalIndex));
    if (company === 'iStoreiSend') await expect(page.locator('canvas.world-canvas')).toHaveAttribute('aria-label', /automated fulfillment.*robotic parcel handler/i);
    if (company === 'Dynamic Infotech') await expect(page.locator('canvas.world-canvas')).toHaveAttribute('aria-label', /desktop computer setup.*server rack/i);
    await expect(page.getByRole('button', { name: `Visit company ${chapter} ${company}`, exact: true })).toHaveAttribute('aria-pressed', 'true');
    await assertContributionDescriptionsVisible(page, stop);
    await expect(page.locator('#company-card .profile-stat-grid')).toHaveCount(company === 'Identify BDA' ? 1 : 0);
    if (index > 0) await expect(page.locator('#previous-stop')).toBeEnabled();
  }
  await expect(page.locator('#company-dates')).toHaveText('Aug 2020–Nov 2021');
  await expect(page.locator('#company-tenure')).toHaveText('1 yr 4 mos');
  await expect(page.locator('#next-stop')).toContainText('Back to current role');
  await page.locator('#previous-stop').click();
  await expect(page.locator('#company-name')).toHaveText('iQuantile');
  await expect(page.locator('#stop-counter')).toHaveText('02 / 06');
  await page.locator('#next-stop').click();
  await expect(page.locator('#company-name')).toHaveText('Synesis IT');
  await page.locator('#next-stop').click();
  await expect(page.locator('#company-name')).toHaveText('Identify BDA');
  await expect(page.locator('#stop-counter')).toHaveText('06 / 06');
  await expect(page.locator('#previous-stop')).toBeDisabled();

  await page.locator('#reading-toggle').click();
  const readingCards = page.locator('#reading-view > .reading-company');
  await expect(readingCards).toHaveCount(6);
  expect(await readingCards.evaluateAll(cards => cards.map(card => card.dataset.stop))).toEqual(['identify', 'ups-staples', 'dynamic', 'istoreisend', 'iquantile', 'synesis']);
  await expect(readingCards.first()).toContainText('06 / Canada');
  await expect(readingCards.last()).toContainText('01 / Dhaka, Bangladesh');
  await page.locator('#reading-toggle').click();

  await selectCompany(page, 'Synesis IT');
  await expect(page.locator('#company-dates')).toHaveText('Aug 2020–Nov 2021');
  await expect(page.locator('#company-tenure')).toHaveText('1 yr 4 mos');
  await expect(page.locator('#company-role')).toHaveText('UX Intern → UX Designer');
  await expect(page.getByRole('button', { name: 'Read BIWTA project story' })).toBeVisible();
  await selectCompany(page, 'Dynamic Infotech');
  await expect(page.locator('#company-card')).toContainText('Overlapping roles');
  await selectCompany(page, 'UPS & Staples');
  await expect(page.locator('#company-card')).toContainText('Overlapping roles');
  await assertSingleViewport(page);
});

test('contribution cards keep all takeaways together after the work and remain independent in reading view', async ({ page, baseURL }) => {
  await loadWorld(page, baseURL);
  await selectCompany(page, 'Synesis IT');
  const contribution = await assertContributionDescriptionsVisible(page, careerStops[0]);
  expect(await contribution.evaluate(element => element.closest('details'))).toBeNull();
  await expect(contribution.locator('summary, details')).toHaveCount(0);
  const cards = contribution.locator('[data-contribution-index]');
  const items = contribution.locator('.contribution-takeaway-item');
  await expect(cards).toHaveCount(3);
  await expect(contribution.locator('[data-contribution-index][aria-pressed="true"]')).toHaveCount(1);
  await expect(contribution.locator('.contribution-takeaway')).toHaveCount(1);
  await expect(items).toHaveCount(3);
  const takeawayCopies = contribution.locator('.contribution-takeaway-copy');
  const originalTakeaways = await takeawayCopies.allTextContents();

  await cards.nth(1).click();
  await expect(cards.nth(1)).toHaveAttribute('aria-pressed', 'true');
  await expect(items.nth(1)).toHaveClass(/is-active/);
  await expect(contribution.locator('.contribution-takeaway-item.is-active')).toHaveCount(1);
  await expect(takeawayCopies).toHaveText(originalTakeaways);
  await assertContributionDescriptionsVisible(page, careerStops[0]);

  await page.keyboard.press('ArrowRight');
  await expect(cards.nth(2)).toBeFocused();
  await expect(cards.nth(2)).toHaveAttribute('aria-pressed', 'true');
  await expect(items.nth(2)).toHaveClass(/is-active/);
  await page.keyboard.press('Home');
  await expect(cards.nth(0)).toBeFocused();
  await expect(items.nth(0)).toHaveClass(/is-active/);
  await expect(takeawayCopies).toHaveText(originalTakeaways);
  await page.keyboard.press('End');
  await expect(cards.nth(2)).toBeFocused();
  await expect(cards.nth(2)).toHaveAttribute('aria-pressed', 'true');
  await cards.nth(1).focus();
  await page.keyboard.press('Enter');
  await expect(cards.nth(1)).toHaveAttribute('aria-pressed', 'true');
  await expect(items.nth(1)).toHaveClass(/is-active/);
  await expect(takeawayCopies).toHaveText(originalTakeaways);
  await assertContributionDescriptionsVisible(page, careerStops[0]);

  await page.locator('#reading-toggle').click();
  await expect(page.locator('#reading-view .profile-stat-grid')).toHaveCount(1);
  const readingIdentify = page.locator('#reading-view [data-stop="identify"]');
  await expect(readingIdentify.locator('.profile-stat-grid')).toBeVisible();
  await expect(readingIdentify.locator('.profile-stat-grid > .profile-stat')).toHaveCount(2);
  await expect(readingIdentify.getByRole('list', { name: /coordination workflow/i })).toHaveCount(1);
  await expect(readingIdentify.locator('.identify-workflow-stages')).toHaveCount(1);
  await expect(readingIdentify.locator('[data-project="identify"]')).toHaveCount(1);
  await expect(page.locator('#reading-view .role-contributions')).toHaveCount(6);
  await expect(page.locator('#reading-view .contribution-takeaway')).toHaveCount(6);
  await expect(page.locator('#reading-view .contribution-takeaway-item')).toHaveCount(careerStops.reduce((total, stop) => total + stop.highlights.length, 0));
  const first = await assertContributionDescriptionsVisible(page, careerStops[0]);
  const second = await assertContributionDescriptionsVisible(page, careerStops[1]);
  const secondTakeaways = await second.locator('.contribution-takeaway-copy').allTextContents();
  const secondSelection = await second.locator('[aria-pressed="true"]').getAttribute('data-contribution-index');
  const current = Number(await first.locator('[data-contribution-index][aria-pressed="true"]').getAttribute('data-contribution-index'));
  await first.locator('[data-contribution-index]').nth((current + 1) % 3).click();
  await expect(second.locator('.contribution-takeaway-copy')).toHaveText(secondTakeaways);
  await expect(second.locator(`[data-contribution-index="${secondSelection}"]`)).toHaveAttribute('aria-pressed', 'true');
  await expect(second.locator(`[data-contribution-takeaway-index="${secondSelection}"]`)).toHaveClass(/is-active/);
  await expect(first.locator('[data-contribution-index][aria-pressed="true"]')).toHaveCount(1);
  await expect(first.locator('.contribution-takeaway-item.is-active')).toHaveCount(1);
  for (const stop of careerStops) await assertContributionDescriptionsVisible(page, stop);
  const ids = await page.locator('#reading-view .role-contributions [id]').evaluateAll(elements => elements.map(element => element.id));
  expect(new Set(ids).size, 'Contribution headings and grouped takeaway rows have unique IDs in reading view').toBe(ids.length);
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

test('company project actions open details and return focus to the selected employer card', async ({ page, request, baseURL }) => {
  await loadWorld(page, baseURL);
  await selectCompany(page, 'Synesis IT');
  const biwta = page.getByRole('button', { name: 'Read BIWTA project story' });
  await biwta.click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page.locator('#dialog-title')).toHaveText('BIWTA');
  await expect(page.getByRole('dialog')).toContainText('Individual project');
  await page.getByText('Explore the prototype screens', { exact: true }).click();
  await expect(page.locator('.project-gallery figure')).toHaveCount(17);
  for (const src of await page.locator('.project-gallery img').evaluateAll(images => images.map(image => image.src))) {
    const result = await request.get(src);
    expect(result.status()).toBe(200);
    expect(result.headers()['content-type']).toContain('image/webp');
  }
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toBeHidden();
  await expect(biwta).toBeFocused();
  await expect(page.locator('#company-name')).toHaveText('Synesis IT');
  await page.locator('#previous-stop').click();
  await page.getByRole('button', { name: 'Read Quantibly project story' }).click();
  await expect(page.getByRole('dialog')).toContainText('Internal product details stay confidential');
  await page.locator('#dialog-close').click();
  await selectCompany(page, 'Identify BDA');
  const workflow = page.locator('.identify-workflow-stages');
  for (const stage of ['Understand', 'Design & source', 'Coordinate', 'Deliver']) {
    await expect(workflow.getByText(stage, { exact: true })).toBeVisible();
  }
  await expect(page.locator('.identify-workflow-preview figcaption')).toContainText('When artwork is needed');
  await expect(page.locator('.identify-workflow-preview figcaption')).toContainText('client feedback');
  await expect(page.locator('.identify-workflow-preview figcaption')).toContainText('while sourcing vendors');
  const exploreFlow = page.getByRole('button', { name: 'Explore the flow: From request to delivery', exact: true });
  await exploreFlow.click();
  await expect(page.getByRole('dialog')).toContainText('Project Coordinator');
  await expect(page.getByRole('dialog')).toContainText('20+ external vendors');
  const approach = page.getByRole('dialog').locator('.case-section').filter({ has: page.getByRole('heading', { name: 'The approach', exact: true }) });
  await expect(approach).toContainText('When artwork is needed');
  await expect(approach).toContainText(/brief designers.*gather client feedback.*coordinate revisions/i);
  await expect(approach).toContainText(/final client approval before production.*vendor sourcing continues/i);
  await page.locator('#dialog-close').click();
  await expect(exploreFlow).toBeFocused();
  await assertSingleViewport(page);
});

test('BIWTA and eReturn connect needs, persona stories, and design evidence with keyboard controls', async ({ page, baseURL }) => {
  await loadWorld(page, baseURL);
  await page.locator('#panel-nav button[data-panel="projects"]').click();
  await page.locator('[data-filter="digital"]').click();
  for (const [id, title] of [['biwta', 'BIWTA'], ['ereturn', 'eReturn']]) {
    const trigger = page.locator(`.case-open[data-project="${id}"]`);
    await trigger.click();
    const dialog = page.getByRole('dialog');
    for (const heading of ['Requirements analysis', 'Research, learnings, and findings', 'User personas', 'Design thinking process', 'Initial sketch study', 'From challenges to design solutions', 'Site map and information architecture', 'Inspiration board']) {
      await expect(dialog.getByRole('heading', { name: heading, exact: true, includeHidden: true })).toHaveCount(1);
    }
    await expect(dialog.locator(`#case-${id}-personas .study-reconstruction-tag`)).toContainText('Reconstructed role profiles');
    const stage = dialog.locator('[data-study-process-select]').nth(1);
    await stage.focus();
    await page.keyboard.press('Enter');
    await expect(stage).toHaveAttribute('aria-pressed', 'true');
    await expect(dialog.locator('[data-study-process-detail="1"]')).toBeVisible();

    const personaControls = dialog.locator('[data-study-persona-select]');
    for (let index = 0; index < await personaControls.count(); index += 1) {
      const control = personaControls.nth(index);
      await control.focus();
      await page.keyboard.press('Enter');
      await expect(control).toHaveAttribute('aria-pressed', 'true');
      await expect(dialog.locator('[data-study-persona-detail]:visible')).toHaveCount(1);
      const profile = dialog.locator('[data-study-persona-detail]').nth(index);
      await expect(profile.locator('.study-persona-story')).toBeVisible();
      await expect(profile.locator('.study-persona-evidence')).toBeVisible();
      await expect(profile.locator('.study-persona-user-story')).toBeVisible();
      await expect(profile.getByRole('heading', { name: 'Design response', exact: true })).toHaveCount(1);
    }

    const sketch = dialog.locator(`#case-${id}-sketches`);
    await expect(sketch.locator('.study-structure-details')).toBeVisible();
    const annotation = sketch.locator('[data-study-sketch-select]').last();
    await annotation.focus();
    await page.keyboard.press('Space');
    await expect(annotation).toHaveAttribute('aria-pressed', 'true');
    await expect(sketch.locator('[data-sketch-region].is-selected')).toHaveCount(1);
    await expect(dialog.locator(`#case-${id}-sitemap`).getByRole('heading', { name: 'Site map and information architecture', exact: true })).toBeVisible();
    const leaf = dialog.locator('[data-study-map-select]').last();
    await leaf.click();
    await expect(leaf).toHaveAttribute('aria-pressed', 'true');
    await expect(dialog.locator('[data-study-map-status]')).not.toContainText('Select an area');
    const direction = dialog.locator('[data-study-inspiration-select]').last();
    await direction.click();
    await expect(direction).toHaveAttribute('aria-pressed', 'true');
    await dialog.locator(`a[href="#case-${id}-requirements"]`).click();
    const requirements = dialog.locator(`#case-${id}-requirements`);
    await expect(requirements.getByRole('heading', { name: 'Requirements analysis', exact: true })).toBeFocused();
    const requirement = requirements.locator('.study-requirement').first();
    await expect(requirement.locator('dd').first()).toBeVisible();
    if (id === 'biwta') {
      const prototypeGallery = dialog.locator('.project-gallery [data-study-portal-detail]:visible [data-study-gallery]');
      await expect(prototypeGallery.locator('[data-study-picture-detail]:visible')).toHaveCount(1);
      const lastImage = prototypeGallery.locator('[data-study-picture-select]').last();
      await lastImage.focus();
      await page.keyboard.press('Space');
      await expect(lastImage).toHaveAttribute('aria-pressed', 'true');
      await expect(prototypeGallery.locator('[data-study-picture-detail]:visible')).toHaveCount(1);
      await expect(prototypeGallery.locator('[data-study-picture-status]')).toContainText('8 of 8');
    } else {
      const sketchGallery = sketch.locator('[data-study-gallery]').first();
      await expect(sketchGallery.locator('[data-study-picture-select]')).toHaveCount(3);
      await sketchGallery.locator('[data-study-picture-select]').last().click();
      await expect(sketchGallery.locator('[data-study-picture-detail]:visible')).toHaveCount(1);
      await expect(sketchGallery.locator('[data-study-picture-status]')).toContainText('3 of 3');
    }
    const ids = await dialog.locator('[id]').evaluateAll(elements => elements.map(element => element.id));
    expect(new Set(ids).size, 'Case-study controls and sections have unique IDs').toBe(ids.length);
    await page.keyboard.press('Escape');
    await expect(trigger).toBeFocused();
  }
  await assertSingleViewport(page);
});

for (const viewport of [{ width: 1440, height: 1000 }, { width: 360, height: 740 }]) {
  test(`eReturn ${viewport.width}px registration scenarios preserve the source handoffs and readable evidence`, async ({ page, request, baseURL }) => {
    await page.setViewportSize(viewport);
    await loadWorld(page, baseURL);
    await page.locator('#panel-nav button[data-panel="projects"]').click();
    await page.locator('[data-filter="digital"]').click();
    const trigger = page.locator('.case-open[data-project="ereturn"]');
    await trigger.click();
    const dialog = page.getByRole('dialog');
    const journeys = dialog.locator('#case-ereturn-registrationJourneys');
    await expect(journeys).toHaveCount(1);
    await expect(dialog.locator('.study-persona-story')).toHaveCount(3);
    await expect(dialog.locator('.study-persona-user-story')).toHaveCount(3);
    await expect(dialog.locator('#case-ereturn-planningArtifacts img')).not.toHaveCount(0);
    expect(await page.evaluate(() => matchMedia('(prefers-reduced-motion: reduce)').matches)).toBe(true);

    const controls = journeys.locator('[data-study-journey-select]');
    const panels = journeys.locator('[data-study-journey-detail]');
    await expect(controls).toHaveCount(3);
    const sourceFiles = ['registration-matched-original.webp', 'registration-mismatch-original.webp', 'registration-non-nid-original.webp'];
    for (let index = 0; index < 3; index += 1) {
      const control = controls.nth(index);
      await control.focus();
      await page.keyboard.press(index % 2 ? 'Space' : 'Enter');
      await expect(control).toBeFocused();
      await expect(control).toHaveAttribute('aria-pressed', 'true');
      await expect(journeys.locator('[data-study-journey-select][aria-pressed="true"]')).toHaveCount(1);
      await expect(journeys.locator('[data-study-journey-detail]:visible')).toHaveCount(1);
      const panel = panels.nth(index);
      await expect(panel).toBeVisible();
      await expect(control).toHaveAttribute('aria-controls', await panel.getAttribute('id'));
      await expect(journeys.locator('[data-study-journey-status]')).toContainText(await control.locator('strong').textContent());
      await expect(panel.locator('.study-journey-steps')).toContainText(index === 2 ? 'Tax Circle' : 'OTP');
      if (index === 1) await expect(panel).toContainText(/correct|another/i);
      if (index === 2) {
        await expect(panel).toContainText('DCT');
        await expect(panel.locator('.study-picture img[src$="registration-circle-original.webp"]')).toHaveCount(1);
      }
      const sourceImage = panel.locator(`.study-picture img[src$="${sourceFiles[index]}"]`);
      await sourceImage.scrollIntoViewIfNeeded();
      await expect.poll(() => sourceImage.evaluate(image => image.complete && image.naturalWidth > 0)).toBe(true);
      await expect(sourceImage.locator('..')).toHaveAttribute('target', '_blank');
    }

    const prefix = new URL(baseURL || page.url()).pathname.replace(/\/?$/, '/');
    const sources = await dialog.locator('img').evaluateAll(images => [...new Set(images.map(image => image.src))]);
    expect(sources.length, 'The case study includes original source diagrams and sketch/prototype evidence').toBeGreaterThan(5);
    for (const source of sources) {
      expect(new URL(source).pathname.startsWith(prefix), 'Case-study assets respect the deployment base path').toBe(true);
      if (viewport.width === 1440) {
        const response = await request.get(source);
        expect(response.ok(), `Case-study image resolves: ${new URL(source).pathname}`).toBe(true);
        expect(response.headers()['content-type']).toMatch(/^image\//);
      }
    }
    for (const image of await dialog.locator('img:visible').all()) {
      await image.scrollIntoViewIfNeeded();
      await expect.poll(() => image.evaluate(element => element.complete && element.naturalWidth > 0)).toBe(true);
    }
    const overflow = await dialog.locator('#dialog-content, .study-persona, .study-journey-panel:visible, .study-picture, .study-sitemap').evaluateAll(elements => elements.filter(element => element.scrollWidth > element.clientWidth + 1).map(element => ({ className: element.className, width: element.clientWidth, scrollWidth: element.scrollWidth })));
    expect(overflow, 'Stories, routes, maps, and source images remain readable without horizontal overflow').toEqual([]);
    await assertSingleViewport(page);
    await page.keyboard.press('Escape');
    await expect(trigger).toBeFocused();
  });
}

test('personal profile, qualifications, Identify coordination, projects, and contact remain in one viewport', async ({ page, request, baseURL }) => {
  await loadWorld(page, baseURL);
  await expect(page.locator('#company-name')).toHaveText('Identify BDA');
  await expect(page.locator('.profile-stat-grid')).toHaveCount(1);
  await expect(page.locator('#panel-nav [data-panel="profile"]')).toHaveText('About Me');
  await page.locator('#panel-nav button[data-panel="profile"]').click();
  const detail = page.locator('#sidebar-body');
  await expect(page.locator('#profile-view-0 #about-card')).toContainText('Fine Tuned Autos');
  await expect(page.locator('.profile-stat-grid')).toHaveCount(0);
  await expect(page.locator('#profile-view-0')).toBeVisible();
  await expect(page.locator('#profile-explorer > [role="tablist"] [role="tab"]')).toHaveText(['Profile', 'Skills', 'Learning']);

  await page.locator('[data-profile-tab="1"]').click();
  const skillsPanel = page.locator('#profile-view-1');
  await expect(skillsPanel).toBeVisible();
  await expect(page.locator('.profile-stat-grid')).toHaveCount(0);
  const strengthCards = skillsPanel.locator('.profile-skill-card');
  await expect(strengthCards).toHaveCount(4);
  await expect(skillsPanel.locator('details, summary')).toHaveCount(0);
  for (const card of await strengthCards.all()) {
    await expect(card.getByRole('heading', { level: 2 })).toBeVisible();
    await expect(card.locator('.profile-skill-body > p')).toBeVisible();
    for (const tag of await card.locator('.profile-skill-tags > span').all()) await expect(tag).toBeVisible();
  }
  await expect(skillsPanel.getByText('Pricing negotiation', { exact: true })).toBeVisible();
  await page.locator('[data-profile-tab="1"]').focus();
  await page.keyboard.press('ArrowRight');
  await expect(page.locator('[data-profile-tab="2"]')).toBeFocused();
  await expect(page.locator('[data-profile-tab="2"]')).toHaveAttribute('aria-selected', 'true');
  const learningPanel = page.locator('#profile-view-2');
  await expect(learningPanel).toBeVisible();
  await expect(page.locator('.profile-stat-grid')).toHaveCount(0);
  for (const qualification of ['Computer Science & Engineering', 'Sir Sandford Fleming College', 'Centennial College']) {
    await expect(learningPanel.getByText(qualification, { exact: true })).toBeVisible();
  }
  const credentials = learningPanel.locator('.credentials');
  await credentials.locator('summary').click();
  await expect(credentials.getByText('CalArts · Coursera', { exact: false })).toBeVisible();
  await expect(credentials).toContainText('August 17, 2021');
  await expect(page.locator('#profile-explorer > .profile-view:visible')).toHaveCount(1);
  await page.locator('[data-profile-tab="2"]').focus();
  await page.keyboard.press('Home');
  await expect(page.locator('[data-profile-tab="0"]')).toBeFocused();
  await expect(page.locator('#profile-view-0')).toBeVisible();
  await expect(page.locator('.profile-stat-grid')).toHaveCount(0);

  await detail.evaluate(element => element.scrollTop = element.scrollHeight);
  await expect(page.getByRole('link', { name: 'Download my résumé' })).toBeVisible();
  const pdf = await request.get(await page.getByRole('link', { name: 'Download my résumé' }).getAttribute('href'));
  expect(pdf.status()).toBe(200);
  expect((await pdf.body()).subarray(0, 5).toString()).toBe('%PDF-');
  await assertSingleViewport(page);

  await page.locator('.professional-current[data-current-experience]').click();
  await expect(page.locator('#company-name')).toHaveText('Identify BDA');
  const coordination = page.locator('#company-card');
  await expect(coordination.locator('.profile-stat-grid')).toBeVisible();
  await expect(coordination.locator('.profile-stat-grid > .profile-stat')).toHaveCount(2);
  await expect(coordination.getByText('25+', { exact: true })).toBeVisible();
  await expect(coordination.getByText('Clients supported', { exact: true })).toBeVisible();
  await expect(coordination).not.toContainText('6–10');
  await expect(coordination.getByText('20+', { exact: true })).toBeVisible();
  await expect(coordination.getByText('Project Coordinator', { exact: true })).toHaveCount(1);
  await expect(coordination.getByRole('list', { name: /coordination workflow/i })).toHaveCount(1);
  const workflow = coordination.locator('.identify-workflow-stages');
  await expect(workflow).toHaveCount(1);
  for (const stage of ['Understand', 'Design & source', 'Coordinate', 'Deliver']) {
    await expect(workflow.getByText(stage, { exact: true })).toBeVisible();
  }
  await expect(coordination.locator('[data-project="identify"]')).toHaveCount(1);
  const coordinationStory = coordination.getByRole('button', { name: 'Explore the flow: From request to delivery', exact: true });
  await coordinationStory.click();
  await expect(page.locator('#dialog-title')).toHaveText('From request to delivery');
  await page.locator('#dialog-close').click();
  await expect(coordinationStory).toBeFocused();
  await assertSingleViewport(page);

  await page.locator('#panel-nav button[data-panel="projects"]').click();
  await expect(page.locator('[data-filter="operations"]')).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('.case-card')).toHaveCount(6);
  await expect(page.locator('[data-project-group="case-studies"] .case-card')).toHaveCount(3);
  await expect(page.locator('[data-project-group="workflows"] .case-card')).toHaveCount(2);
  await expect(page.locator('[data-project-group="overview"] .case-card')).toHaveCount(1);
  await page.locator('[data-show-tools]').click();
  await expect(page.locator('#profile-tools-title')).toBeFocused();
  await expect(page.locator('.profile-tools-groups > article')).toHaveCount(4);
  for (const tool of ['Microsoft Project','Trello','Microsoft Excel','Wave','SharePoint','Adobe XD']) await expect(page.locator('.profile-tools')).toContainText(tool);
  await page.locator('#panel-nav button[data-panel="projects"]').click();
  await page.getByRole('button', { name: 'Earlier digital work', exact: true }).click();
  await expect(page.locator('.case-card')).toHaveCount(8);
  await page.getByRole('button', { name: 'All work', exact: true }).click();
  await expect(page.locator('.case-card')).toHaveCount(14);
  await detail.evaluate(element => element.scrollTop = element.scrollHeight);
  await page.locator('.case-open[data-project="cozey"]').click();
  await expect(page.getByRole('dialog')).toContainText('Academic project');
  await page.locator('#dialog-close').click();

  await expect(page.locator('#panel-nav > button')).toHaveText(['About Me', 'Journey', 'Projects 14', 'Contact']);
  await page.getByRole('button', { name: 'Contact', exact: true }).click();
  await expect(page.locator('#panel-nav [data-panel="contact"]')).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('#sidebar-body')).toHaveAttribute('aria-label', 'Contact details');
  await expect(page.locator('.contact-panel')).toContainText('technical education and project management training');
  await expect(page.locator('.contact-panel')).toContainText('keeping people informed about decisions and dependencies, and following through when plans change');
  await expect(page.getByRole('link', { name: 'Start a conversation' })).toHaveAttribute('href', 'mailto:saqibmollanazmus@gmail.com');
  for (const role of ['Project Coordinator', 'Operations Coordinator', 'Assistant Project Manager', 'Implementation Coordinator']) {
    await expect(page.locator('.contact-panel')).toContainText(role);
  }
  await assertSingleViewport(page);
});

for (const viewport of [{ width: 390, height: 844 }, { width: 360, height: 640 }]) {
  test(`mobile ${viewport.width}×${viewport.height} keeps the world, company card, and panels within the viewport`, async ({ page, baseURL }) => {
    await page.setViewportSize(viewport);
    await loadWorld(page, baseURL);
    await assertSingleViewport(page);
    await expect(page.locator('#world-pane')).toBeVisible();
    await expect(page.locator('#company-name')).toHaveText('Identify BDA');
    await expect(page.locator('#company-card .eyebrow')).toHaveText('06 / Canada');
    await page.locator('#panel-nav button[data-panel="profile"]').click();
    await page.getByRole('tab', { name: 'Profile', exact: true }).click();
    await expect(page.locator('#about-card')).toBeVisible();
    await expect(page.locator('#world-pane')).toBeHidden();
    await page.locator('#mobile-world-toggle').click();
    await expect(page.locator('#mobile-world-toggle')).toHaveAttribute('aria-expanded', 'true');
    await expect(page.locator('canvas.world-canvas')).toBeVisible();
    await page.locator('#mobile-world-toggle').click();
    await expect(page.locator('#world-pane')).toBeHidden();
    await page.locator('#about-personal > summary').click();
    await page.locator('[data-story-milestone="2"]').click();
    await expect(page.locator('#story-panel-2')).toBeVisible();
    await expect(page.locator('#story-journey [role="tabpanel"]:visible')).toHaveCount(1);
    expect(await page.locator('#story-panel-2 .about-story-paragraph').evaluate(element => getComputedStyle(element).fontSize)).toBe('16px');
    await page.locator('#about-card').getByText('In October 2024,', { exact: false }).scrollIntoViewIfNeeded();
    await assertSingleViewport(page);
    await page.locator('#panel-nav button[data-panel="journey"]').click();
    await expect(page.locator('#company-name')).toHaveText('Identify BDA');
    for (let step = 0; step < 4; step += 1) await page.locator('#next-stop').click();
    await expect(page.locator('#company-name')).toHaveText('iQuantile');
    const contribution = await assertContributionDescriptionsVisible(page, careerStops[1]);
    expect(await contribution.evaluate(element => element.scrollWidth <= element.clientWidth)).toBe(true);
    expect(await contribution.locator('.contribution-takeaway, .contribution-takeaway-item').evaluateAll(elements => elements.every(element => element.scrollWidth <= element.clientWidth))).toBe(true);
    expect(await contribution.getByText(careerStops[1].highlights[1], { exact: true }).evaluate(element => getComputedStyle(element).fontSize)).toBe('16px');
    expect(await contribution.locator('.contribution-takeaway-copy').first().evaluate(element => getComputedStyle(element).fontSize)).toBe('16px');
    await contribution.locator('[data-contribution-index="2"]').click();
    await expect(contribution.locator('[data-contribution-index="2"]')).toHaveAttribute('aria-pressed', 'true');
    await assertContributionDescriptionsVisible(page, careerStops[1]);
    await assertSingleViewport(page);
    await page.locator('#next-stop').click();
    await expect(page.locator('#company-name')).toHaveText('Synesis IT');
    const biwta = page.getByRole('button', { name: 'Read BIWTA project story' });
    await biwta.click();
    await expect(page.locator('#dialog-title')).toHaveText('BIWTA');
    await expect(page.locator('#dialog-close')).toBeInViewport();
    await page.locator('#dialog-close').click();
    await assertSingleViewport(page);
    await page.locator('#panel-nav button[data-panel="profile"]').click();
    await page.locator('[data-profile-tab="2"]').click();
    await expect(page.locator('#profile-view-2')).toBeVisible();
    await expect(page.locator('#profile-view-2')).toContainText('Centennial College');
    expect(await page.locator('#profile-view-2').evaluate(element => element.scrollWidth <= element.clientWidth)).toBe(true);
    await page.locator('#sidebar-body').evaluate(element => element.scrollTop = element.scrollHeight);
    await expect(page.getByRole('link', { name: 'Download my résumé' })).toBeVisible();
    await assertSingleViewport(page);
    await page.locator('#reading-toggle').click();
    await expect(page.locator('#panel-nav [data-panel="profile"]')).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('[data-profile-tab="2"]')).toHaveAttribute('aria-selected', 'true');
    await expect(page.locator('#profile-view-2')).toBeVisible();
    await page.locator('#panel-nav button[data-panel="journey"]').click();
    await expect(page.locator('#reading-view .reading-company')).toHaveCount(6);
    await expect(page.locator('#reading-view #about-card')).toHaveCount(0);
    await expect(page.locator('#reading-view > .reading-company').first()).toContainText('06 / Canada');
    await expect(page.locator('#world-pane')).toBeHidden();
    await page.locator('#reading-view [data-stop="identify"]').scrollIntoViewIfNeeded();
    await expect(page.getByRole('button', { name: 'Explore the flow: From request to delivery', exact: true })).toBeVisible();
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
  await expect(page.locator('#reading-view #about-card')).toHaveCount(0);
  await expect(page.locator('#reading-view .reading-company')).toHaveCount(6);
  await expect(page.locator('#reading-view > .reading-company').first()).toContainText('06 / Canada');
  await expect(page.locator('#reading-view')).toContainText('Oct 2024–Present');
  await page.getByRole('button', { name: 'Explore the flow: From request to delivery', exact: true }).click();
  await expect(page.locator('#dialog-title')).toHaveText('From request to delivery');
  await page.locator('#dialog-close').click();
  await page.locator('#panel-nav button[data-panel="profile"]').click();
  await page.getByRole('tab', { name: 'Profile', exact: true }).click();
  await expect(page.locator('#about-card')).toContainText('Bangladesh');
  await expect(page.locator('#about-card')).toContainText('Canada');
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
