import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';

When('I attempt to register with an existing email', async function (this: CustomWorld) {
  const existingEmail = process.env.EMAIL!;
  const name = 'TestUser';

  await this.page.fill('input[data-qa="signup-name"]', name);
  await this.page.fill('input[data-qa="signup-email"]', existingEmail);
  await this.page.click('button[data-qa="signup-button"]');
});

Then('I should see an error message that email already exists', async function (this: CustomWorld) {
  const errorMessage = this.page.locator('p', { hasText: 'Email Address already exist!' });
  await expect(errorMessage).toBeVisible();
});