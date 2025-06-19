import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';
import { UserActions } from '../../helpers/userCreation';
import fs from 'fs';
import path from 'path';

let createdUser: { name: string } = { name: '' };
let downloadPath: string;

When('I add a product to the cart', async function (this: CustomWorld) {
  await this.page.locator('a[href="/products"]').click();
  await this.page.locator('a:has-text("Add to cart")').first().click();

  const viewCartBtn = this.page.locator('u', { hasText: 'View Cart' });
  await expect(viewCartBtn).toBeVisible({ timeout: 5000 });
  await viewCartBtn.click();
});

When('I proceed to checkout with possible login', async function (this: CustomWorld) {
  await expect(this.page.locator('div.checkout-information, .cart_info')).toBeVisible();
  await this.page.locator('a:has-text("Proceed To Checkout")').click();

  // Handle login/register if necessary
  if (await this.page.locator('a:has-text("Register / Login")').isVisible({ timeout: 2000 })) {
    await this.page.locator('a:has-text("Register / Login")').click();
  }
});

Then('I should be logged in as the new user', async function (this: CustomWorld) {
  await expect(this.page.locator('a').filter({ hasText: new RegExp(`Logged in as ${createdUser.name}`, 'i') })).toBeVisible();
});

When('I navigate to cart page', async function (this: CustomWorld) {
  await this.page.locator('a[href="/view_cart"]:has-text("Cart")').first().click();
});

When('I enter order comment and place the order', async function (this: CustomWorld) {
  await this.page.locator('textarea[name="message"]').fill('Automated order test - please ignore.');
  await this.page.locator('a:has-text("Place Order")').click();
});

When('I enter payment details', async function (this: CustomWorld) {
  await this.page.locator('input[name="name_on_card"]').fill('Test User');
  await this.page.locator('input[name="card_number"]').fill('4111111111111111');
  await this.page.locator('input[name="cvc"]').fill('123');
  await this.page.locator('input[name="expiry_month"]').fill('12');
  await this.page.locator('input[name="expiry_year"]').fill('2030');
});

When('I confirm the payment', async function (this: CustomWorld) {
  await this.page.locator('button#submit').click();
});

Then('I should see order confirmation message {string}', async function (this: CustomWorld, expectedMessage: string) {
  const confirmationMessage = this.page.locator('p', { hasText: expectedMessage });
  await expect(confirmationMessage).toBeVisible();
});

When('I download the invoice', async function (this: CustomWorld) {
  const [download] = await Promise.all([
    this.page.waitForEvent('download'),
    this.page.locator('a:has-text("Download Invoice")').click(),
  ]);

  const filePath = this.parameters.tmpDir
    ? path.join(this.parameters.tmpDir, await download.suggestedFilename())
    : await download.path();

  await download.saveAs(filePath);
  downloadPath = filePath;
});

Then('The invoice file should be downloaded', async function () {
  expect(fs.existsSync(downloadPath)).toBeTruthy();
});

When('I continue after order', async function (this: CustomWorld) {
  await UserActions.clickContinue(this.page);
});

When('I delete the account', async function (this: CustomWorld) {
  await UserActions.deleteAccount(this.page);
});