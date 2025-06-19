// Test Case 23: Verify address details in checkout page
// 1. Launch browser
// 2. Navigate to url 'http://automationexercise.com'
// 3. Verify that home page is visible successfully
// 4. Click 'Signup / Login' button
// 5. Fill all details in Signup and create account
// 6. Verify 'ACCOUNT CREATED!' and click 'Continue' button
// 7. Verify ' Logged in as username' at top
// 8. Add products to cart
// 9. Click 'Cart' button
// 10. Verify that cart page is displayed
// 11. Click Proceed To Checkout
// 12. Verify that the delivery address is same address filled at the time registration of account
// 13. Verify that the billing address is same address filled at the time registration of account
// 14. Click 'Delete Account' button
// 15. Verify 'ACCOUNT DELETED!' and click 'Continue' button


import { test, expect } from './baseTest';
import { UserActions } from '../helpers/userCreation';

test('Test Case 23: Verify address details in checkout page', async ({ page }) => {
    // 1-6. Register a new user using the helper method
    const user = await UserActions.createUser(page);

    // 7. Verify 'Logged in as username' at top
    await expect(page.locator('a').filter({ hasText: new RegExp(`Logged in as ${user.name}`, 'i') })).toBeVisible();

    // 8. Add products to cart (from the products page)
    await page.locator('a[href="/products"]').click();
    await page.locator('a:has-text("Add to cart")').first().click();

    // Wait for modal and click 'View Cart'
    const viewCartBtn = page.locator('u', { hasText: 'View Cart' });
    await expect(viewCartBtn).toBeVisible({ timeout: 5000 });
    await viewCartBtn.click();

    // 9. Click 'Cart' button (already in cart after modal)
    // 10. Verify that cart page is displayed
    await expect(page.locator('div.checkout-information, .cart_info')).toBeVisible();

    // 11. Click Proceed To Checkout
    // The selector for 'Proceed To Checkout' may need adjustment if site markup differs
    await page.locator('a:has-text("Proceed To Checkout")').click();
    
    // 12. Verify that the delivery address matches registration 
    const deliveryAddress = page.locator('ul#address_delivery');
    await expect(deliveryAddress).toContainText(user.firstName);
    await expect(deliveryAddress).toContainText(user.lastName);
    await expect(deliveryAddress).toContainText(user.company);
    await expect(deliveryAddress).toContainText(user.address1);
    await expect(deliveryAddress).toContainText(user.address2);
    await expect(deliveryAddress).toContainText(user.city);
    await expect(deliveryAddress).toContainText(user.state);
    await expect(deliveryAddress).toContainText(user.zipcode);
    await expect(deliveryAddress).toContainText(user.country);
    await expect(deliveryAddress).toContainText(user.mobile);

    // 13. Verify billing address matches registration details
    const billingAddress = page.locator('ul#address_invoice');
    await expect(billingAddress).toContainText(user.firstName);
    await expect(billingAddress).toContainText(user.lastName);
    await expect(billingAddress).toContainText(user.company);
    await expect(billingAddress).toContainText(user.address1);
    await expect(billingAddress).toContainText(user.address2);
    await expect(billingAddress).toContainText(user.city);
    await expect(billingAddress).toContainText(user.state);
    await expect(billingAddress).toContainText(user.zipcode);
    await expect(billingAddress).toContainText(user.country);
    await expect(billingAddress).toContainText(user.mobile);

    // 14. Click 'Delete Account' button
    await UserActions.deleteAccount(page);
});