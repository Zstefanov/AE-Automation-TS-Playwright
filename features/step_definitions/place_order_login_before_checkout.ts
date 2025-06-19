import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { UserActions } from '../../helpers/userCreation'; // adjust path as needed
import { CustomWorld } from '../support/world'; // your world/context type
 
let createdUser: { name: string, email: string, password: string } = { name: '', email: '', password: '' };

When('I log in with valid credentials', {timeout:20000}, async function (this: CustomWorld) {
    // Create user first (for test isolation)
    const user = await UserActions.createUser(this.page);
      createdUser = {
        name: user.name,
        email: user.email,
        password: user.password || 'Password123',
      };

    // Logout to test login flow
    await this.page.click('a[href="/logout"]');
    await expect(this.page).toHaveURL(/\/login/);

    // Fill login form and submit
    await this.page.fill('input[data-qa="login-email"]', createdUser.email);
    await this.page.fill('input[data-qa="login-password"]', createdUser.password!);
    await this.page.click('button[data-qa="login-button"]');

    // Verify login
    await expect(this.page.locator('a', { hasText: `Logged in as ${createdUser.name}` })).toBeVisible();
});

When('I add products to the cart', async function () {
    await this.page.click('a[href="/products"]');
    await this.page.click('a[data-product-id="1"].add-to-cart');
    await this.page.click('button[data-dismiss="modal"]');
    await this.page.click('a[data-product-id="2"].add-to-cart');
});

When('I go to the cart page', async function () {
    await this.page.click('u:has-text("View Cart")');
});

Then('I should see the cart page displayed', async function () {
    await expect(this.page.locator('li.active', { hasText: 'Shopping Cart' })).toBeVisible();
});

Then('I should see address details and order review', async function () {
    await expect(this.page.locator('h2', { hasText: 'Address Details' })).toBeVisible();
    await expect(this.page.locator('h2', { hasText: 'Review Your Order' })).toBeVisible();
});

When('I enter order comments and place the order', async function () {
    await this.page.fill('textarea[name="message"]', 'Test order for automation.');
    await this.page.click('a[href="/payment"]');
});

When('I enter valid payment details and confirm order', async function () {
    await this.page.fill('input[name="name_on_card"]', 'John Doe');
    await this.page.fill('input[name="card_number"]', '4111111111111111');
    await this.page.fill('input[name="cvc"]', '123');
    await this.page.fill('input[name="expiry_month"]', '12');
    await this.page.fill('input[name="expiry_year"]', '2028');
    await this.page.click('button#submit');
});

Then('I should see order confirmation message', async function () {
    const message = this.page.locator('p', { hasText: 'Congratulations! Your order has been confirmed!' });
    await expect(message).toBeVisible();
});

//this delete fuction and checks for the delete messasge to be shown
When('I delete the user account I should see the user account deleted message', async function () {
    await UserActions.deleteAccount(this.page);
});

