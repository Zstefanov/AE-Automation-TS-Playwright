// ' Test Case 24: Download Invoice after purchase order
// ' 1. Launch browser
// ' 2. Navigate to url 'http://automationexercise.com'
// ' 3. Verify that home page is visible successfully
// ' 4. Add products to cart
// ' 5. Click 'Cart' button
// ' 6. Verify that cart page is displayed
// ' 7. Click Proceed To Checkout
// ' 8. Click 'Register / Login' button
// ' 9. Fill all details in Signup and create account
// ' 10. Verify 'ACCOUNT CREATED!' and click 'Continue' button
// ' 11. Verify ' Logged in as username' at top
// ' 12.Click 'Cart' button
// ' 13. Click 'Proceed To Checkout' button
// ' 14. Verify Address Details and Review Your Order
// ' 15. Enter description in comment text area and click 'Place Order'
// ' 16. Enter payment details: Name on Card, Card Number, CVC, Expiration date
// ' 17. Click 'Pay and Confirm Order' button
// ' 18. Verify success message 'Your order has been placed successfully!'
// ' 19. Click 'Download Invoice' button and verify invoice is downloaded successfully.
// ' 20. Click 'Continue' button
// ' 21. Click 'Delete Account' button
// ' 22. Verify 'ACCOUNT DELETED!' and click 'Continue' button

import { test, expect } from './baseTest';
import { UserActions } from '../../helpers/userCreation';
import fs from 'fs';
import path from 'path';

//tmp directory for downloads
test('Test Case 24: Download Invoice after purchase order', async ({ page, context, tmpDir }) => {
  // 3. Home page should be visible (baseTest already checks this)

  // 4. Add products to cart (from the products page)
  await page.locator('a[href="/products"]').click();
  await page.locator('a:has-text("Add to cart")').first().click();

  // Wait for modal and click 'View Cart'
  const viewCartBtn = page.locator('u', { hasText: 'View Cart' });
  await expect(viewCartBtn).toBeVisible({ timeout: 5000 });
  await viewCartBtn.click();

  // 5. Cart page is now displayed
  // 6. Verify cart page
  await expect(page.locator('div.checkout-information, .cart_info')).toBeVisible();

  // 7. Click Proceed To Checkout
  await page.locator('a:has-text("Proceed To Checkout")').click();

  // 8. Click 'Register / Login' button (if checkout prompts for login)
  if (await page.locator('a:has-text("Register / Login")').isVisible({ timeout: 2000 })) {
    await page.locator('a:has-text("Register / Login")').click();
  }

  // 9-10. Register a new user using the helper method
  const user = await UserActions.createUser(page);

  // 11. Verify 'Logged in as username' at top
  await expect(page.locator('a').filter({ hasText: new RegExp(`Logged in as ${user.name}`, 'i') })).toBeVisible();

  // 12. Click 'Cart' button
  const cartButton = page.locator('a[href="/view_cart"]:has-text("Cart")');
  await cartButton.first().click();

  // 13. Click 'Proceed To Checkout' button
  await page.locator('a:has-text("Proceed To Checkout")').click();

  // 14. Verify Address Details and Review Your Order
  await expect(page.locator('ul#address_delivery')).toBeVisible();
  await expect(page.locator('ul#address_invoice')).toBeVisible();
  await expect(page.locator('.checkout-information')).toBeVisible();

  // 15. Enter description in comment text area and click 'Place Order'
  await page.locator('textarea[name="message"]').fill('Automated order test - please ignore.');
  await page.locator('a:has-text("Place Order")').click();

  // 16. Enter payment details
  await page.locator('input[name="name_on_card"]').fill('Test User');
  await page.locator('input[name="card_number"]').fill('4111111111111111');
  await page.locator('input[name="cvc"]').fill('123');
  await page.locator('input[name="expiry_month"]').fill('12');
  await page.locator('input[name="expiry_year"]').fill('2030');

  // 17. Click 'Pay and Confirm Order' button
  await page.locator('button#submit').click();

  // 18. Verify success message 'Congratulations! Your order has been confirmed!'
  const confirmationMessage = page.locator('p', { hasText: 'Congratulations! Your order has been confirmed!' });
  await expect(confirmationMessage).toBeVisible();

  // 19. Click 'Download Invoice' button and verify invoice is downloaded successfully.
  // Set up download event handler
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.locator('a:has-text("Download Invoice")').click(),
  ]);
  const downloadPath = tmpDir ? path.join(tmpDir, await download.suggestedFilename()) : await download.path();
  await download.saveAs(downloadPath);
  expect(fs.existsSync(downloadPath)).toBeTruthy();

  // 20. Click 'Continue' button
  await UserActions.clickContinue(page);

  // 21. Click 'Delete Account' button
  await UserActions.deleteAccount(page);

  // 22. Account deletion and continue handled in helper
});