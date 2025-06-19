import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';

When('I add the first product to the cart', async function (this: CustomWorld) {
  await this.page.click('a[href="/products"]');
  await this.page.click('a[data-product-id="1"].add-to-cart');
});

When('I continue shopping', async function (this: CustomWorld) {
  await this.page.locator('button[data-dismiss="modal"]').click();
});

When('I add the second product to the cart', async function (this: CustomWorld) {
  await this.page.click('a[data-product-id="2"].add-to-cart');
});

Then('I should see at least 2 products in the cart', async function (this: CustomWorld) {
  const cartItems = this.page.locator('table.table tbody tr:not(.cart_menu)');
  const itemCount = await cartItems.count();
  expect(itemCount).toBeGreaterThanOrEqual(2);
});

Then('each product should show price, quantity, and total', async function (this: CustomWorld) {
  const cartItems = this.page.locator('table.table tbody tr:not(.cart_menu)');
  for (let i = 0; i < 2; i++) {
    const row = cartItems.nth(i);
    await expect(row.locator('.cart_price')).toBeVisible();
    await expect(row.locator('.cart_quantity')).toBeVisible();
    await expect(row.locator('.cart_total')).toBeVisible();
  }
});