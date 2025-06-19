import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';


//updated view cartt for test verify_subscription_in_cart_page
When('I view the subscription cart page', async function (this: CustomWorld) {
  const cartButton = this.page.locator('a[href="/view_cart"]');
  await cartButton.first().click();
});
