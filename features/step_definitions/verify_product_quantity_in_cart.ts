import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';

// Step 4: Click 'View Product' for first product on home page
When('I view the first product on the home page', async function (this: CustomWorld) {
  await this.page.locator('a[href^="/product_details/"]').first().click();
});

// Step 6: Increase quantity to 4
When('I set the product quantity to {int}', async function (this: CustomWorld, quantity: number) {
  const quantityInput = this.page.locator('input#quantity');
  await quantityInput.fill(quantity.toString());
});

// Step 7: Click 'Add to cart' button
When('I add the product to the cart', async function (this: CustomWorld) {
  await this.page.click('button.cart');
});

// Step 8 already exists in your `CommonSteps` as:
// When('I view the cart', ...)

// Step 9: Verify quantity in cart
Then('I should see the product with quantity {int} in the cart', async function (this: CustomWorld, expectedQty: number) {
  const quantityLocator = this.page.locator('table.table tbody tr:not(.cart_menu) .cart_quantity button.disabled');
  await expect(quantityLocator).toHaveText(expectedQty.toString());
});