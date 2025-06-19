import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';

When('I enter valid credentials', async function (this: CustomWorld) {
    const email = process.env.EMAIL!;
    const password = process.env.PASSWORD!;
    if (!email || !password) {
  throw new Error('EMAIL and PASSWORD env variables must be set');
}
    await this.page.fill('input[data-qa="login-email"]', email);
    await this.page.fill('input[data-qa="login-password"]', password);
});

Then('I should see the user logged in', async function (this: CustomWorld) {
    await expect(this.page.locator('a').filter({ hasText: 'Logged in as' })).toBeVisible();
});

When('I click the logout button', async function (this: CustomWorld) {
    await this.page.click('a[href="/logout"]');
});

Then('I should be navigated to the login page', async function (this: CustomWorld) {
    await expect(this.page).toHaveURL(/.*\/login/);
    await expect(this.page.locator('h2').filter({ hasText: 'Login to your account' })).toBeVisible();
});