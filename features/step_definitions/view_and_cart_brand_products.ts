import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';

// Step for clicking on 'Products' button
When('I click on the Products button', async function (this: CustomWorld) {
  await this.page.click('a[href="/products"]');
});

// Step to verify brands list is visible
Then('I should see the list of available brands', async function (this: CustomWorld) {
  await expect(this.page.locator('.brands_products')).toBeVisible();
});

// Step for selecting a brand from the sidebar
When('I select the {string} brand', async function (this: CustomWorld, brand: string) {
  await this.page.locator('.brands-name a', { hasText: brand }).click();
});

// Step to verify brand product list
Then('I should see products listed for brand {string}', async function (this: CustomWorld, brand: string) {
  const brandTitle = this.page.locator('h2.title.text-center');
  await expect(brandTitle).toHaveText(new RegExp(`Brand - ${brand} Products`, 'i'));
  const productCount = await this.page.locator('.features_items .col-sm-4').count();
  expect(productCount).toBeGreaterThan(0);
});
