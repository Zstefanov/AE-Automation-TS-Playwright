import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';


When('I scroll to the top of the page', async function (this: CustomWorld) {
  await this.page.evaluate(() => window.scrollTo(0, 0));
});

// Reuse: subscription section is already covered by CommonSteps:
// Then I should see the recommended "{string}" section

