// Test Case 16: Place Order: Login before Checkout
// 1. Launch browser
// 2. Navigate to url 'http://automationexercise.com'
// 3. Verify that home page is visible successfully
// 4. Click 'Signup / Login' button
// 5. Fill email, password and click 'Login' button
// 6. Verify 'Logged in as username' at top
// 7. Add products to cart
// 8. Click 'Cart' button
// 9. Verify that cart page is displayed
// 10. Click Proceed To Checkout
// 11. Verify Address Details and Review Your Order
// 12. Enter description in comment text area and click 'Place Order'
// 13. Enter payment details: Name on Card, Card Number, CVC, Expiration date
// 14. Click 'Pay and Confirm Order' button
// 15. Verify success message 'Your order has been placed successfully!'
// 16. Click 'Delete Account' button
// 17. Verify 'ACCOUNT DELETED!' and click 'Continue' button

import { test, expect } from './baseTest';
import { UserActions } from '../../helpers/userCreation';

test('Test Case 16: Place Order: Login before Checkout', async ({ page }) => {
    // Steps 1 through 4 are handled by baseTest

    // 5. Fill email, password and click 'Login' button
    // For this test, we need an existing user as we will be deleting the account at the end.
    const user = await UserActions.createUser(page);

    // Logout after creation to test login flow
    await page.locator('a[href="/logout"]').click();
    await expect(page).toHaveURL(/\/login/);

    // Fill login form
    await page.locator('input[data-qa="login-email"]').fill(user.email);
    await page.locator('input[data-qa="login-password"]').fill(user.password!);
    await page.locator('button[data-qa="login-button"]').click();

    // 6. Verify 'Logged in as username' at top
    await expect(page.locator('a', { hasText: `Logged in as ${user.name}` })).toBeVisible();

    // 7. Add products to cart
    await page.click('a[href="/products"]');
    await page.click('a[data-product-id="1"].add-to-cart');
    await page.locator('button[data-dismiss="modal"]').click();
    await page.click('a[data-product-id="2"].add-to-cart');

    // 8. Click 'Cart' button
    await page.locator('u', { hasText: 'View Cart' }).click();

    // 9. Verify that cart page is displayed
    await expect(page.locator('li.active', { hasText: 'Shopping Cart' })).toBeVisible();

    // 10. Click Proceed To Checkout
    await page.locator('a.btn.btn-default.check_out', { hasText: 'Proceed To Checkout' }).click();

    // 11. Verify Address Details and Review Your Order
    await expect(page.locator('h2', { hasText: 'Address Details' })).toBeVisible();
    await expect(page.locator('h2', { hasText: 'Review Your Order' })).toBeVisible();

    // 12. Enter description in comment text area and click 'Place Order'
    await page.locator('textarea[name="message"]').fill('Test order for automation.');
    await page.click('a[href="/payment"]');

    // 13. Enter payment details: Name on Card, Card Number, CVC, Expiration date
    await page.locator('input[name="name_on_card"]').fill('John Doe');
    await page.locator('input[name="card_number"]').fill('4111111111111111');
    await page.locator('input[name="cvc"]').fill('123');
    await page.locator('input[name="expiry_month"]').fill('12');
    await page.locator('input[name="expiry_year"]').fill('2028');

    // 14. Click 'Pay and Confirm Order' button
    await page.click('button#submit');

    // 15. Verify success message 'Congratulations! Your order has been confirmed!'
    const confirmationMessage = page.locator('p', { hasText: 'Congratulations! Your order has been confirmed!' });
    await expect(confirmationMessage).toBeVisible();

    // 16. Click 'Delete Account' button
    await UserActions.deleteAccount(page);

    // 17. Verify 'ACCOUNT DELETED!' and click 'Continue' button
    // (Handled in helper)
});