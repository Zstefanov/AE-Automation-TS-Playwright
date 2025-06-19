// API 12: DELETE METHOD To Delete User Account
// API URL: https://automationexercise.com/api/deleteAccount
// Request Method: DELETE
// Request Parameters: email, password
// Response Code: 200
// Response Message: Account deleted!

import { test, expect, request } from '@playwright/test';

test('API 12: DELETE METHOD To Delete User Account (unique email, should not fail)', async ({ request }) => {
  // ----- 1. Create a unique user account via API -----
  const unique = Date.now();
  const uniqueEmail = `testuser_${unique}@example.com`;
  const password = 'Password123!';

  // Prepare create account payload
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

  // Create the user account
  const response = await request.post('https://automationexercise.com/api/createAccount', {
    form: createPayload,
  });
 
   // Expect response code to be 200
  expect(response.status()).toBe(200);
  // Expect response body to contain responseCode 201 and message 'User created!'
  const body = await response.json();
  expect(body).toHaveProperty('responseCode', 201);
  expect(body).toHaveProperty('message', 'User created!');

  // ----- 2. Delete the user account using the DELETE method -----
  const deletePayload = {
    email: uniqueEmail,
    password: password
  };

  const deleteResponse = await request.delete('https://automationexercise.com/api/deleteAccount', {
    form: deletePayload,
  });

  expect(deleteResponse.status()).toBe(200);
  const deleteBody = await deleteResponse.json();
  expect(deleteBody).toHaveProperty('message', 'Account deleted!');

  // Log for debugging
  console.log('Delete Status:', deleteResponse.status());
  console.log('Delete Response:', deleteBody);
});