// Test Case 19: View & Cart Brand Products
// 1. Launch browser
// 2. Navigate to url 'http://automationexercise.com'
// 3. Click on 'Products' button
// 4. Verify that Brands are visible on left side bar
// 5. Click on any brand name
// 6. Verify that user is navigated to brand page and brand products are displayed
// 7. On left side bar, click on any other brand link
// 8. Verify that user is navigated to that brand page and can see products

import { test, expect } from './baseTest';

test('Test Case 19: View & Cart Brand Products', async ({ page }) => {
    // 1–2. Handled by baseTest

    // 3. Click on 'Products' button
    await page.click('a[href="/products"]');

    // 4. Verify that Brands are visible on left side bar
    await expect(page.locator('.brands_products')).toBeVisible();

    // 5. Click on any brand name (e.g., "Polo")
    await page.locator('.brands-name a', { hasText: 'Polo' }).click();

    // 6. Verify that user is navigated to brand page and brand products are displayed
    await expect(page.locator('h2.title.text-center')).toHaveText(/Brand - Polo Products/i);
    const poloProducts = await page.locator('.features_items .col-sm-4').count();
    expect(poloProducts).toBeGreaterThan(0);

    // 7. On left side bar, click on any other brand link (e.g., "H&M")
    await page.locator('.brands-name a', { hasText: 'H&M' }).click();

    // 8. Verify that user is navigated to that brand page and can see products
    await expect(page.locator('h2.title.text-center')).toHaveText(/Brand - H&M Products/i);
    const hmProducts = await page.locator('.features_items .col-sm-4').count();
    expect(hmProducts).toBeGreaterThan(0);
});