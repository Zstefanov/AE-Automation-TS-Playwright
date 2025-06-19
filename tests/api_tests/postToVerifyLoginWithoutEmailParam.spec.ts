// API 8: POST To Verify Login without email parameter
// API URL: https://automationexercise.com/api/verifyLogin
// Request Method: POST
// Request Parameter: password
// Response Code: 400
// Response Message: Bad request, email or password parameter is missing in POST request.

import { test, expect } from '../baseTest';

test('API 8: POST To Verify Login without email parameter (should return code 400 in message, status 200)', async ({ request }) => {
  const response = await request.post('/api/verifyLogin', {
    form: { password: 'somepassword' }
  });
  expect(response.status()).toBe(200);

  const body = await response.json();
  // The API returns { responseCode: 400, message: "Bad request, email or password parameter is missing in POST request." }
  expect(body).toHaveProperty('responseCode', 400);
  expect(body).toHaveProperty('message', 'Bad request, email or password parameter is missing in POST request.');

  // Log response body for debugging
  console.log('Response:', body);
});