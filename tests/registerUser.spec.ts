    // //Test Case 1: Register User
    // 1. Launch browser
    // 2. Navigate to url 'http://automationexercise.com'
    // 3. Verify that home page is visible successfully
    // 4. Click on 'Signup / Login' button
    // 5. Verify 'New User Signup!' is visible
    // 6. Enter name and email address
    // 7. Click 'Signup' button
    // 8. Verify that 'ENTER ACCOUNT INFORMATION' is visible
    // 9. Fill details: Title, Name, Email, Password, Date of birth
    // 10. Select checkbox 'Sign up for our newsletter!'
    // 11. Select checkbox 'Receive special offers from our partners!'
    // 12. Fill details: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number
    // 13. Click 'Create Account button'
    // 14. Verify that 'ACCOUNT CREATED!' is visible
    // 15. Click 'Continue' button
    // 16. Verify that 'Logged in as username' is visible
    // 17. Click 'Delete Account' button
    // 18. Verify that 'ACCOUNT DELETED!' is visible and click 'Continue' button

    import { test, expect } from '@playwright/test';
    import { UserActions } from '../helpers/userCreation';

    test('Register User Flow', async ({ page }) => {

        // 1. Create the user via the helper method(Steps 1 through 13)
        var user = await UserActions.createUser(page);

        // 14. Verify 'Logged in as username'
        await expect(page.locator(`text=Logged in as ${user.name}`)).toBeVisible();

        // 15. Delete account
        await page.locator('a[href="/delete_account"]').click();

        // 16. Verify account deleted and click Continue
        await expect(page.locator('h2[data-qa="account-deleted"]')).toHaveText(/account deleted!/i);
        await page.locator('[data-qa="continue-button"]').click();
    });