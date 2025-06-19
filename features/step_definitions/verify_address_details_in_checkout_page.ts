import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';

let createdUser: { name: string, email: string, password: string } = { name: '', email: '', password: '' };

Then('the delivery address should match registered user data', async function (this: CustomWorld) {
  const user = this.createdUser;
  const deliveryAddress = this.page.locator('ul#address_delivery');

  await expect(deliveryAddress).toContainText(user.firstName);
  await expect(deliveryAddress).toContainText(user.lastName);
  await expect(deliveryAddress).toContainText(user.company);
  await expect(deliveryAddress).toContainText(user.address1);
  await expect(deliveryAddress).toContainText(user.address2);
  await expect(deliveryAddress).toContainText(user.city);
  await expect(deliveryAddress).toContainText(user.state);
  await expect(deliveryAddress).toContainText(user.zipcode);
  await expect(deliveryAddress).toContainText(user.country);
  await expect(deliveryAddress).toContainText(user.mobile);
});

Then('the billing address should match registered user data', async function (this: CustomWorld) {
  const user = this.createdUser;
  const billingAddress = this.page.locator('ul#address_invoice');

  await expect(billingAddress).toContainText(user.firstName);
  await expect(billingAddress).toContainText(user.lastName);
  await expect(billingAddress).toContainText(user.company);
  await expect(billingAddress).toContainText(user.address1);
  await expect(billingAddress).toContainText(user.address2);
  await expect(billingAddress).toContainText(user.city);
  await expect(billingAddress).toContainText(user.state);
  await expect(billingAddress).toContainText(user.zipcode);
  await expect(billingAddress).toContainText(user.country);
  await expect(billingAddress).toContainText(user.mobile);
});