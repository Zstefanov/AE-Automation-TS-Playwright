import { test as base, expect, Page } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import os from 'os';

import { PlaywrightBlocker } from '@cliqz/adblocker-playwright';


// Utility function for cookie consent
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

// Extend the default playwright test
export const test = base.extend<{
    tmpDir: string;
}>({
    // This hook will run before each test
    page: async ({ page }, use) => {
        //enable adblocker due to test flakiness caused by ads
        const blocker = await PlaywrightBlocker.fromPrebuiltAdsAndTracking(fetch);
        await blocker.enableBlockingInPage(page);

        await page.goto('/');
        await expect(page).toHaveURL(/automationexercise\.com/);
        await expect(page.locator('img[alt="Website for automation practice"]')).toBeVisible();
        await handleCookieConsent(page);
        await use(page);
    },

    // tmpDir fixture for downloads(used in downloadInvoiceAfterPurchaseOrder.spec.ts)
    tmpDir: async ({ }, use) => {
        const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'pw-downloads-'));
        await use(dir);
        // Clean up after test
        fs.rmSync(dir, { recursive: true, force: true });
    }
});

export { expect, Page };