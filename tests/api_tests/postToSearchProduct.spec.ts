// API 5: POST To Search Product
// API URL: https://automationexercise.com/api/searchProduct
// Request Method: POST
// Request Parameter: search_product (For example: top, tshirt, jean)
// Response Code: 200
// Response JSON: Searched products list

import { test, expect } from '../ui_tests/baseTest';

test('API 5: POST To Search Product', async ({ request }) => {
  const searchTerm = 'tshirt';
  const response = await request.post('/api/searchProduct', {
    form: { search_product: searchTerm }
  });
  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body).toHaveProperty('products');
  expect(Array.isArray(body.products)).toBe(true);

  // Log searched products
  console.log(`Products found for "${searchTerm}":`, body.products);
});