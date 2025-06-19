// Test Case 18: View Category Products
// 1. Launch browser
// 2. Navigate to url 'http://automationexercise.com'
// 3. Verify that categories are visible on left side bar
// 4. Click on 'Women' category
// 5. Click on any category link under 'Women' category, for example: Dress
// 6. Verify that category page is displayed and confirm text 'WOMEN - TOPS PRODUCTS'
// 7. On left side bar, click on any sub-category link of 'Men' category
// 8. Verify that user is navigated to that category page

import { test, expect } from './baseTest';

test('Test Case 18: View Category Products', async ({ page }) => {
    // 1–2. Handled by baseTest

    // 3. Verify that categories are visible on left side bar
    await expect(page.locator('.left-sidebar .panel-group')).toBeVisible();

    // 4. Click on 'Women' category (expand)
    await page.locator('a[href="#Women"]').click();

    // 5. Click on a sub-category under 'Women', for example: Dress
    await page.locator('#Women').locator('a', { hasText: 'Dress' }).click();

    // 6. Verify that category page is displayed and confirm text 'WOMEN - DRESS PRODUCTS'
    await expect(page.locator('h2.title.text-center')).toHaveText(/WOMEN - DRESS PRODUCTS/i);

    // 7. On left side bar, click on any sub-category link of 'Men' category
    await page.locator('a[href="#Men"]').click();
    await page.locator('#Men').locator('a', { hasText: 'Tshirts' }).click();

    // 8. Verify that user is navigated to that category page
    await expect(page.locator('h2.title.text-center')).toHaveText(/MEN - TSHIRTS PRODUCTS/i);
});