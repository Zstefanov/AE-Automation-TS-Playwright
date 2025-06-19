// Test Case 7: Verify Test Cases Page
// 1. Launch browser
// 2. Navigate to url 'http://automationexercise.com'
// 3. Verify that home page is visible successfully
// 4. Click on 'Test Cases' button
// 5. Verify user is navigated to test cases page successfully


import { test, expect } from './baseTest';

test('Test Case 7: Verify Test Cases Page', async ({ page }) => {
  // 1. Steps 1 through 3 are handled by baseTest
  
  // 4. Click on 'Test Cases' button
  await page.click('a[href="/test_cases"]');

  // 5. Verify user is navigated to test cases page successfully
  await expect(page).toHaveURL(/\/test_cases/);
  await expect(page.locator('h2').filter({ hasText: 'Test Cases' })).toBeVisible();
});