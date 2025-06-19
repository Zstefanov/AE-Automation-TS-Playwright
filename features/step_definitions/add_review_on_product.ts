import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';

When('I navigate to the products page', async function (this: CustomWorld) {
  await this.page.locator("a[href='/products']:has-text('Products')").click();
});

Then('I should see the review {string} section', async function (this: CustomWorld, sectionName: string) {
  const reviewSection = this.page.locator(`text=${sectionName}`);
  await expect(reviewSection).toBeVisible({ timeout: 10000 });
});

When(
  'I submit a review with name {string}, email {string}, and text {string}',
  async function (this: CustomWorld, name: string, email: string, review: string) {
    await this.page.locator('input#name').fill(name);
    await this.page.locator('input#email').fill(email);
    await this.page.locator('textarea#review').fill(review);
    await this.page.locator('button#button-review').click();
  }
);

Then('I should see a success message {string}', async function (this: CustomWorld, expectedMessage: string) {
  const reviewSuccess = this.page.locator('#review-section .alert-success', { hasText: expectedMessage }).first();

  await expect(reviewSuccess).toBeVisible({ timeout: 10000 });
  await expect(reviewSuccess).toHaveText(new RegExp(expectedMessage, 'i'), { timeout: 10000 });
});