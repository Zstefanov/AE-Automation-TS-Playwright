// Test Case 11: Verify Subscription in Cart page
// 1. Launch browser
// 2. Navigate to url 'http://automationexercise.com'
// 3. Verify that home page is visible successfully
// 4. Click 'Cart' button
// 5. Scroll down to footer
// 6. Verify text 'SUBSCRIPTION'
// 7. Enter email address in input and click arrow button
// 8. Verify success message 'You have been successfully subscribed!' is visible

import { test, expect } from './baseTest';

test('Test Case 11: Verify Subscription in Cart page', async ({ page }) => {
  // 1. Steps 1 through 3 are handled by baseTest
  
  // 4. Click 'Cart' button
 // Locate by text
const cartButton = page.locator('a[href="/view_cart"]');
await cartButton.first().click();

  // 5. Scroll down to footer
  await page.locator('footer').scrollIntoViewIfNeeded();

  // 6. Verify text 'SUBSCRIPTION'
  await expect(page.locator('h2').filter({ hasText: 'Subscription' })).toBeVisible();

  // 7. Enter email address in input and click arrow button
  await page.fill('input#susbscribe_email', 'testuser+' + Date.now() + '@example.com');
  await page.click('button#subscribe');

  // 8. Verify success message 'You have been successfully subscribed!' is visible
  await expect(page.locator('.alert-success')).toHaveText('You have been successfully subscribed!');
});