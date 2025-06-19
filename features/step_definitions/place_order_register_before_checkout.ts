import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';
import { UserActions } from '../../helpers/userCreation';


Given('I open the browser', async function (this: CustomWorld) {
  await this.openBrowser();
});

When('I delete the user account I should see that the account was deleted', async function (this: CustomWorld) {
  await UserActions.deleteAccount(this.page);
});