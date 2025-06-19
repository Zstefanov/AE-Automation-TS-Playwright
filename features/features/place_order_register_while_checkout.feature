Feature: Place Order - Register while Checkout

  Scenario: User registers while placing an order at checkout
    Given I am on the home page
    When I add multiple products to the cart
    And I view the cart
    Then I should see the cart page
    When I proceed to checkout
    And I choose to register during checkout
    And I register a new user
    Then I should see that I am logged in
    When I view the cart again
    And I proceed to checkout again
    Then I should see address details and review order
    When I enter a comment and place the order
    And I enter valid payment details
    And I confirm the order
    Then I should see that the order was placed successfully
    When I delete the user account I should see that the account was deleted successfully