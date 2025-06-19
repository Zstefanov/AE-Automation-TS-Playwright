import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';
import { UserActions } from '../../helpers/userCreation';

// All user data will be stored inside CustomWorld now

When('I choose to register during checkout', async function (this: CustomWorld) {
  await this.page.locator('u', { hasText: 'Register / Login' }).click();
});

When('I view the cart again', async function (this: CustomWorld) {
  await this.page.click('a[href="/view_cart"]');
});

When('I delete the user account I should see that the account was deleted successfully', async function (this: CustomWorld) {
  await UserActions.deleteAccount(this.page);
});
