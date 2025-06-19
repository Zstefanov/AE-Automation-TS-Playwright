import { Page, expect } from '@playwright/test';

/**
 * Interface representing the details of a newly created user.
 */
export interface CreatedUser {
  name: string;
  email: string;
  password?: string; // Password can be optional if not always needed or handled securely elsewhere
  firstName: string;
  lastName: string;
  company: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zipcode: string;
  country: string;
  mobile: string;
}

/**
 * A helper class for common user-related actions, such as account creation.
 */
export class UserActions {
  /**
   * Navigates to the home page and performs a full user registration process.
   * A unique email and username will be generated each time this method is called.
   *
   * @param page The Playwright Page object.
   * @returns A Promise that resolves with the CreatedUser object containing the new user's details.
   */
  static async createUser(page: Page): Promise<CreatedUser> {
    // Generate a unique email and username for each registration
    const uniqueId = Date.now();
    const userEmail = `testuser${uniqueId}@mail.com`;
    const userName = `TestUser${uniqueId}`;
    const userPassword = 'Password123'; // Random hardcoded password here as these accounts are for testing purposes and are to be deleted after tests

    console.log(`Starting user creation for: ${userName} (${userEmail})`);

    // Navigate to the home page using the baseURL defined in playwright.config.ts
    await page.goto('https://automationexercise.com');

    // Handle cookie consent(optional)
    try {
      const cookieContainer = page.locator('p.fc-button-label', { hasText: 'Consent' });
      await expect(cookieContainer).toBeVisible({ timeout: 3000 });
      await cookieContainer.click({ force: true });
      console.log('Cookie consent clicked.');
    } catch (e) {
      console.log('Cookie consent not visible or already dismissed, proceeding.');
    }

    // 2. Verify home page is visible
    await expect(page.locator('img[alt="Website for automation practice"]')).toBeVisible();
    console.log('Home page verified.');

    // 3. Click on 'Signup / Login' button
    await page.locator('a[href="/login"]').click();
    console.log('Clicked Signup / Login button.');

    // 4. Verify 'New User Signup!' is visible
    await expect(page.locator('text=New User Signup!')).toBeVisible();
    console.log('New User Signup! heading verified.');

    // 5. Enter name and email address
    await page.locator('input[data-qa="signup-name"]').fill(userName);
    await page.locator('input[data-qa="signup-email"]').fill(userEmail);
    console.log(`Entered name: ${userName} and email: ${userEmail}.`);

    // 6. Click 'Signup' button
    await page.locator('button[data-qa="signup-button"]').click();
    console.log('Clicked Signup button.');

    // 7. Verify 'ENTER ACCOUNT INFORMATION' is visible
    await expect(page.locator('text=Enter Account Information')).toBeVisible();
    console.log('Enter Account Information heading verified.');

    // 8. Fill details: Title, Name, Email, Password, DOB
    await page.locator('#id_gender1').check(); // Select Mr.
    await page.locator('#password').fill(userPassword); // Use the defined password
    await page.locator('#days').selectOption('10');
    await page.locator('#months').selectOption('5'); // May
    await page.locator('#years').selectOption('1995');
    console.log('Filled account details.');

    // 9. Check newsletters and offers
    await page.locator('#newsletter').check();
    await page.locator('#optin').check();
    console.log('Checked newsletter and optin.');

    // 10. Fill personal and address details
    await page.locator('#first_name').fill('John');
    await page.locator('#last_name').fill('Doe');
    await page.locator('#company').fill('ACME Corp');
    await page.locator('#address1').fill('123 Elm Street');
    await page.locator('#address2').fill('Apt 456');
    await page.locator('#country').selectOption('United States');
    await page.locator('#state').fill('California');
    await page.locator('#city').fill('Los Angeles');
    await page.locator('#zipcode').fill('90001');
    await page.locator('#mobile_number').fill('1234567890');
    console.log('Filled personal and address details.');

    // 11. Click 'Create Account'
    await page.locator('button[data-qa="create-account"]').click();
    console.log('Clicked Create Account button.');

    // 12. Verify 'ACCOUNT CREATED!' is visible
    await expect(page.locator('h2[data-qa="account-created"]')).toHaveText(/account created!/i);
    console.log('ACCOUNT CREATED! message verified.');

    // 13. Click 'Continue'
    await page.getByRole('link', { name: 'Continue' }).click();
    await page.waitForLoadState('networkidle');

    // Return the created user object
    return {
      name: userName,
      email: userEmail,
      password: userPassword,
      firstName: 'John',
      lastName: 'Doe',
      company: 'ACME Corp',
      address1: '123 Elm Street',
      address2: 'Apt 456',
      city: 'Los Angeles',
      state: 'California',
      zipcode: '90001',
      country: 'United States',
      mobile: '1234567890',
      // Can add more properties here if needed
    };
  }

  /**
   * Clicks the 'Continue' button after account creation/deletion.
   * @param page The Playwright Page object.
   */
  static async clickContinue(page: Page): Promise<void> {
    await page.locator('a[data-qa="continue-button"]').click();
    console.log('Clicked Continue button.');
  }

  /**
   * Deletes the user account.
   * Assumes the user is logged in and the 'Delete Account' link is visible.
   * @param page The Playwright Page object.
   */
  static async deleteAccount(page: Page): Promise<void> {
    await page.locator('a[href="/delete_account"]').click();
    await expect(page.locator('h2:has-text("ACCOUNT DELETED!")')).toBeVisible();
    console.log('Account deleted message verified.');
    // Click continue after deletion if needed to return to home page
    await UserActions.clickContinue(page);
  }
}