Feature: Verify address details in checkout page

@only
  Scenario: Verify that delivery and billing addresses match registration data
    And I register a new user
    Then I should see the user logged in
    When I navigate to the "Products" page
    And I add multiple products to the cart
    And I view the cart
    Then I should see the cart page
    When I proceed to checkout
    Then the delivery address should match registered user data
    And the billing address should match registered user data
    When I delete the user account I should see that the account was deleted successfully