// Test Case 8: Verify All Products and product detail page
// 1. Launch browser
// 2. Navigate to url 'http://automationexercise.com'
// 3. Verify that home page is visible successfully
// 4. Click on 'Products' button
// 5. Verify user is navigated to ALL PRODUCTS page successfully
// 6. The products list is visible
// 7. Click on 'View Product' of first product
// 8. User is landed to product detail page
// 9. Verify that detail detail is visible: product name, category, price, availability, condition, brand

import { test, expect } from './baseTest';

test('Test Case 8: Verify All Products and product detail page', async ({ page }) => {
  // 1. Steps 1 through 3 are handled by baseTest
  
  // 4. Click on 'Products' button
  await page.click('a[href="/products"]');

  // 5. Verify user is navigated to ALL PRODUCTS page successfully
  await expect(page).toHaveURL(/\/products/);
  await expect(page.locator('h2').filter({ hasText: 'All Products' })).toBeVisible();

  // 6. The products list is visible
  const productCount = await page.locator('.features_items .product-image-wrapper').count();
  expect(productCount).toBeGreaterThan(0);

  // 7. Click on 'View Product' of first product
  await page.locator('a[href^="/product_details/"]').first().click();

  // 8. User is landed to product detail page
  await expect(page).toHaveURL(/\/product_details\/\d+/);

  // 9. Verify that detail is visible: product name, category, price, availability, condition, brand
  await expect(page.locator('.product-information h2')).toBeVisible(); // product name
  await expect(page.locator('.product-information p').nth(0)).toContainText('Category');
  await expect(page.locator('.product-information span span')).toContainText('Rs.'); // price
  await expect(page.locator('.product-information p').nth(1)).toContainText('Availability');
  await expect(page.locator('.product-information p').nth(2)).toContainText('Condition');
  await expect(page.locator('.product-information p').nth(3)).toContainText('Brand');
});