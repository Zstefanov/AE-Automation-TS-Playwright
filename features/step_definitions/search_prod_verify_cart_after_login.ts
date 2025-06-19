import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';

When('I add searched product with id {string} to the cart', async function (this: CustomWorld, productId: string) {
  await this.page.locator(`a.add-to-cart[data-product-id='${productId}']:visible`).first().click();
});

Then('I should see the product {string} in the cart', async function (this: CustomWorld, productName: string) {
  const productInCart = this.page.locator("tr", { hasText: productName });
  await expect(productInCart).toBeVisible();
});

When('I login with valid credentials', async function (this: CustomWorld) {
  await this.page.locator("a[href='/login']:has-text('Signup / Login')").click();
  
  const email = process.env.EMAIL!;
  const password = process.env.PASSWORD!;
  
  await this.page.locator('input[data-qa="login-email"]').fill(email);
  await this.page.locator('input[data-qa="login-password"]').fill(password);
  await this.page.locator('button[data-qa="login-button"]').click();
});

When('I navigate to the cart page', async function (this: CustomWorld) {
  await this.page.getByRole('link', { name: 'Cart' }).click();
});

Then('I should still see the product {string} in the cart', async function (this: CustomWorld, productName: string) {
  const productInCart = this.page.locator("tr", { hasText: productName });
  await expect(productInCart).toBeVisible();
});