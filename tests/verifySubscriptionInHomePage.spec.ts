// Test Case 10: Verify Subscription in home page
// 1. Launch browser
// 2. Navigate to url 'http://automationexercise.com'
// 3. Verify that home page is visible successfully
// 4. Scroll down to footer
// 5. Verify text 'SUBSCRIPTION'
// 6. Enter email address in input and click arrow button
// 7. Verify success message 'You have been successfully subscribed!' is visible

import { test, expect } from './baseTest';

test('Test Case 10: Verify Subscription in home page', async ({ page }) => {
  // 1. Steps 1 through 3 are handled by baseTest
  
  // 4. Scroll down to footer
  await page.locator('footer').scrollIntoViewIfNeeded();

  // 5. Verify text 'SUBSCRIPTION'
  await expect(page.locator('h2').filter({ hasText: 'Subscription' })).toBeVisible();

  // 6. Enter email address in input and click arrow button
  await page.fill('input#susbscribe_email', 'testuser+' + Date.now() + '@example.com');
  await page.click('button#subscribe');

  // 7. Verify success message 'You have been successfully subscribed!' is visible
  await expect(page.locator('.alert-success')).toHaveText('You have been successfully subscribed!');
});