import {expect, test} from "@playwright/test";
import {BasePage} from "../utils/PageObjectModels/BasePage";

test('Setup: verify test page is available', async ({ page }) => {
    const basePage = new BasePage(page);

    await basePage.openPage();

    expect(page.url()).toBe('https://playwright.dev/');
});