// <!-- API 13: PUT METHOD To Update User Account
// API URL: https://automationexercise.com/api/updateAccount
// Request Method: PUT
// Request Parameters: name, email, password, title (for example: Mr, Mrs, Miss), birth_date, birth_month, birth_year, firstname, lastname, company, address1, address2, country, zipcode, state, city, mobile_number
// Response Code: 200
// Response Message: User updated! -->


import { test, expect } from '@playwright/test';

test('API 13: PUT METHOD To Update User Account (unique email, should not fail)', async ({ request }) => {
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

  // ----- 2. Update the user account using the PUT method -----
  const updatedPayload = {
    ...createPayload,
    name: `UpdatedUser${unique}`,
    firstname: 'Jane',
    lastname: 'Smith',
    company: 'UpdatedCompany',
    city: 'San Francisco',
    mobile_number: '9876543210'
  };

  const updateResponse = await request.put('https://automationexercise.com/api/updateAccount', {
    form: updatedPayload,
  });

  expect(updateResponse.status()).toBe(200);
  const updateBody = await updateResponse.json();
  expect(updateBody).toHaveProperty('message', 'User updated!');

  // Log for debugging
  console.log('Update Status:', updateResponse.status());
  console.log('Update Response:', updateBody);
});