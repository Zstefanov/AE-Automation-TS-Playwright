Feature: Place Order - Register before Checkout

  Scenario: User places an order after registering during checkout
    Given I am on the home page
    When I navigate to the login page
    And I register a new user
    Then I should see that I am logged in
    When I add multiple products to the cart
    And I view the cart
    Then I should see the cart page
    When I proceed to checkout
    Then I should see address details and review order
    When I enter a comment and place the order
    And I enter valid payment details
    And I confirm the order
    Then I should see that the order was placed successfully
    When I delete the user account I should see that the account was deleted
