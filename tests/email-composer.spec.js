import { test, expect } from '@playwright/test';

const address = 'saqibmollanazmus@gmail.com';
const dialogFor = page => page.getByRole('dialog', { name: 'Send an email', exact: true });
const contactTrigger = page => page.getByRole('link', { name: 'Start a conversation', exact: false });
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

async function openContact(page, baseURL) {
  await page.goto(baseURL);
  await page.locator('#panel-nav [data-panel="contact"]').click();
  await expect(contactTrigger(page)).toBeVisible();
}

async function expectFocusInside(dialog) {
  expect(await dialog.evaluate(node => node.contains(document.activeElement)), 'The email chooser receives keyboard focus').toBe(true);
}

test('contact links open visible email options, keep the background inert, and restore their trigger', async ({ page, baseURL }) => {
  await openContact(page, baseURL);
  const trigger = contactTrigger(page);
  const dialog = dialogFor(page);
  const originalURL = page.url();
  await trigger.focus();
  await page.keyboard.press('Enter');
  await expect(dialog).toBeVisible();
  await expectFocusInside(dialog);
  await expect(dialog.getByText(address, { exact: true })).toBeVisible();
  await page.locator('#panel-nav [data-panel="profile"]').evaluate(node => node.focus());
  await expectFocusInside(dialog);
  await page.keyboard.press('Tab');
  await expectFocusInside(dialog);
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
  const addressLink = page.locator('.contact-email');
  await addressLink.click();
  await expect(dialog).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(addressLink).toBeFocused();
  await expect(page.locator('#panel-nav [data-panel="contact"]')).toHaveAttribute('aria-pressed', 'true');
  expect(page.url()).toBe(originalURL);

  await trigger.click();
  await expect(dialog).toBeVisible();
  const bounds = await dialog.boundingBox();
  expect(bounds.x).toBeGreaterThan(0);
  await page.mouse.click(Math.max(1, bounds.x / 2), Math.max(1, bounds.y / 2));
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
});

test('webmail choices open addressed browser drafts and retain the email-app option', async ({ page, context, baseURL }) => {
  // Intercept provider pages: this checks the browser handoff, not a mailbox or delivery.
  await context.route('https://mail.google.com/**', route => route.fulfill({ status: 200, contentType: 'text/html', body: '<title>Gmail draft destination</title>' }));
  await context.route('https://outlook.live.com/**', route => route.fulfill({ status: 200, contentType: 'text/html', body: '<title>Outlook draft destination</title>' }));
  await openContact(page, baseURL);
  await contactTrigger(page).click();
  const dialog = dialogFor(page);
  for (const provider of [
    { name: 'Open Gmail', host: 'mail.google.com', path: '/mail/' },
    { name: 'Open Outlook', host: 'outlook.live.com', path: '/mail/0/deeplink/compose' },
  ]) {
    const link = dialog.getByRole('link', { name: provider.name, exact: false });
    const destination = new URL(await link.getAttribute('href'));
    expect(destination.protocol).toBe('https:');
    expect(destination.hostname).toBe(provider.host);
    expect(destination.pathname).toBe(provider.path);
    expect(destination.searchParams.get('to')).toBe(address);
    if (provider.host === 'mail.google.com') {
      expect(destination.searchParams.get('view')).toBe('cm');
      expect(destination.searchParams.get('fs')).toBe('1');
    }
    await expect(link).toHaveAttribute('target', '_blank');
    const rel = (await link.getAttribute('rel')).split(/\s+/);
    expect(rel).toEqual(expect.arrayContaining(['noopener', 'noreferrer']));
    const popupPromise = context.waitForEvent('page');
    await link.click();
    const popup = await popupPromise;
    await expect(popup).toHaveURL(destination.href);
    expect(await popup.evaluate(() => window.opener === null)).toBe(true);
    await popup.close();
    await expect(dialog).toBeVisible();
  }
  await expect(dialog.getByRole('link', { name: 'Use email app', exact: false })).toHaveAttribute('href', `mailto:${address}`);
});

for (const width of [390, 320]) {
  test(`email choices remain usable at ${width}px and from Reading View`, async ({ page, baseURL }) => {
    await page.setViewportSize({ width, height: 640 });
    await openContact(page, baseURL);
    await contactTrigger(page).click();
    const dialog = dialogFor(page);
    await expect(dialog).toBeVisible();
    await expect(dialog.getByText(address, { exact: true })).toBeVisible();
    await expect(dialog.getByRole('link', { name: 'Open Gmail', exact: false })).toBeVisible();
    await expect(dialog.getByRole('link', { name: 'Open Outlook', exact: false })).toBeVisible();
    const dimensions = await dialog.evaluate(node => {
      const box = node.getBoundingClientRect();
      return { left: box.left, right: box.right, width: innerWidth, overflow: node.scrollWidth > node.clientWidth };
    });
    expect(dimensions.left).toBeGreaterThanOrEqual(0);
    expect(dimensions.right).toBeLessThanOrEqual(dimensions.width);
    expect(dimensions.overflow).toBe(false);
    await dialog.getByRole('button', { name: 'Close email options', exact: true }).click();
    await expect(contactTrigger(page)).toBeFocused();

    await page.locator('#reading-toggle').click();
    await expect(page.locator('#panel-nav [data-panel="contact"]')).toHaveAttribute('aria-pressed', 'true');
    await contactTrigger(page).click();
    await expect(dialog).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(contactTrigger(page)).toBeFocused();
    await page.locator('#reading-toggle').click();

    await page.locator('#mobile-world-toggle').click();
    const meetMe = page.getByRole('link', { name: 'Meet me today', exact: false });
    await expect(meetMe).toBeVisible();
    await meetMe.click();
    await expect(dialog).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(meetMe).toBeFocused();
    await expect(page.locator('#panel-nav [data-panel="contact"]')).toHaveAttribute('aria-pressed', 'true');
  });
}

for (const clipboardAvailable of [true, false]) {
  test(`email address remains actionable when clipboard ${clipboardAvailable ? 'succeeds' : 'is unavailable'}`, async ({ page, baseURL }) => {
    await page.addInitScript(({ clipboardAvailable }) => {
      Object.defineProperty(navigator, 'clipboard', {
        configurable: true,
        value: { writeText: async value => {
          if (!clipboardAvailable) throw new Error('Clipboard permission denied');
          window.__copiedEmail = value;
        } },
      });
    }, { clipboardAvailable });
    await openContact(page, baseURL);
    await contactTrigger(page).click();
    const dialog = dialogFor(page);
    await dialog.getByRole('button', { name: 'Copy email address', exact: true }).click();
    const status = dialog.locator('#email-status');
    await expect(status).not.toBeEmpty();
    await expect(dialog.getByText(address, { exact: true })).toBeVisible();
    if (clipboardAvailable) {
      await expect(status).toContainText(/copied/i);
      expect(await page.evaluate(() => window.__copiedEmail)).toBe(address);
    } else {
      await expect(status).not.toContainText(/copied/i);
      await expect.poll(() => page.evaluate(() => window.getSelection()?.toString())).toBe(address);
      await expect(dialog.getByRole('link', { name: 'Open Gmail', exact: false })).toBeVisible();
      await expect(dialog.getByRole('link', { name: 'Open Outlook', exact: false })).toBeVisible();
    }
    await expect(dialog).toBeVisible();
  });
}
