import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';

When('I enter invalid credentials', async function (this: CustomWorld) {
    await this.page.fill('input[data-qa="login-email"]', 'wrongemail@example.com');
    await this.page.fill('input[data-qa="login-password"]', 'wrongpassword');
});

Then('I should see the error message {string}', async function (this: CustomWorld, expectedMessage: string) {
    const errorLocator = this.page.locator('p', { hasText: expectedMessage });
    await expect(errorLocator).toBeVisible();
});