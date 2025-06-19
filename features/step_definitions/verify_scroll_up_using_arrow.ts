import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';

When('I click the scroll up arrow button', async function (this: CustomWorld) {
  const scrollUpButton = this.page.locator('#scrollUp, .fa-angle-up, [href="#top"], [onclick*="scrollUp"]');

  // Wait for scroll-up button to appear
  await scrollUpButton.first().waitFor({ state: 'visible', timeout: 8000 });

  // Ensure it's interactable
  await scrollUpButton.first().click({ force: true });
});
