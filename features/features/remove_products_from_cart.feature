Feature: Remove Products From Cart

  Scenario: Remove a product from the cart
    Given I am on the home page
    When I add multiple products to the cart
    And I view the cart
    Then I should see the cart page
    When I remove a product from the cart
    Then the product should no longer be visible in the cart