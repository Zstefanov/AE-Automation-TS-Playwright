// Test Case 22: Add to cart from Recommended items
// 1. Launch browser
// 2. Navigate to url 'http://automationexercise.com'
// 3. Scroll to bottom of page
// 4. Verify 'RECOMMENDED ITEMS' are visible
// 5. Click on 'Add To Cart' on Recommended product
// 6. Click on 'View Cart' button
// 7. Verify that product is displayed in cart page

import { test, expect } from './baseTest';

test('Test Case 22: Add to cart from Recommended items', async ({ page }) => {
    // 3. Scroll to bottom of page
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    // 4. Verify 'RECOMMENDED ITEMS' are visible using updated selector
    const recommendedTitle = page.locator('h2.title.text-center', { hasText: /recommended items/i });
    await expect(recommendedTitle).toBeVisible();

    // 5. Click on 'Add To Cart' on Recommended product (first available)
    // Find the container with "recommended items" and look for the first Add to cart button below it
    const recommendedSection = recommendedTitle.locator('xpath=following-sibling::*').first();
    const addToCartBtn = recommendedSection.locator('a', { hasText: 'Add to cart' }).first();
    await addToCartBtn.click();

    // 6. Click on 'View Cart' button in modal
    const viewCartBtn = page.locator('u', { hasText: 'View Cart' });
    await expect(viewCartBtn).toBeVisible({ timeout: 5000 });
    await viewCartBtn.click();

    // 7. Verify that product is displayed in cart page (using correct locator for product row)
    const cartProductRow = page.locator('tr[id^="product-"]');
     await expect(cartProductRow.first()).toBeVisible();
     });