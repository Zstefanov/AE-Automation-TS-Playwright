// Test Case 5: Register User with existing email
// 1. Launch browser
// 2. Navigate to url 'http://automationexercise.com'
// 3. Verify that home page is visible successfully
// 4. Click on 'Signup / Login' button
// 5. Verify 'New User Signup!' is visible
// 6. Enter name and already registered email address
// 7. Click 'Signup' button
// 8. Verify error 'Email Address already exist!' is visible


import { test, expect } from './baseTest'; 

test('Register User with existing email', async ({ page }) => {
  // 1. Steps 1 through 3 are completed in baseTest

  // 4. Click on 'Signup / Login' button
  await page.click('a[href="/login"]');

  // 5. Verify 'New User Signup!' is visible
  await expect(page.locator('h2').filter({ hasText: 'New User Signup!' })).toBeVisible();

  // 6. Enter name and already registered email address
  const existingEmail = process.env.EMAIL!; // reuse from env
  const name = 'TestUser';

  await page.fill('input[data-qa="signup-name"]', name);
  await page.fill('input[data-qa="signup-email"]', existingEmail);

  // 7. Click 'Signup' button
  await page.click('button[data-qa="signup-button"]');

  // 8. Verify error 'Email Address already exist!' is visible
  await expect(page.locator('p').filter({ hasText: 'Email Address already exist!' })).toBeVisible();
});