// Test Case 3: Login User with incorrect email and password
// 1. Launch browser
// 2. Navigate to url 'http://automationexercise.com'
// 3. Verify that home page is visible successfully
// 4. Click on 'Signup / Login' button
// 5. Verify 'Login to your account' is visible
// 6. Enter incorrect email address and password
// 7. Click 'login' button
// 8. Verify error 'Your email or password is incorrect!' is visible


import { test, expect } from './baseTest';

test('Verify login with incorrect credentials', async ({ page }) => {
    //1 and 2 handled by baseTest setup

    // 3. Verify that home page is visible successfully
    await expect(page.locator('img[alt="Website for automation practice"]')).toBeVisible();

    // 4. Click on 'Signup / Login' button
    await page.click('a[href="/login"]');

    // 5. Verify 'Login to your account' is visible
    await expect(page.locator('h2').filter({ hasText: 'Login to your account' })).toBeVisible();

    // 6. Enter incorrect email address and password
    await page.fill('input[data-qa="login-email"]', 'wrongemail@example.com');
    await page.fill('input[data-qa="login-password"]', 'wrongpassword');

    // 7. Click 'login' button
    await page.click('button[data-qa="login-button"]');

    // 8. Verify error 'Your email or password is incorrect!' is visible
    // Locate using the text content directly
    await expect(page.locator('p', { hasText: 'Your email or password is incorrect!' })).toBeVisible();
});