Feature: Add Products to Cart

  Scenario: Add multiple products to shopping cart
    Given I am on the home page
    When I add the first product to the cart
    And I continue shopping
    And I add the second product to the cart
    And I view the cart
    Then I should see at least 2 products in the cart
    And each product should show price, quantity, and total
