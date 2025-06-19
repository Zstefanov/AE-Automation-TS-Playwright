import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';

// Navigate to All Products page
When('I navigate to the All Products page', async function (this: CustomWorld) {
    await this.page.click('a[href="/products"]');
});

// Verify products list is visible
Then('I should see the products list', async function (this: CustomWorld) {
    const productCount = await this.page.locator('.features_items .product-image-wrapper').count();
    expect(productCount).toBeGreaterThan(0);
});

// Verify product details are visible
Then('I should see product details: name, category, price, availability, condition, brand', async function (this: CustomWorld) {
    await expect(this.page.locator('.product-information h2')).toBeVisible(); // product name
    await expect(this.page.locator('.product-information p').nth(0)).toContainText('Category');
    await expect(this.page.locator('.product-information span span')).toContainText('Rs.');
    await expect(this.page.locator('.product-information p').nth(1)).toContainText('Availability');
    await expect(this.page.locator('.product-information p').nth(2)).toContainText('Condition');
    await expect(this.page.locator('.product-information p').nth(3)).toContainText('Brand');
});