import {Page} from "@playwright/test";
import {BasePage} from "./BasePage";

export class PlaywrightLandingPage extends BasePage {
    readonly page: Page;

    constructor(page: Page) {
        super(page);
        this.page = page;
    }

    get pageTitle() {
        return this.page.locator('//h1[contains(@class, \'hero__title\')]');
    }

    get btnGetStarted() {
        return this.page.locator('//a[contains(@class, \'getStarted_Sjon\')]');
    }
}