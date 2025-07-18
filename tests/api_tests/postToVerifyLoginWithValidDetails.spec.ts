// API 7: POST To Verify Login with valid details
// API URL: https://automationexercise.com/api/verifyLogin
// Request Method: POST
// Request Parameters: email, password
// Response Code: 200
// Response Message: User exists!

import { test, expect } from '../ui_tests/baseTest';

test('API 7: POST To Verify Login with valid details', async ({ request }) => {
  // Take credentials from environment variables
  const validEmail = process.env.EMAIL!;
  const validPassword = process.env.PASSWORD!;

  const response = await request.post('/api/verifyLogin', {
    form: { email: validEmail, password: validPassword }
  });
  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body).toHaveProperty('message', 'User exists!');

  // Log response for debugging
  console.log('Response:', body);
});