// Test Case 25: Verify Scroll Up using 'Arrow' button and Scroll Down functionality
// 1. Launch browser
// 2. Navigate to url 'http://automationexercise.com'
// 3. Verify that home page is visible successfully
// 4. Scroll down page to bottom
// 5. Verify 'SUBSCRIPTION' is visible
// 6. Click on arrow at bottom right side to move upward
// 7. Verify that page is scrolled up and 'Full-Fledged practice website for Automation Engineers' text is visible on screen

import { test, expect } from './baseTest';

test('Test Case 25: Verify Scroll Up using Arrow button and Scroll Down functionality', async ({ page }) => {
    // Steps 1 through 3 are handled by baseTest

    // 4. Scroll down page to bottom
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    // 5. Verify 'SUBSCRIPTION' is visible
    await expect(page.locator('h2:has-text("Subscription")')).toBeVisible();

    // 6. Click on arrow at bottom right side to move upward
    // Usually the scroll up arrow has id 'scrollUp' or similar; adjust as needed
    const scrollUpButton = page.locator('#scrollUp, .fa-angle-up, [href="#top"], [onclick*="scrollUp"]');
    await scrollUpButton.first().click();

    // 7. Verify that page is scrolled up and the specific text is visible
    await expect(page.locator('h2:has-text("Full-Fledged practice website for Automation Engineers")').first()).toBeVisible();
});