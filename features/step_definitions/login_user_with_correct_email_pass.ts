import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';
import { UserActions } from '../../helpers/userCreation';

let createdUser: { name: string, email: string, password: string } = { name: '', email: '', password: '' };

// create user takes longer, hence implicit timeout
Given('a new user account is created', {timeout: 50000},  async function (this: CustomWorld) {
  const user = await UserActions.createUser(this.page);
  createdUser = {
    name: user.name,
    email: user.email,
    password: user.password || 'Password123',
  };
});

Given('the user logs out', async function (this: CustomWorld) {
  await this.page.locator('a[href="/logout"]').click();
});

When('the user navigates to the Login page', async function (this: CustomWorld) {
  await this.page.locator('a[href="/login"]').click();
});

When('the user logs in with correct credentials', async function (this: CustomWorld) {
  await this.page.locator('[data-qa="login-email"]').fill(createdUser.email);
  await this.page.locator('[data-qa="login-password"]').fill(createdUser.password);
  await this.page.locator('[data-qa="login-button"]').click();
});

Then('the user should see {string}', async function (this: CustomWorld, expectedText: string) {
  // Handle special case where username is interpolated
  const resolvedText = expectedText.replace('username', createdUser.name);
  await expect(this.page.locator(`text=${resolvedText}`)).toBeVisible();
});
