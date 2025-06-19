// API 11: POST To Create/Register User Account
// API URL: https://automationexercise.com/api/createAccount
// Request Method: POST
// Request Parameters: name, email, password, title (for example: Mr, Mrs, Miss), birth_date, birth_month, birth_year, firstname, lastname, company, address1, address2, country, zipcode, state, city, mobile_number
// Response Code: 201
// Response Message: User created!

import { test, expect, request } from '@playwright/test';

test('API 11: POST To Create/Register User Account', async ({ request }) => {
  // Generate a unique email to avoid duplication error
  const unique = Date.now();
  const uniqueEmail = `testuser_${unique}@example.com`;

  // Prepare API payload
  const payload = {
    name: `TestUser${unique}`,
    email: uniqueEmail,
    password: 'Password123!',
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

  // API call
  const response = await request.post('/api/createAccount', {
    form: payload,
  });

  // Expect response code to be 200
  expect(response.status()).toBe(200);
  
// Expect response body to contain responseCode 201 and message 'User created!'
  const body = await response.json();
  expect(body).toHaveProperty('responseCode', 201);
  expect(body).toHaveProperty('message', 'User created!');

  if (response.body === null) {
    console.error('Response body is null');
  }

  // Log for debugging
  console.log('Status:', response.status());
  console.log('Response:', body);
  console.log('DEBUG JORO');
});