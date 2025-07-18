// API 2: POST To All Products List
// API URL: https://automationexercise.com/api/productsList
// Request Method: POST
// Response Code: 405
// Response Message: This request method is not supported.

import { test, expect } from '../ui_tests/baseTest';

test('API 2: POST To All Products List (should return code 405 in message, status 200)', async ({ request }) => {
  const response = await request.post('/api/productsList');
  // Response is 200 but the body contains a message that the method is not supported
  expect(response.status()).toBe(200);

  const body = await response.json();
  // The API returns { responseCode: 405, message: "This request method is not supported." }
  expect(body).toHaveProperty('responseCode', 405);
  expect(body).toHaveProperty('message', 'This request method is not supported.');

  // Log response body for debugging
  console.log('Response:', body);
});