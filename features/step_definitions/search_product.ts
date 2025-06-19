import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';

When('I navigate to the {string} page', async function (this: CustomWorld, pageName: string) {
  let url = '/';
  if (pageName.toLowerCase() === 'products') {
    url = '/products';
  }
  await this.page.click(`a[href="${url}"]`);
});

Then('I should be on the {string} page', async function (this: CustomWorld, pageName: string) {
  if (pageName.toLowerCase() === 'products') {
    await expect(this.page).toHaveURL(/\/products/);
    await expect(this.page.locator('h2').filter({ hasText: 'All Products' })).toBeVisible();
  }
});

When('I search for the product {string}', async function (this: CustomWorld, productName: string) {
  await this.page.fill('input[name="search"]', productName);
  await this.page.click('button#submit_search');
});

Then('I should see the {string} section', async function (this: CustomWorld, sectionName: string) {
  await expect(this.page.locator('h2').filter({ hasText: sectionName })).toBeVisible();
});

Then('I should see at least one product displayed', async function (this: CustomWorld) {
  const searchedProducts = this.page.locator('.features_items .product-image-wrapper');
  const searchedCount = await searchedProducts.count();
  expect(searchedCount).toBeGreaterThan(0);
});