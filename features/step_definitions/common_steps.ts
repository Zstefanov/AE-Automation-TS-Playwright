import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';
import { UserActions } from '../../helpers/userCreation';

// SHARED: Home page navigation
Given('I am on the home page', async function (this: CustomWorld) {
  await this.page.goto('https://automationexercise.com');
});

// SHARED: Section header is visible
Then('I should see the recommended {string} section', async function (this: CustomWorld, sectionName: string) {
  const section = this.page.locator(`text=${sectionName}`);
  await expect(section).toBeVisible({ timeout: 10000 });
});

Then('I should see that I am logged in', async function (this: CustomWorld) {
  await expect(this.page.locator('a', { hasText: `Logged in as ${this.createdUser?.name}` })).toBeVisible();
});

When('I enter a comment and place the order', async function (this: CustomWorld) {
  await this.page.locator('textarea[name="message"]').fill('Test order for automation.');
  await this.page.click('a[href="/payment"]');
});

When('I enter valid payment details', async function (this: CustomWorld) {
  await this.page.locator('input[name="name_on_card"]').fill('John Doe');
  await this.page.locator('input[name="card_number"]').fill('4111111111111111');
  await this.page.locator('input[name="cvc"]').fill('123');
  await this.page.locator('input[name="expiry_month"]').fill('12');
  await this.page.locator('input[name="expiry_year"]').fill('2028');
});

When('I confirm the order', async function (this: CustomWorld) {
  await this.page.click('button#submit');
});

// Reuse: scroll to bottom step already created for previous test
When('I scroll to the bottom of the page', async function (this: CustomWorld) {
  await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
});

Then('I should see the text {string}', async function (this: CustomWorld, text: string) {
  await expect(this.page.locator(`h2:has-text("${text}")`).first()).toBeVisible();
});

// Verify product detail page loaded
Then('I should be on the product detail page', async function (this: CustomWorld) {
    await expect(this.page).toHaveURL(/\/product_details\/\d+/);
});


Then('I should see that the order was placed successfully', async function (this: CustomWorld) {
  const confirmationMessage = this.page.locator('p', { hasText: 'Congratulations! Your order has been confirmed!' });
  await expect(confirmationMessage).toBeVisible();
});

When('I proceed to checkout again', async function (this: CustomWorld) {
  await this.page.locator('a:has-text("Proceed To Checkout")').click();
});

When('I navigate to the login page', async function (this: CustomWorld) {
    await this.page.click('a[href="/login"]');
    await expect(this.page.locator('h2', { hasText: 'Login to your account' })).toBeVisible();
});

When('I click the login button', async function (this: CustomWorld) {
    await this.page.click('button[data-qa="login-button"]');
});

When('I view the cart', async function (this: CustomWorld) {
  await this.page.locator('u', { hasText: 'View Cart' }).click();
});

When('I view the first product details', async function (this: CustomWorld) {
  await this.page.locator("a[href^='/product_details/']:has-text('View Product')").first().click();
});

When('I enter a random email and click subscribe', async function (this: CustomWorld) {
  const email = `testuser+${Date.now()}@example.com`;
  await this.page.fill('input#susbscribe_email', email);
  await this.page.click('button#subscribe');
});

Then('I should see a subscription success message', async function (this: CustomWorld) {
  await expect(this.page.locator('.alert-success')).toHaveText('You have been successfully subscribed!');
});

Then('I should see the All Products page', async function (this: CustomWorld) {
  const allProductsTitle = this.page.locator('h2.title.text-center');
  await expect(allProductsTitle).toBeVisible({ timeout: 10000 });
  await expect(allProductsTitle).toHaveText(/All Products/i);
});

When('I add multiple products to the cart', async function (this: CustomWorld) {
  await this.page.click('a[href="/products"]');
  await this.page.click('a[data-product-id="1"].add-to-cart');
  await this.page.locator('button[data-dismiss="modal"]').click();
  await this.page.click('a[data-product-id="2"].add-to-cart');
});

Then('I should see the cart page', async function (this: CustomWorld) {
  await expect(this.page.locator('li.active', { hasText: 'Shopping Cart' })).toBeVisible();
});

Then('I should see address details and review order', async function (this: CustomWorld) {
  await expect(this.page.locator('ul#address_delivery')).toBeVisible();
  await expect(this.page.locator('ul#address_invoice')).toBeVisible();
  await expect(this.page.locator('.checkout-information')).toBeVisible();
});

When('I register a new user', { timeout: 60000 }, async function () {
  this.createdUser = await UserActions.createUser(this.page);
});

When('I proceed to checkout', async function () {
    await this.page.click('a.btn.btn-default.check_out:has-text("Proceed To Checkout")');
});

