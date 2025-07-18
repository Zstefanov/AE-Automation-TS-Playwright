// API 3: Get All Brands List
// API URL: https://automationexercise.com/api/brandsList
// Request Method: GET
// Response Code: 200
// Response JSON: All brands list

import { test, expect } from '../ui_tests/baseTest';

test('API 3: Get All Brands List', async ({ request }) => {
  const response = await request.get('/api/brandsList');
  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body).toHaveProperty('brands');
  expect(Array.isArray(body.brands)).toBe(true);

  // Log all brands
  console.log('Brands List:', body.brands);
});