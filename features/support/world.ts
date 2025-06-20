import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page, chromium, firefox, webkit, expect } from '@playwright/test';

async function handleCookieConsent(page: Page) {
    try {
        const cookieContainer = page.locator('p.fc-button-label', { hasText: 'Consent' });
        await expect(cookieContainer).toBeVisible({ timeout: 3000 });
        await cookieContainer.click({ force: true });
        console.log('Cookie consent clicked.');
    } catch (e) {
        console.log('Cookie consent not visible or already dismissed, proceeding.');
    }
}

export class CustomWorld extends World {
    browser!: Browser;
    context!: BrowserContext;
    page!: Page;
    // Store shared state for user
    productCountBefore?: number; // Store product count for reference in steps
    createdUser: {
        name: string;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        company: string;
        address1: string;
        address2: string;
        country: string;
        state: string;
        city: string;
        zipcode: string;
        mobile: string;
    } = {
        name: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        company: '',
        address1: '',
        address2: '',
        country: '',
        state: '',
        city: '',
        zipcode: '',
        mobile: ''
    };

    constructor(options: IWorldOptions) {
        super(options);
    }

    // async openBrowser() {
    //     this.browser = await chromium.launch({ headless: false });
    //     this.context = await this.browser.newContext();
    //     this.page = await this.context.newPage();
    //     await this.page.goto('https://automationexercise.com');
    //     await handleCookieConsent(this.page);
    // }

    async openBrowser() {
        const browserName = process.env.BROWSER?.toLowerCase() || 'chromium';

        const browserType = {
            chromium,
            firefox,
            webkit
        }[browserName];

        if (!browserType) {
            throw new Error(`Unsupported browser: ${browserName}`);
        }

        this.browser = await browserType.launch({ headless: false });
        this.context = await this.browser.newContext();
        this.page = await this.context.newPage();
        await this.page.goto('https://automationexercise.com');
        await handleCookieConsent(this.page);
    }

    async closeBrowser() {
        await this.page?.close();
        await this.context?.close();
        await this.browser?.close();
    }
}

setWorldConstructor(CustomWorld);