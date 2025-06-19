Feature: Download Invoice After Purchase Order

  Scenario: Successful invoice download after placing an order
    Given I am on the home page
    When I add a product to the cart
    And I proceed to checkout with possible login
    And I register a new user
    Then I should be logged in as the new user
    When I navigate to cart page
    And I proceed to checkout again
    Then I should see address details and review order
    When I enter order comment and place the order
    And I enter payment details
    And I confirm the payment
    Then I should see order confirmation message "Congratulations! Your order has been confirmed!"
    When I download the invoice
    Then The invoice file should be downloaded
    When I continue after order
    And I delete the account