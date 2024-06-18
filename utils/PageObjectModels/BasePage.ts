import {Locator, Page} from "@playwright/test";

export class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    get baseURL() {
        if(process.env.ENVIRONMENT === 'test') {
            return 'https://playwright.dev/';
        } else if(process.env.ENVIRONMENT === 'stage') {
            return 'https://playwright.dev/';
        } else {
            return 'https://playwright.dev/';
        }
    }

    async openPage() {
        await this.page.goto(this.baseURL);
    }

    async wait(seconds: number) {
        await this.page.waitForTimeout(seconds * 1000);
    }

    async getTableRowCount(tableRowsLocator: Locator): Promise<number> {
        return await tableRowsLocator.count();
    }

    async readRow(tableRowsLocator: Locator, rowIndex: number): Promise<string[]> {
        const row = tableRowsLocator.nth(rowIndex);
        const cells = row.locator('td');
        const cellTexts = [];
        const cellCount = await cells.count();
        for (let i = 0; i < cellCount; i++) {
            cellTexts.push(await cells.nth(i).innerText());
        }
        return cellTexts;
    }

    async readCell(tableRowsLocator: Locator, rowIndex: number, cellIndex: number): Promise<string> {
        const row = tableRowsLocator.nth(rowIndex);
        const cell = row.locator(`td:nth-child(${cellIndex + 1})`);
        return await cell.innerText();
    }
}