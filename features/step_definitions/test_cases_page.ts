import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';

// New step: clicking the Test Cases button
When('I click on the Test Cases button', async function (this: CustomWorld) {
  await this.page.click('a[href="/test_cases"]');
});

// New step: verifying Test Cases page loaded
Then('I should see the Test Cases page', async function (this: CustomWorld) {
  await expect(this.page).toHaveURL(/\/test_cases/);
  await expect(this.page.locator('h2').filter({ hasText: 'Test Cases' })).toBeVisible();
});