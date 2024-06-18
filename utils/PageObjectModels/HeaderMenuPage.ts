import {BasePage} from "./BasePage";
import {expect, Page} from "@playwright/test";

export class HeaderMenuPage extends BasePage {
    readonly page: Page;

    constructor(page: Page) {
        super(page);
        this.page = page;
    }

    get navDocs() {
        return this.page.locator('//a[contains(text(), "Docs")]');
    }

    get navAPI() {
        return this.page.locator('//a[contains(text(), "API")]');
    }

    get navDropdownFramework() {
        return this.page.locator('//div[contains(@class, "dropdown")]');
    }

    get navDropdownFramework_NodeJS() {
        return this.page.locator('//a[@href="#"]');
    }

    get navDropdownFramework_Python() {
        return this.page.locator('//a[@href="/python/"]');
    }

    get navDropdownFramework_Java() {
        return this.page.locator('//a[@href="/java/"]');
    }

    get navDropdownFramework_DotNet() {
        return this.page.locator('//a[@href="/dotnet/"]');
    }

    get navCommunity() {
        return this.page.locator('//a[contains(text(), "Community")]');
    }

    get navGitHub() {
        return this.page.locator('//a[@aria-label="GitHub repository"]');
    }

    get navDiscord() {
        return this.page.locator('//a[@aria-label="Discord server"]');
    }

    get navOpenSearchBar() {
        return this.page.getByText("Search");
    }

    get inputSearchBarPopUp() {
        return this.page.locator('//*[@id="docsearch-input"]');
    }

    get allSearchResults() {
        return this.page.locator('li[class=\'DocSearch-Hit\'] a');
    }

    get allSearchResultsText() {
        return this.page.locator('//*[contains(@class, "DocSearch-Hit-title")]');
    }

    async gotoDocs() {
        await this.navDocs.click();
    }

    async gotoAPI() {
        await this.navAPI.click();
    }

    async switchFramework(goToFramework: 'Node.Js' | 'Python' | 'Java' | 'DotNet') {
        await this.navDropdownFramework.click();
        switch (goToFramework) {
            case 'Node.Js':
                await this.navDropdownFramework_NodeJS.click();
                break;
            case 'Python':
                await this.navDropdownFramework_Python.click();
                break;
            case 'Java':
                await this.navDropdownFramework_Java.click();
                break;
            case 'DotNet':
                await this.navDropdownFramework_DotNet.click();
                break;
        }
    }

    async gotoCommunity() {
        await this.navCommunity.click();
    }

    async goToGitHub() {
        await this.navGitHub.click();
    }

    async goToDiscord() {
        await this.navDiscord.click();
    }

    async searchForValueAndReturnAllSearchResults(searchTerm: string): Promise<string[]> {
        await this.navOpenSearchBar.click();
        await this.inputSearchBarPopUp.fill(searchTerm);

        const allSearchResults = [];
        const searchResults = this.allSearchResults;
        const searchResultsCount = await searchResults.count();
        for (let i = 0; i < searchResultsCount; i++) {
            allSearchResults.push(await this.allSearchResultsText.nth(i).innerText());
        }
        return allSearchResults;
    }

    async searchAndClickResultContainingString(searchTerm: string, containingString: string) {
        const searchResults = await this.searchForValueAndReturnAllSearchResults(searchTerm);
        for (let i = 0; i < searchResults.length; i++) {
            if (searchResults[i].includes(containingString)) {
                await this.allSearchResults.nth(i).click();
                break;
            }
        }
        await expect(this.allSearchResults).toHaveCount(0);
    }
}
