// API 10: POST To Verify Login with invalid details
// API URL: https://automationexercise.com/api/verifyLogin
// Request Method: POST
// Request Parameters: email, password (invalid values)
// Response Code: 404
// Response Message: User not found!

import { test, expect } from '../baseTest';

test('API 10: POST To Verify Login with invalid details (should return code 404 in message, status 200)', async ({ request }) => {
  const invalidEmail = 'invaliduser98763@example.com';
  const invalidPassword = 'invalidpassword';

  const response = await request.post('/api/verifyLogin', {
    form: { email: invalidEmail, password: invalidPassword }
  });
  expect(response.status()).toBe(200);

  const body = await response.json();
  // The API returns { responseCode: 404, message: "User not found!" }
  expect(body).toHaveProperty('responseCode', 404);
  expect(body).toHaveProperty('message', 'User not found!');

  // Log response for debugging
  console.log('Response:', body);
});