// Test Case 13: Verify Product quantity in Cart
// 1. Launch browser
// 2. Navigate to url 'http://automationexercise.com'
// 3. Verify that home page is visible successfully
// 4. Click 'View Product' for any product on home page
// 5. Verify product detail is opened
// 6. Increase quantity to 4
// 7. Click 'Add to cart' button
// 8. Click 'View Cart' button
// 9. Verify that product is displayed in cart page with exact quantity

import { test, expect } from './baseTest';

test('Test Case 13: Verify Product quantity in Cart', async ({ page }) => {
  // 1. Steps 1 through 3 are handled by baseTest

  // 4. Click 'View Product' for first product on home page
  await page.click('a[href^="/product_details/"]');

  // 5. Verify product detail is opened
  await expect(page).toHaveURL(/\/product_details\/\d+/);
  await expect(page.locator('.product-information h2')).toBeVisible();

  // 6. Increase quantity to 4
  const quantityInput = page.locator('input#quantity');
  await quantityInput.fill('4');

  // 7. Click 'Add to cart' button
  await page.click('button.cart');

  // 8. Click 'View Cart' button
  await page.locator('u', { hasText: 'View Cart' }).click();

  // 9. Verify that product is displayed in cart page with exact quantity
  const cartItemQuantity = page.locator('table.table tbody tr:not(.cart_menu) .cart_quantity button.disabled');
  await expect(cartItemQuantity).toHaveText('4');
});