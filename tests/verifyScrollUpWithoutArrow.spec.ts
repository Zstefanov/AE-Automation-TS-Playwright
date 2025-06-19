// Test Case 26: Verify Scroll Up without 'Arrow' button and Scroll Down functionality
// 1. Launch browser
// 2. Navigate to url 'http://automationexercise.com'
// 3. Verify that home page is visible successfully
// 4. Scroll down page to bottom
// 5. Verify 'SUBSCRIPTION' is visible
// 6. Scroll up page to top
// 7. Verify that page is scrolled up and 'Full-Fledged practice website for Automation Engineers' text is visible on screen

import { test, expect } from './baseTest';
test('Test Case 26: Verify Scroll Up without Arrow button and Scroll Down functionality', async ({ page }) => {
  // Steps 1 through 3 are handled by baseTest

  // 4. Scroll down page to bottom
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

  // 5. Verify 'SUBSCRIPTION' is visible
  await expect(page.locator('h2:has-text("Subscription")')).toBeVisible();

  // 6. Scroll up page to top
  await page.evaluate(() => window.scrollTo(0, 0));

  // 7. Verify that page is scrolled up and the specific text is visible
  await expect(page.locator('h2:has-text("Full-Fledged practice website for Automation Engineers")').first()).toBeVisible();
});
