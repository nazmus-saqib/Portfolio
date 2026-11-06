import { test, expect } from '@playwright/test';
import { careerStops, formatTenure } from '../src/content.js';

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

test('chapter 00 introduces Saqib and his story before the employer journey', async ({ page, baseURL }) => {
  await loadWorld(page, baseURL);
  const about = page.locator('#about-card');
  await expect(about).toBeVisible();
  for (const text of ['About Me & My Story', 'Nazmus Saqib', 'Project & Operations Coordinator', 'Identify BDA', 'Bringing it all together.', 'Bangladesh', 'Canada', '2022', 'Centennial College', 'Sir Sandford Fleming College', 'October 2024', 'Assistant Project Manager']) {
    await expect(about).toContainText(text);
  }
  await expect(page.locator('#world')).toHaveAttribute('data-active-station', '-1');
  await expect(page.locator('#previous-stop')).toBeDisabled();
  await expect(page.locator('#next-stop')).toContainText('First company');

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
  await expect(page.locator('#story-panel-2')).toContainText('Project & Operations Coordinator');
  await expect(page.locator('#story-panel-2')).toContainText('Identify BDA');
  await expect(page.locator('#story-journey [role="tabpanel"]:visible')).toHaveCount(1);
  await page.keyboard.press('Home');
  await expect(page.locator('[data-story-milestone="0"]')).toBeFocused();
  await expect(page.locator('#story-panel-0')).toBeVisible();
  await page.keyboard.press('End');
  await expect(page.locator('[data-story-milestone="2"]')).toBeFocused();
  await expect(page.locator('#story-panel-2')).toBeVisible();
  await assertSingleViewport(page);
  await page.getByRole('button', { name: 'Nazmus Saqib, start of journey', exact: true }).click();
  await page.getByRole('button', { name: 'My career goal', exact: true }).click();
  await expect(page.locator('#about-goal-title')).toBeInViewport();
  await page.getByRole('button', { name: 'Nazmus Saqib, start of journey', exact: true }).click();

  await page.locator('#next-stop').click();
  await expect(page.locator('#company-name')).toHaveText('WebNSofTech');
  await expect(page.locator('#previous-stop')).toBeEnabled();
  await page.locator('#previous-stop').click();
  await expect(about).toBeVisible();
  await expect(page.locator('#world')).toHaveAttribute('data-active-company', 'About Me & My Story');

  await page.locator('#go-today').click();
  await expect(page.locator('#company-name')).toHaveText('Identify BDA');
  await page.getByRole('button', { name: 'Nazmus Saqib, start of journey', exact: true }).click();
  await expect(about).toBeVisible();

  await page.locator('#reading-toggle').click();
  await expect(page.locator('#about-card.reading-about')).toBeVisible();
  await expect(page.locator('#reading-view .reading-company')).toHaveCount(7);
  await page.locator('[data-story-milestone="2"]').click();
  await page.locator('#about-card').getByText('In October 2024,', { exact: false }).scrollIntoViewIfNeeded();
  await assertSingleViewport(page);
});

test('seven employer cards preserve chronology, accurate roles, and always-visible contributions', async ({ page, baseURL }) => {
  await loadWorld(page, baseURL);
  await expect(page.locator('.journey-footer')).toHaveCount(0);
  await page.locator('#next-stop').click();
  await expect(page.locator('#company-name')).toHaveText(companies[0]);
  await expect(page.locator('#company-dates')).toHaveText('Jan 2018–Jul 2020');
  await expect(page.locator('#company-tenure')).toHaveText('2 yrs 7 mos');
  await expect(page.locator('#previous-stop')).toBeEnabled();
  await assertContributionDescriptionsVisible(page, careerStops[0]);

  for (let index = 1; index < companies.length; index += 1) {
    await page.locator('#next-stop').click();
    await expect(page.locator('#company-name')).toHaveText(companies[index]);
    await expect(page.locator('#world')).toHaveAttribute('data-active-company', companies[index]);
    await expect(page.getByRole('button', { name: `Visit company ${index + 1}: ${companies[index]}`, exact: true })).toHaveAttribute('aria-pressed', 'true');
    await assertContributionDescriptionsVisible(page, careerStops[index]);
  }
  await expect(page.locator('#company-role')).toHaveText('Project & Operations Coordinator');
  await expect(page.locator('#company-dates')).toHaveText('Oct 2024–Present');
  await expect(page.locator('#next-stop')).toContainText('Back to my story');
  await page.locator('#next-stop').click();
  await expect(page.locator('#about-card')).toBeVisible();

  await page.getByRole('button', { name: 'Visit company 2: Synesis IT', exact: true }).click();
  await expect(page.locator('#company-dates')).toHaveText('Aug 2020–Nov 2021');
  await expect(page.locator('#company-tenure')).toHaveText('1 yr 4 mos');
  await expect(page.locator('#company-role')).toHaveText('UX Intern → UX Designer');
  await expect(page.getByRole('button', { name: 'Read BIWTA project story' })).toBeVisible();
  await page.getByRole('button', { name: 'Visit company 5: Dynamic Infotech', exact: true }).click();
  await expect(page.locator('#company-card')).toContainText('Overlapping roles');
  await page.getByRole('button', { name: 'Visit company 6: UPS & Staples', exact: true }).click();
  await expect(page.locator('#company-card')).toContainText('Overlapping roles');
  await assertSingleViewport(page);
});

test('contribution cards keep all takeaways together after the work and remain independent in reading view', async ({ page, baseURL }) => {
  await loadWorld(page, baseURL);
  await page.locator('#next-stop').click();
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
  await expect(page.locator('#reading-view .role-contributions')).toHaveCount(7);
  await expect(page.locator('#reading-view .contribution-takeaway')).toHaveCount(7);
  await expect(page.locator('#reading-view .contribution-takeaway-item')).toHaveCount(21);
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
  await page.locator('#next-stop').click();
  await page.locator('#next-stop').click();
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
  await page.locator('#next-stop').click();
  await page.getByRole('button', { name: 'Read Quantibly project story' }).click();
  await expect(page.getByRole('dialog')).toContainText('Internal product details stay confidential');
  await page.locator('#dialog-close').click();
  await page.locator('#go-today').click();
  const workflow = page.locator('.identify-workflow-stages');
  for (const stage of ['Understand', 'Source', 'Coordinate', 'Deliver']) {
    await expect(workflow.getByText(stage, { exact: true })).toBeVisible();
  }
  const exploreFlow = page.getByRole('button', { name: 'Explore the flow: From request to delivery', exact: true });
  await exploreFlow.click();
  await expect(page.getByRole('dialog')).toContainText('Project & Operations Coordinator');
  await expect(page.getByRole('dialog')).toContainText('20+ external vendors');
  await page.locator('#dialog-close').click();
  await expect(exploreFlow).toBeFocused();
  await assertSingleViewport(page);
});

test('BIWTA and eReturn connect needs, persona stories, and design evidence with keyboard controls', async ({ page, baseURL }) => {
  await loadWorld(page, baseURL);
  await page.locator('[data-panel="projects"]').click();
  for (const [id, title] of [['biwta', 'BIWTA'], ['ereturn', 'eReturn']]) {
    const trigger = page.getByRole('button', { name: `Read ${title} project story`, exact: true });
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
      await expect(profile.locator('.study-persona-evidence')).not.toHaveAttribute('open', '');
      await profile.locator('.study-persona-evidence > summary').click();
      await expect(profile.locator('.study-persona-user-story')).toBeVisible();
      await expect(profile.getByRole('heading', { name: 'Design response', exact: true })).toHaveCount(1);
    }

    const sketch = dialog.locator(`#case-${id}-sketches`);
    await sketch.locator('.study-structure-details > summary').click();
    const annotation = sketch.locator('[data-study-sketch-select]').last();
    await annotation.focus();
    await page.keyboard.press('Space');
    await expect(annotation).toHaveAttribute('aria-pressed', 'true');
    await expect(sketch.locator('[data-sketch-region].is-selected')).toHaveCount(1);
    await dialog.locator('.case-study-disclosure > summary').filter({ hasText: 'Site map and information architecture' }).click();
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
    await expect(requirement).not.toHaveAttribute('open', '');
    await requirement.locator(':scope > summary').click();
    await expect(requirement.locator('dd').first()).toBeVisible();
    const prototypeGallery = dialog.locator('.project-gallery [data-study-gallery]');
    if (id === 'biwta') {
      await expect(prototypeGallery.locator('[data-study-picture-detail]:visible')).toHaveCount(1);
      const lastImage = prototypeGallery.locator('[data-study-picture-select]').last();
      await lastImage.focus();
      await page.keyboard.press('Space');
      await expect(lastImage).toHaveAttribute('aria-pressed', 'true');
      await expect(prototypeGallery.locator('[data-study-picture-detail]:visible')).toHaveCount(1);
      await expect(prototypeGallery.locator('[data-study-picture-status]')).toContainText('5 of 5');
    } else {
      const sketchGallery = sketch.locator('[data-study-gallery]').first();
      await expect(sketchGallery.locator('[data-study-picture-select]')).toHaveCount(2);
      await sketchGallery.locator('[data-study-picture-select]').last().click();
      await expect(sketchGallery.locator('[data-study-picture-detail]:visible')).toHaveCount(1);
      await expect(sketchGallery.locator('[data-study-picture-status]')).toContainText('2 of 2');
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
    await page.locator('[data-panel="projects"]').click();
    const trigger = page.getByRole('button', { name: 'Read eReturn project story', exact: true });
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

test('profile, qualifications, projects, and contact remain in the same viewport', async ({ page, request, baseURL }) => {
  await loadWorld(page, baseURL);
  await expect(page.locator('#about-card')).toContainText('Assistant Project Manager');
  await page.locator('[data-panel="profile"]').click();
  const detail = page.locator('#sidebar-body');
  await expect(page.locator('#profile-view-0')).toBeVisible();
  await expect(detail.getByText('6–10', { exact: true })).toBeVisible();
  await expect(detail.getByText('20+', { exact: true })).toBeVisible();
  await expect(detail).toContainText('Assistant Project Manager');

  await page.locator('[data-profile-tab="1"]').click();
  const skillsPanel = page.locator('#profile-view-1');
  await expect(skillsPanel).toBeVisible();
  const vendorSkills = skillsPanel.locator('details').filter({ hasText: 'Connect the right partners.' });
  await vendorSkills.locator('summary').click();
  await expect(vendorSkills.getByText('Pricing negotiation', { exact: true })).toBeVisible();
  await page.locator('[data-profile-tab="1"]').focus();
  await page.keyboard.press('ArrowRight');
  await expect(page.locator('[data-profile-tab="2"]')).toBeFocused();
  await expect(page.locator('[data-profile-tab="2"]')).toHaveAttribute('aria-selected', 'true');
  const learningPanel = page.locator('#profile-view-2');
  await expect(learningPanel).toBeVisible();
  for (const qualification of ['Computer Science & Engineering', 'Sir Sandford Fleming College', 'Centennial College']) {
    await expect(learningPanel.getByText(qualification, { exact: true })).toBeVisible();
  }
  const credentials = learningPanel.locator('.credentials');
  await credentials.locator('summary').click();
  await expect(credentials.getByText('CalArts · Coursera', { exact: false })).toBeVisible();
  await expect(credentials).toContainText('August 17, 2021');
  await expect(page.locator('#profile-explorer [role="tabpanel"]:visible')).toHaveCount(1);
  await page.locator('[data-profile-tab="2"]').focus();
  await page.keyboard.press('Home');
  await expect(page.locator('[data-profile-tab="0"]')).toBeFocused();
  await expect(page.locator('#profile-view-0')).toBeVisible();
  const coordinationStory = page.locator('#profile-view-0').getByRole('button', { name: 'Read From request to delivery project story', exact: true });
  await coordinationStory.click();
  await expect(page.locator('#dialog-title')).toHaveText('From request to delivery');
  await page.locator('#dialog-close').click();
  await expect(coordinationStory).toBeFocused();

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

for (const viewport of [{ width: 390, height: 844 }, { width: 360, height: 640 }]) {
  test(`mobile ${viewport.width}×${viewport.height} keeps the world, company card, and panels within the viewport`, async ({ page, baseURL }) => {
    await page.setViewportSize(viewport);
    await loadWorld(page, baseURL);
    await assertSingleViewport(page);
    await expect(page.locator('#world-pane')).toBeVisible();
    await expect(page.locator('#about-card')).toBeVisible();
    await page.locator('[data-story-milestone="2"]').click();
    await expect(page.locator('#story-panel-2')).toBeVisible();
    await expect(page.locator('#story-journey [role="tabpanel"]:visible')).toHaveCount(1);
    expect(await page.locator('#story-panel-2 .about-story-paragraph').evaluate(element => getComputedStyle(element).fontSize)).toBe('16px');
    await page.locator('#about-card').getByText('In October 2024,', { exact: false }).scrollIntoViewIfNeeded();
    await assertSingleViewport(page);
    await page.locator('#next-stop').click();
    await page.locator('#next-stop').click();
    await expect(page.locator('#company-name')).toHaveText('Synesis IT');
    const contribution = await assertContributionDescriptionsVisible(page, careerStops[1]);
    expect(await contribution.evaluate(element => element.scrollWidth <= element.clientWidth)).toBe(true);
    expect(await contribution.locator('.contribution-takeaway, .contribution-takeaway-item').evaluateAll(elements => elements.every(element => element.scrollWidth <= element.clientWidth))).toBe(true);
    expect(await contribution.getByText(careerStops[1].highlights[1], { exact: true }).evaluate(element => getComputedStyle(element).fontSize)).toBe('16px');
    expect(await contribution.locator('.contribution-takeaway-copy').first().evaluate(element => getComputedStyle(element).fontSize)).toBe('16px');
    await contribution.locator('[data-contribution-index="2"]').click();
    await expect(contribution.locator('[data-contribution-index="2"]')).toHaveAttribute('aria-pressed', 'true');
    await assertContributionDescriptionsVisible(page, careerStops[1]);
    await assertSingleViewport(page);
    const biwta = page.getByRole('button', { name: 'Read BIWTA project story' });
    await biwta.click();
    await expect(page.locator('#dialog-title')).toHaveText('BIWTA');
    await expect(page.locator('#dialog-close')).toBeInViewport();
    await page.locator('#dialog-close').click();
    await assertSingleViewport(page);
    await page.locator('[data-panel="profile"]').click();
    await page.locator('[data-profile-tab="2"]').click();
    await expect(page.locator('#profile-view-2')).toBeVisible();
    await expect(page.locator('#profile-view-2')).toContainText('Centennial College');
    expect(await page.locator('#profile-view-2').evaluate(element => element.scrollWidth <= element.clientWidth)).toBe(true);
    await page.locator('#sidebar-body').evaluate(element => element.scrollTop = element.scrollHeight);
    await expect(page.getByRole('link', { name: 'Download my résumé' })).toBeVisible();
    await assertSingleViewport(page);
    await page.locator('#reading-toggle').click();
    await expect(page.locator('#reading-view .reading-company')).toHaveCount(7);
    await expect(page.locator('#about-card.reading-about')).toHaveCount(1);
    await expect(page.locator('#world-pane')).toBeHidden();
    await page.locator('#sidebar-body').evaluate(element => element.scrollTop = element.scrollHeight);
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
  await expect(page.locator('#about-card')).toContainText('Bangladesh');
  await expect(page.locator('#about-card')).toContainText('Canada');
  await expect(page.locator('#reading-view .reading-company')).toHaveCount(7);
  await expect(page.locator('#reading-view')).toContainText('Oct 2024–Present');
  await page.getByRole('button', { name: 'Explore the flow: From request to delivery', exact: true }).click();
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
