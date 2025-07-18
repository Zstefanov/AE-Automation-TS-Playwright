// API 1: Get All Products List
// API URL: https://automationexercise.com/api/productsList
// Request Method: GET
// Response Code: 200
// Response JSON: All products list


import { test, expect } from '../ui_tests/baseTest';

test('API 1: Get All Products List', async ({ request }) => {
  const response = await request.get('/api/productsList');
  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body).toHaveProperty('products');
  expect(Array.isArray(body.products)).toBe(true);

  // Log all products
  console.log('Products List:', body.products);
});