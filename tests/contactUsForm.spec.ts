 // Test Case 6: Contact Us Form
// 1. Launch browser
// 2. Navigate to url 'http://automationexercise.com'
// 3. Verify that home page is visible successfully
// 4. Click on 'Contact Us' button
// 5. Verify 'GET IN TOUCH' is visible
// 6. Enter name, email, subject and message
// 7. Upload file
// 8. Click 'Submit' button
// 9. Click OK button
// 10. Verify success message 'Success! Your details have been submitted successfully.' is visible
// 11. Click 'Home' button and verify that landed to home page successfully


import { test, expect } from './baseTest';

test('Contact Us Form submission', async ({ page }) => {
    //1. Steps 1 through 3 are handled by baseTest 

    // 4. Click on 'Contact Us' button
    await page.click('a[href="/contact_us"]');

    // 5. Verify 'GET IN TOUCH' is visible
    await expect(page.locator('h2').filter({ hasText: 'Get In Touch' })).toBeVisible();

    // 6. Enter name, email, subject and message
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'testuser@example.com');
    await page.fill('input[name="subject"]', 'Test Subject');
    await page.fill('textarea[name="message"]', 'This is a test message.');

    // 7. Upload file
    await page.setInputFiles('input[name="upload_file"]', 'tests/test-files/sample.txt');

    // 8. Click 'Submit' button and handle dialog
    page.once('dialog', async dialog => {
        await dialog.accept();
    });
    // 9. Click OK button in the dialog
    // Implement delay to ensure dialog is handled
    await page.waitForTimeout(3000); //
    await page.click('input[name="submit"]');

    // 10. Verify success message is visible
    await expect(page.locator('div.status.alert.alert-success')).toHaveText('Success! Your details have been submitted successfully.');

    // 11. Click 'Home' button and verify landed on home page
    await page.click('a[href="/"]');
    await expect(page).toHaveURL(/automationexercise\.com\/?$/);
    await expect(page.locator('img[alt="Website for automation practice"]')).toBeVisible();
});
