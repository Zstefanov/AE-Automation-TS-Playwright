// Test Case 17: Remove Products From Cart
// 1. Launch browser
// 2. Navigate to url 'http://automationexercise.com'
// 3. Verify that home page is visible successfully
// 4. Add products to cart
// 5. Click 'Cart' button
// 6. Verify that cart page is displayed
// 7. Click 'X' button corresponding to particular product
// 8. Verify that product is removed from the cart

import { test, expect } from './baseTest';

test('Test Case 17: Remove Products From Cart', async ({ page }) => {
    // 1 through 3 are handled by baseTest

    // 4. Add products to cart
    await page.click('a[href="/products"]');
    await page.click('a[data-product-id="1"].add-to-cart');
    await page.locator('button[data-dismiss="modal"]').click();
    await page.click('a[data-product-id="2"].add-to-cart');

     // 5. Click 'Cart' button
    await page.locator('u', { hasText: 'View Cart' }).click();

    // 6. Verify that cart page is displayed
    await expect(page.locator('li.active', { hasText: 'Shopping Cart' })).toBeVisible();

    // Count products before removal
    const productRows = page.locator('tr[id^="product-"]');
    const initialCount = await productRows.count();

    // 7. Click 'X' button corresponding to particular product (remove first product)
    await page.locator('a.cart_quantity_delete').first().click();

    // 8. Wait for product rows count to decrease by 1
    await expect(productRows).toHaveCount(initialCount - 1);
});