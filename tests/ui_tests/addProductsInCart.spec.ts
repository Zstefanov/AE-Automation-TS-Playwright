// Test Case 12: Add Products in Cart
// 1. Launch browser
// 2. Navigate to url 'http://automationexercise.com'
// 3. Verify that home page is visible successfully
// 4. Click 'Products' button
// 5. Hover over first product and click 'Add to cart'
// 6. Click 'Continue Shopping' button
// 7. Hover over second product and click 'Add to cart'
// 8. Click 'View Cart' button
// 9. Verify both products are added to Cart
// 10. Verify their prices, quantity and total price

import { test, expect } from './baseTest';

test('Test Case 12: Add Products in Cart', async ({ page }) => {  
  // 1. Steps 1 through 3 are handled by baseTest

  // 4. Click 'Products' button
  await page.click('a[href="/products"]');

  // 5. Click 'Add to cart' for first product (product id = 1)
  await page.click('a[data-product-id="1"].add-to-cart');

  // 6. Click 'Continue Shopping' button
  await page.locator('button[data-dismiss="modal"]').click();

  // 7. Click 'Add to cart' for second product (product id = 2)
  await page.click('a[data-product-id="2"].add-to-cart');

  // 8. Click 'View Cart' button
  await page.locator('u', { hasText: 'View Cart' }).click();

  // 9. Verify both products are added to Cart using the cart table rows (excluding header)
  const cartItems = page.locator('table.table tbody tr:not(.cart_menu)');
  const itemCount = await cartItems.count();
  expect(itemCount).toBeGreaterThanOrEqual(2);

  // 10. Verify their prices, quantity and total price
  for (let i = 0; i < 2; i++) {
    const row = cartItems.nth(i);
    await expect(row.locator('.cart_price')).toBeVisible();
    await expect(row.locator('.cart_quantity')).toBeVisible();
    await expect(row.locator('.cart_total')).toBeVisible();
  }
});