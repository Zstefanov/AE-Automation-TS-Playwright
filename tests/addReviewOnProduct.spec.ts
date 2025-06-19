// Test Case 21: Add review on product
// 1. Launch browser
// 2. Navigate to url 'http://automationexercise.com'
// 3. Click on 'Products' button
// 4. Verify user is navigated to ALL PRODUCTS page successfully
// 5. Click on 'View Product' button
// 6. Verify 'Write Your Review' is visible
// 7. Enter name, email and review
// 8. Click 'Submit' button
// 9. Verify success message 'Thank you for your review.'

import { test, expect } from './baseTest';

test('Test Case 21: Add review on product', async ({ page }) => {
    // 3. Click on 'Products' button
    await page.locator("a[href='/products']:has-text('Products')").click();

    // 4. Verify user is navigated to ALL PRODUCTS page successfully
    const allProductsTitle = page.locator("h2.title.text-center");
    await expect(allProductsTitle).toBeVisible();
    await expect(allProductsTitle).toHaveText(/All Products/i);

    // 5. Click on 'View Product' button for the first product
    await page.locator("a[href^='/product_details/']:has-text('View Product')").first().click();

    // 6. Verify 'Write Your Review' is visible
    const reviewLink = page.locator('a[href="#reviews"][data-toggle="tab"]');
    await expect(reviewLink).toHaveText('Write Your Review');

    // 7. Enter name, email and review
    await page.locator('input#name').fill('Playwright Tester');
    await page.locator('input#email').fill('tester@example.com');
    await page.locator('textarea#review').fill('This is an automated test review.');

    // 8. Click 'Submit' button
    //added delay to avoid flakiness
    await page.waitForTimeout(1000);
    await page.locator('button#button-review').click();

    // 9. Verify success message 'Thank you for your review.'
    const reviewSuccess = page.locator('#review-section .alert-success');
    await expect(reviewSuccess).toHaveText(/Thank you for your review\./i);
});