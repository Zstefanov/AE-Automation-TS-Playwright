import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';

When(
  'I have scrolled to the bottom of the home page',
  async function (this: CustomWorld) {
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  }
);

Then(
  'I confirm the {string} section is displayed',
  async function (this: CustomWorld, sectionName: string) {
    const section = this.page.locator(`h2.title.text-center`, { hasText: new RegExp(sectionName, 'i') });
    await expect(section).toBeVisible({ timeout: 10000 });
  }
);

When(
  'I add the first product from the recommended items to the cart',
  { timeout: 20000 },
  async function (this: CustomWorld) {
    const recommendedTitle = this.page.locator('h2.title.text-center', { hasText: /recommended items/i });
    await recommendedTitle.waitFor({ state: 'visible', timeout: 10000 });

    // Locate the container with recommended products (following sibling after title)
    const recommendedSection = recommendedTitle.locator('xpath=following-sibling::*').first();

    // Locate the first recommended product container - update selector if necessary
    const firstProduct = recommendedSection.locator('div.product-image-wrapper').first();
    await firstProduct.waitFor({ state: 'visible', timeout: 10000 });

    // Hover the product to reveal the 'Add to cart' button (usually hidden by default)
    await firstProduct.hover();

    // Now locate the 'Add to cart' button inside that product container
    const addToCartBtn = firstProduct.locator('a', { hasText: 'Add to cart' });
    await addToCartBtn.waitFor({ state: 'visible', timeout: 10000 });

    await addToCartBtn.click();
  }
);

When(
  'I open the cart from the confirmation modal',
  async function (this: CustomWorld) {
    const viewCartBtn = this.page.locator('u', { hasText: 'View Cart' });
    await viewCartBtn.waitFor({ state: 'visible', timeout: 10000 });
    await viewCartBtn.click();
  }
);

Then(
  'the recommended product should appear in the cart page',
  async function (this: CustomWorld) {
    const cartProductRow = this.page.locator('tr[id^="product-"]');
    await expect(cartProductRow.first()).toBeVisible({ timeout: 10000 });
  }
);