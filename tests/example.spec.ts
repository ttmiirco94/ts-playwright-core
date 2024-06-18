import { test, expect } from '@playwright/test';
import {HeaderMenuPage} from "../utils/PageObjectModels/HeaderMenuPage";

test('Header Menu Navigation: Go to API', async ({ page }) => {
  const headerMenuPage = new HeaderMenuPage(page);

  await headerMenuPage.openPage();
  await headerMenuPage.gotoAPI();

  await expect(headerMenuPage.navAPI.first()).toHaveAttribute('aria-current', 'page');
  await expect(page).toHaveTitle(/Playwright Library/);
});

test('Header Menu Navigation: Go to Community', async ({ page }) => {
  const headerMenuPage = new HeaderMenuPage(page);

  await headerMenuPage.openPage();
  await headerMenuPage.gotoCommunity();

  await expect(headerMenuPage.navCommunity.first()).toHaveAttribute('aria-current', 'page');
  await expect(page).toHaveTitle(/Welcome/);
});

test('Header Menu Navigation: Switch to Java', async ({ page }) => {
  const headerMenuPage = new HeaderMenuPage(page);

  await headerMenuPage.openPage();
  await headerMenuPage.switchFramework('Java');

  await expect(page.locator('//b[contains(@class, "navbar__title")]')).toHaveText('Playwright for Java');
});
