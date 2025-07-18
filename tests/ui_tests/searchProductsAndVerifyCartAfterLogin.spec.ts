// Test Case 20: Search Products and Verify Cart After Login
// 1. Launch browser
// 2. Navigate to url 'http://automationexercise.com'
// 3. Click on 'Products' button
// 4. Verify user is navigated to ALL PRODUCTS page successfully
// 5. Enter product name in search input and click search button
// 6. Verify 'SEARCHED PRODUCTS' is visible
// 7. Verify all the products related to search are visible
// 8. Add those products to cart
// 9. Click 'Cart' button and verify that products are visible in cart
// 10. Click 'Signup / Login' button and submit login details
// 11. Again, go to Cart page
// 12. Verify that those products are visible in cart after login as well

import { test, expect } from './baseTest';

test('Test Case 20: Search Products and Verify Cart After Login', async ({ page }) => {
    // 1-2. Handled by Playwright test config or fixture

    // 3. Click on 'Products' page
    await page.locator("a[href='/products']:has-text('Products')").click();

    // 4. Verify user is navigated to ALL PRODUCTS page successfully
    const allProductsTitle = page.locator("h2.title.text-center");
    await expect(allProductsTitle).toBeVisible();
    await expect(allProductsTitle).toHaveText(/All Products/i);

    // 5. Enter product name in search input and click search button
    const productToSearch = "Men Tshirt";
    await page.locator("#search_product").fill(productToSearch);
    await page.locator("i.fa.fa-search").click();

    // 6. Verify 'SEARCHED PRODUCTS' is visible (checks for the product name in results)
    await expect(page.locator("div.productinfo p", { hasText: productToSearch })).toBeVisible();

    // 7-8. Add those products to cart
    await page.locator("a.add-to-cart[data-product-id='2']:visible").first().click();

    // 9. Click open cart to view the product
    await page.locator("u", { hasText: "View Cart" }).click();

    // 10. Click 'Signup / Login' button and submit login details
     await page.locator("a[href='/login']:has-text('Signup / Login')").click();
    // Replace with your actual test credentials
    const email = process.env.EMAIL!;
    const password = process.env.PASSWORD!;
    await page.locator("a[href='/login']").click();
    await page.locator('input[data-qa="login-email"]').fill(email);
    await page.locator('input[data-qa="login-password"]').fill(password);
    await page.locator('button[data-qa="login-button"]').click();

    // 11. Navigate to cart page
    await page.getByRole('link', { name: 'Cart' }).click();

    // 12. Verify that the products we chose are visible in cart after login as well
    const productInCart = page.locator("tr", { hasText: productToSearch });
    await expect(productInCart).toBeVisible();
});