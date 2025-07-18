// Test Case 4: Logout User
// 1. Launch browser
// 2. Navigate to url 'http://automationexercise.com'
// 3. Verify that home page is visible successfully
// 4. Click on 'Signup / Login' button
// 5. Verify 'Login to your account' is visible
// 6. Enter correct email address and password
// 7. Click 'login' button
// 8. Verify that 'Logged in as username' is visible
// 9. Click 'Logout' button
// 10. Verify that user is navigated to login page

import { test, expect } from './baseTest'; 

const email = process.env.EMAIL!;
const password = process.env.PASSWORD!;


test('Logout User', async ({ page }) => {
  //steps 1 through 3 are handled by baseTest setup

  // 4. Click on 'Signup / Login' button
  await page.click('a[href="/login"]');

  // 5. Verify 'Login to your account' is visible
  await expect(page.locator('h2').filter({ hasText: 'Login to your account' })).toBeVisible();

  // 6. Enter correct email address and password
  await page.fill('input[data-qa="login-email"]', email);
  await page.fill('input[data-qa="login-password"]', password);

  // 7. Click 'login' button
  await page.click('button[data-qa="login-button"]');

  // 8. Verify that 'Logged in as username' is visible
  await expect(page.locator('a').filter({ hasText: 'Logged in as' })).toBeVisible();

  // 9. Click 'Logout' button
  await page.click('a[href="/logout"]');

  // 10. Verify that user is navigated to login page
  await expect(page).toHaveURL(/.*\/login/);
  await expect(page.locator('h2').filter({ hasText: 'Login to your account' })).toBeVisible();
});