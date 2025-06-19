// API 6: POST To Search Product without search_product parameter
// API URL: https://automationexercise.com/api/searchProduct
// Request Method: POST
// Response Code: 400
// Response Message: Bad request, search_product parameter is missing in POST request.

import { test, expect } from '../baseTest';

test('API 6: POST To Search Product without search_product parameter (should return code 400 in message, status 200)', async ({ request }) => {
  const response = await request.post('/api/searchProduct');
  expect(response.status()).toBe(200);

  const body = await response.json();
  // The API returns { responseCode: 400, message: "Bad request, search_product parameter is missing in POST request." }
  expect(body).toHaveProperty('responseCode', 400);
  expect(body).toHaveProperty('message', 'Bad request, search_product parameter is missing in POST request.');

  // Log response body for debugging
  console.log('Response:', body);
});