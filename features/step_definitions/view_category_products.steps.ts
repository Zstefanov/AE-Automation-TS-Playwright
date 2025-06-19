import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';

// Verify categories are visible on left sidebar
Then('I should see the list of available categories', async function (this: CustomWorld) {
  await expect(this.page.locator('.left-sidebar .panel-group')).toBeVisible();
});

// Expand a parent category
When('I expand the {string} category', async function (this: CustomWorld, category: string) {
  await this.page.locator(`a[href="#${category}"]`).click();
});

// Select a subcategory under a parent category
When('I select the {string} subcategory under {string}', async function (this: CustomWorld, subcategory: string, parentCategory: string) {
  await this.page.locator(`#${parentCategory}`).locator('a', { hasText: subcategory }).click();
});

// Verify category product listing
Then('I should see products listed for category {string}', async function (this: CustomWorld, categoryText: string) {
  const titleLocator = this.page.locator('h2.title.text-center');
  await expect(titleLocator).toHaveText(new RegExp(categoryText, 'i'));
});