// Test Case 2: Login User with correct email and password
// 1. Launch browser
// 2. Navigate to url 'http://automationexercise.com'
// 3. Verify that home page is visible successfully
// 4. Click on 'Signup / Login' button
// 5. Verify 'Login to your account' is visible
// 6. Enter correct email address and password
// 7. Click 'login' button
// 8. Verify that 'Logged in as username' is visible
// 9. Click 'Delete Account' button
// 10. Verify that 'ACCOUNT DELETED!' is visible


import { test, expect, type Page } from '@playwright/test';
import { UserActions } from '../helpers/userCreation';


// Define a test suite or a single test.
// 'test.describe' can group related tests, but for a single test, 'test' is sufficient.
test('Login User with correct email and password and then delete account', async ({ page }) => {

  var user = await UserActions.createUser(page);
  // Extract the email and password from the created user object.
  const userEmail = user.email;
  const userPassword = user.password || 'Password123'; // Use a default password if not provided

  // 1. We are already navigated to the home page from the user creation step(Steps 1 through 3)

  // Logout of the account as we are already logged in
  await page.locator('a[href="/logout"]').click();

  // 4. Click on 'Signup / Login' button
  await test.step('Click on "Signup / Login" button', async () => {
    // Locate the 'Signup / Login' button and click it.
    await page.locator('a[href="/login"]').click();
    console.log('Step 4: Clicked "Signup / Login".');
  });

  // 5. Verify 'Login to your account' is visible
  await test.step('Verify "Login to your account" heading is visible', async () => {
    // Expect the heading 'Login to your account' to be visible on the new page.
    await expect(page.locator('h2:has-text("Login to your account")')).toBeVisible();
    console.log('Step 5: Verified "Login to your account" heading.');
  });

  // 6. Enter correct email address and password
  await test.step('Enter correct email and password', async () => {
    await page.locator('[data-qa="login-email"]').fill(userEmail);
    await page.locator('[data-qa="login-password"]').fill(userPassword);
    console.log(`Step 6: Entered email: ${userEmail} and password.`);
  });

  // 7. Click 'login' button
  await test.step('Click "Login" button', async () => {
    await page.locator('[data-qa="login-button"]').click();
  });

  // 8. Verify that 'Logged in as username' is visible
  await test.step('Verify "Logged in as username" is visible', async () => {
    await expect(page.locator(`text=Logged in as ${user.name}`)).toBeVisible();
    console.log('Step 8: Verified "Logged in as username" text.');
  });

  // 9. Click 'Delete Account' button
  await test.step('Click "Delete Account" button', async () => {
    // Locate and click the 'Delete Account' button.
    await page.locator('a[href="/delete_account"]').click();
    console.log('Step 9: Clicked "Delete Account" button.');
  });

  // 10. Verify that 'ACCOUNT DELETED!' is visible
  await test.step('Verify "ACCOUNT DELETED!" is visible', async () => {
    // Expect the success message after account deletion to be visible.
    await expect(page.locator('h2:has-text("ACCOUNT DELETED!")')).toBeVisible();
    console.log('Step 10: Verified "ACCOUNT DELETED!" message.');
  });
});