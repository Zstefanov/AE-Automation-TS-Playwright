// API 14: GET user account detail by email
// API URL: https://automationexercise.com/api/getUserDetailByEmail
// Request Method: GET
// Request Parameters: email
// Response Code: 200
// Response JSON: User Detail

import { test, expect } from '@playwright/test';

test('API 14: GET user account detail by email (should return user details for a valid email)', async ({ request }) => {
  // 1. Create a unique user account via API
  const unique = Date.now();
  const uniqueEmail = `testuser_${unique}@example.com`;
  const password = 'Password123!';

  const createPayload = {
    name: `TestUser${unique}`,
    email: uniqueEmail,
    password: password,
    title: 'Mr',
    birth_date: '1',
    birth_month: 'January',
    birth_year: '1990',
    firstname: 'John',
    lastname: 'Doe',
    company: 'TestCompany',
    address1: '123 Main St',
    address2: 'Suite 101',
    country: 'United States',
    zipcode: '12345',
    state: 'CA',
    city: 'Los Angeles',
    mobile_number: '1234567890'
  };
 
  const response = await request.post('/api/createAccount', {
    form: createPayload,
  });
    // Expect response code to be 200
  expect(response.status()).toBe(200);
  
// Expect response body to contain responseCode 201 and message 'User created!'
  const body = await response.json();
  expect(body).toHaveProperty('responseCode', 201);
  expect(body).toHaveProperty('message', 'User created!');

  // 2. Get user details by email 
  const getResponse = await request.get(
    `/api/getUserDetailByEmail?email=${encodeURIComponent(uniqueEmail)}`
  );
  expect(getResponse.status()).toBe(200);

  const userDetail = await getResponse.json();
  
  // Log for debugging
  console.log('User Detail:', userDetail);
});