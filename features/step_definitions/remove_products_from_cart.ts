import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';

// Reuse: Adding multiple products already implemented in previous steps (if needed you can centralize it in common steps later)

When('I remove a product from the cart', async function (this: CustomWorld) {
  // Capture product count before deletion
  const productRows = this.page.locator('tr[id^="product-"]');
  const countBefore = await productRows.count();

  // Store count in world context for later verification
  this.attach(`Initial product count: ${countBefore}`);
  this.productCountBefore = countBefore;

  // Remove first product
  await this.page.locator('a.cart_quantity_delete').first().click();
});

Then('the product should no longer be visible in the cart', async function (this: CustomWorld) {
  const productRows = this.page.locator('tr[id^="product-"]');
  if (typeof this.productCountBefore !== 'number') {
    throw new Error('productCountBefore is undefined');
  }
  await expect(productRows).toHaveCount(this.productCountBefore - 1);
});