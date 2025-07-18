// Test Case 9: Search Product
// 1. Launch browser
// 2. Navigate to url 'http://automationexercise.com'
// 3. Verify that home page is visible successfully
// 4. Click on 'Products' button
// 5. Verify user is navigated to ALL PRODUCTS page successfully
// 6. Enter product name in search input and click search button
// 7. Verify 'SEARCHED PRODUCTS' is visible
// 8. Verify all the products related to search are visible

import { test, expect } from './baseTest';

test('Test Case 9: Search Product', async ({ page }) => {
  // Steps 1 through 3 are handled by baseTest
  
  // 4. Click on 'Products' button
  await page.click('a[href="/products"]');

  // 5. Verify user is navigated to ALL PRODUCTS page successfully
  await expect(page).toHaveURL(/\/products/);
  await expect(page.locator('h2').filter({ hasText: 'All Products' })).toBeVisible();

  // 6. Enter product name in search input and click search button
  const searchTerm = 'Dress'; // You can change this to any valid product name
  await page.fill('input[name="search"]', searchTerm);
  await page.click('button#submit_search');

  // 7. Verify 'SEARCHED PRODUCTS' is visible
  await expect(page.locator('h2').filter({ hasText: 'Searched Products' })).toBeVisible();

  // 8. Verify all the products related to search are visible
  const searchedProducts = page.locator('.features_items .product-image-wrapper');
  const searchedCount = await searchedProducts.count();
  expect(searchedCount).toBeGreaterThan(0);
});