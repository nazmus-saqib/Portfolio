import { test, expect } from '@playwright/test';
import { careerStops, projects, professionalSummary, professionalTools } from '../src/content.js';
import { managementUpdate, careerBridge } from '../src/career-context.js';

const projectIds = ['conference', 'multi-city-event', 'invoice-investigation', 'supplier-coordination', 'change-coordination', 'identify', 'biwta', 'convay', 'signfy', 'ereturn', 'qare', 'odin', 'quantibly', 'cozey'];
const project = id => projects.find(item => item.id === id);
const caseData = id => project(id).coordinationCaseStudy;
const siteUrl = (baseURL, id) => `${baseURL.replace(/\/?$/, '/')}?project=${id}`;
const roles = ['Project Coordinator', 'Operations Coordinator', 'Assistant Project Manager', 'Implementation Coordinator'];

test('the content audit preserves work classifications, decision ownership and evidence limits', () => {
  expect(projects.map(item => item.id)).toEqual(projectIds);
  expect(projects.slice(0, 6).map(item => item.storyType)).toEqual(['case-study', 'case-study', 'case-study', 'workflow', 'workflow', 'overview']);
  expect(careerStops.find(stop => stop.id === 'identify').role).toBe('Project Coordinator');
  expect(professionalSummary.headline).toBe('Project & Operations Coordinator');
  expect(professionalSummary.targets).toEqual(roles);
  const identify = careerStops.find(stop => stop.id === 'identify');
  expect(identify.highlights).toHaveLength(4);
  expect(identify.story).toMatch(/trade-offs to management/i);
  expect(identify.story).toMatch(/risk notes in Trello card descriptions/i);
  expect(identify.story).toMatch(/invoice clarification.*management follow-up/i);
  expect(project('identify').workingControls.items).toHaveLength(6);
  expect(project('identify').workingControls.note).toMatch(/not a measured before\/after/i);
  expect(managementUpdate.fields).toHaveLength(5);
  expect(managementUpdate.note).toMatch(/reconstructed.*fictional/i);

  const supplier = caseData('supplier-coordination');
  expect(supplier.actions.map(action => action.body).join(' ')).toMatch(/stock.*CEO.*Management retains applicable commercial decisions.*client approval.*pickup.*shipment/i);
  expect(supplier.examples).toHaveLength(2);
  expect(supplier.examples[0].body).toMatch(/final receipt.*not established/i);
  for (const example of supplier.examples) expect(example.body).not.toMatch(/[$£€]\s*\d|\b\d+\b|https?:\/\/|@/);
  const handoff = supplier.artifacts.find(artifact => artifact.id === 'supplier-handoff');
  expect(handoff.rows).toHaveLength(5);
  expect(handoff.description).toMatch(/illustrative.*not an original/i);

  const risk = caseData('change-coordination');
  expect(risk.lead).toMatch(/Trello card descriptions/i);
  expect(JSON.stringify(risk.actions)).toMatch(/dimensions.*bleed/i);
  const trello = risk.artifacts.find(artifact => artifact.id === 'trello-description');
  expect(trello.rows.map(row => row[0])).toEqual(['Concern', 'Potential impact', 'Next action', 'Decision required', 'Follow-up']);
  expect(trello.description).toMatch(/suggested.*proposed.*not an original/i);
  const distinctions = risk.artifacts.find(artifact => artifact.id === 'risk-issue-check');
  expect(distinctions.rows.map(row => row[1])).toEqual(expect.arrayContaining(['Scope / commercial change', 'Issue: a problem has occurred', 'Open delivery status']));

  const conference = caseData('conference');
  const controls = conference.artifacts.find(artifact => artifact.id === 'timeline');
  expect(controls.rows).toHaveLength(5);
  expect(controls.columns).toEqual(['Work stage', 'Main dependency', 'Decision / approval', 'Coordinator follow-up']);
  expect(controls.description).toMatch(/fictional reconstruction.*not the original/i);
  expect(conference.result).toMatch(/helped resolve an incorrect item without delaying the conference/i);
  expect(caseData('multi-city-event').result).toMatch(/supplier confirmed.*ready for collection/i);
  expect(caseData('multi-city-event').resultNote).toMatch(/pickup, receipt and acceptance.*not independently established/i);
  expect(caseData('invoice-investigation').result).toMatch(/administrator confirmed.*different work/i);
  expect(caseData('invoice-investigation').resultNote).toMatch(/Recovery.*not established.*Accounting.*administrator/i);
  for (const item of projects.filter(item => item.coordinationCaseStudy)) {
    for (const artifact of item.coordinationCaseStudy.artifacts) {
      expect(artifact.description).toMatch(/illustrative|fictional|suggested|dummy|reconstruct/i);
      for (const row of artifact.rows) expect(row).toHaveLength(artifact.columns.length);
    }
  }
  for (const employer of ['Synesis IT', 'iStoreiSend', 'Dynamic Infotech']) expect(careerBridge.body).toContain(employer);
  expect(careerBridge.note).toMatch(/separate roles and projects/i);
  expect(careerBridge.note).toMatch(/distinct from software rollout or go-live ownership/i);
  expect(careerStops.find(stop => stop.id === 'dynamic').story).toMatch(/documented (?:completed|site) work.*exceptions.*escalated.*issues/i);
  expect(project('odin').outcome).toMatch(/requirements.*stakeholders.*not a claimed rollout/i);
  const currentCopy = JSON.stringify({ identify, overview: project('identify'), cases: projects.slice(0, 5), managementUpdate, professionalTools });
  expect(currentCopy).not.toMatch(/99%|saved \d+ hours|brief the CEO daily|daily CEO briefings|semi-annual|Power BI|Power Automate|advanced Excel|PMP-certified|I led (?:the )?(?:rollout|migration|go-live)/i);
});

for (const width of [1440, 320]) {
  test(`audited content remains visible, qualified and keyboard-readable at ${width}px`, async ({ page, baseURL }) => {
    test.setTimeout(90_000);
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(baseURL);
    await expect(page.locator('[data-management-updates], [data-career-bridge]')).toHaveCount(0);
    const journey = page.locator('#panel-nav [data-panel="journey"]');
    await journey.focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('#company-name')).toHaveText('Identify BDA');
    const management = page.locator('[data-management-updates]');
    await expect(management).toHaveCount(1);
    await expect(management.getByRole('heading', { name: 'Management Updates & Decision Support', exact: true })).toBeVisible();
    await expect(management.locator('dl > div')).toHaveCount(5);
    await expect(management).toContainText(/illustrative.*reconstructed.*fictional/i);
    await expect(management.locator('details, summary')).toHaveCount(0);
    expect(await management.evaluate(node => node.scrollWidth <= node.clientWidth)).toBe(true);
    await page.locator('#reading-toggle').click();
    await expect(page.locator('#reading-view [data-management-updates]')).toHaveCount(1);
    await expect(page.locator('#reading-view [data-management-updates] dl > div')).toHaveCount(5);

    await page.locator('#panel-nav [data-panel="projects"]').click();
    await expect(page.locator('.case-open')).toHaveCount(6);
    await expect(page.locator('[data-career-bridge]')).toHaveCount(0);
    await page.locator('[data-filter="digital"]').focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('.case-open')).toHaveCount(8);
    const bridge = page.locator('[data-career-bridge]');
    await expect(bridge).toHaveCount(1);
    await expect(bridge.getByRole('heading', { name: 'Connecting Business Requirements with Technical Execution', exact: true })).toBeVisible();
    for (const employer of ['Synesis IT', 'iStoreiSend', 'Dynamic Infotech']) await expect(bridge).toContainText(employer);
    await expect(bridge).toContainText(/separate roles and projects/i);
    expect(await bridge.evaluate(node => Boolean(node.compareDocumentPosition(node.parentElement.querySelector('.project-group-cards')) & Node.DOCUMENT_POSITION_FOLLOWING))).toBe(true);
    await page.locator('[data-filter="all"]').click();
    await expect(page.locator('.case-open')).toHaveCount(14);
    await expect(page.locator('[data-career-bridge]')).toHaveCount(1);

    await page.goto(siteUrl(baseURL, 'identify'));
    const workingControls = page.locator('[data-working-controls]');
    await expect(workingControls.getByRole('heading', { name: /prevent avoidable rework/i })).toBeVisible();
    await expect(workingControls.locator('li')).toHaveCount(6);
    await expect(workingControls).toContainText(/not a measured before\/after/i);

    await page.goto(siteUrl(baseURL, 'supplier-coordination'));
    await expect(page.locator('.coordination-examples article')).toHaveCount(2);
    const handoff = page.locator('[data-coordination-template="supplier-handoff"]');
    await expect(handoff.getByRole('heading', { name: 'Production-release handoff checklist', exact: true })).toBeVisible();
    await expect(handoff).toContainText(/illustrative.*fictional.*not an original/i);
    const tableRegion = handoff.getByRole('region');
    await tableRegion.focus();
    await page.keyboard.press('ArrowRight');
    await expect(tableRegion).toBeFocused();

    await page.goto(siteUrl(baseURL, 'change-coordination'));
    const riskNote = page.locator('[data-coordination-template="trello-description"]');
    await expect(riskNote.locator('tbody > tr')).toHaveCount(5);
    await expect(riskNote).toContainText(/suggested.*proposed.*not an original/i);
    await expect(page.locator('.coordination-actions')).toContainText(/dimensions.*bleed/i);

    await page.goto(siteUrl(baseURL, 'conference'));
    const projectControl = page.locator('[data-coordination-template="timeline"]');
    await expect(projectControl.getByRole('heading', { name: 'Reconstructed project-control snapshot', exact: true })).toBeVisible();
    await expect(projectControl.getByRole('columnheader', { name: 'Decision / approval', exact: true })).toBeVisible();
    await expect(projectControl).toContainText(/fictional reconstruction.*not the original/i);

    for (const id of ['multi-city-event', 'invoice-investigation']) {
      await page.goto(siteUrl(baseURL, id));
      const data = caseData(id);
      await expect(page.locator('.coordination-result > p:not(.case-study-label)')).toHaveText(data.result);
      const evidence = page.locator('.coordination-evidence-note');
      await expect(evidence.getByRole('heading', { name: 'Evidence boundary', exact: true })).toBeVisible();
      await expect(evidence).toContainText(data.resultNote);
      await expect(page.locator('#project-dialog details, #project-dialog summary')).toHaveCount(0);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    }
    await page.keyboard.press('Escape');
    await page.locator('#panel-nav [data-panel="contact"]').focus();
    await page.keyboard.press('Enter');
    const contact = page.locator('.contact-panel');
    await expect(contact).toContainText('procurement, practical risk and issue management, operational documentation, cost analysis');
    await expect(contact).toContainText('decisions and dependencies');
    const copy = await contact.textContent();
    for (const role of roles) expect(copy.split(role)).toHaveLength(2);
    const email = contact.getByRole('link', { name: 'Start a conversation', exact: false });
    await email.focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('#email-dialog')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(email).toBeFocused();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    expect(errors).toEqual([]);
  });
}
