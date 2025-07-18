// API 9: DELETE To Verify Login
// API URL: https://automationexercise.com/api/verifyLogin
// Request Method: DELETE
// Response Code: 405
// Response Message: This request method is not supported.

import { test, expect } from '../ui_tests/baseTest';

test('API 9: DELETE To Verify Login (should return code 405 in message, status 200)', async ({ request }) => {
  const response = await request.delete('/api/verifyLogin');
  expect(response.status()).toBe(200);

  const body = await response.json();
  // The API returns { responseCode: 405, message: "This request method is not supported." }
  expect(body).toHaveProperty('responseCode', 405);
  expect(body).toHaveProperty('message', 'This request method is not supported.');

  // Log response body for debugging
  console.log('Response:', body);
});