// Test Case 14: Place Order: Register while Checkout
// 1. Launch browser
// 2. Navigate to url 'http://automationexercise.com'
// 3. Verify that home page is visible successfully
// 4. Add products to cart
// 5. Click 'Cart' button
// 6. Verify that cart page is displayed
// 7. Click Proceed To Checkout
// 8. Click 'Register / Login' button
// 9. Fill all details in Signup and create account
// 10. Verify 'ACCOUNT CREATED!' and click 'Continue' button
// 11. Verify ' Logged in as username' at top
// 12.Click 'Cart' button
// 13. Click 'Proceed To Checkout' button
// 14. Verify Address Details and Review Your Order
// 15. Enter description in comment text area and click 'Place Order'
// 16. Enter payment details: Name on Card, Card Number, CVC, Expiration date
// 17. Click 'Pay and Confirm Order' button
// 18. Verify success message 'Your order has been placed successfully!'
// 19. Click 'Delete Account' button
// 20. Verify 'ACCOUNT DELETED!' and click 'Continue' button

import { test, expect } from './baseTest';
import { UserActions } from '../../helpers/userCreation';

test('Test Case 14: Place Order: Register while Checkout', async ({ page }) => {
    // 1. Steps 1 through 3 are handled by baseTest

    // 4. Add products to cart
    await page.click('a[href="/products"]');
    await page.click('a[data-product-id="1"].add-to-cart');
    await page.locator('button[data-dismiss="modal"]').click();
    await page.click('a[data-product-id="2"].add-to-cart');
    await page.locator('u', { hasText: 'View Cart' }).click();

    // 6. Verify that cart page is displayed
    await expect(page.locator('li.active', { hasText: 'Shopping Cart' })).toBeVisible();

    // 7. Click Proceed To Checkout
    await page.locator('a.btn.btn-default.check_out', { hasText: 'Proceed To Checkout' }).click();

    // 8. Click 'Register / Login' button
    await page.locator('u', { hasText: 'Register / Login' }).click();

    // 9. Fill all details in Signup and create account using helper
    const user = await UserActions.createUser(page);

    // 10. Verify 'ACCOUNT CREATED!' and click 'Continue' button
    // Done in helper

    // 11. Verify 'Logged in as username' at top
    await expect(page.locator('a').filter({ hasText: `Logged in as ${user.name}` })).toBeVisible();

    // 12. Click 'Cart' button
    await page.click('a[href="/view_cart"]');

    // 13. Click 'Proceed To Checkout' button
    await page.click('a.check_out');

    // 14. Verify Address Details and Review Your Order
    await expect(page.locator('h2').filter({ hasText: 'Address Details' })).toBeVisible();
    await expect(page.locator('h2').filter({ hasText: 'Review Your Order' })).toBeVisible();

    // 15. Enter description in comment text area and click 'Place Order'
    await page.locator('textarea[name="message"]').fill('Test order for automation.');
    await page.click('a[href="/payment"]');

    // 16. Enter payment details: Name on Card, Card Number, CVC, Expiration date
    await page.locator('input[name="name_on_card"]').fill('John Doe');
    await page.locator('input[name="card_number"]').fill('4111111111111111');
    await page.locator('input[name="cvc"]').fill('123');
    await page.locator('input[name="expiry_month"]').fill('12');
    await page.locator('input[name="expiry_year"]').fill('2028');

    // 17. Click 'Pay and Confirm Order' button
    await page.click('button#submit');

    // 18. Verify success message 'Your order has been placed successfully!'
    const confirmationMessage = page.locator('p', { hasText: 'Congratulations! Your order has been confirmed!' });
    await expect(confirmationMessage).toBeVisible();

    // 19. Click 'Delete Account' button
    await UserActions.deleteAccount(page);

    // 20. Verify 'ACCOUNT DELETED!' and click 'Continue' button
    // Done in helper method
});