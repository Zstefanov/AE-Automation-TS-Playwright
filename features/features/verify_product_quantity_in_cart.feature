Feature: Verify Product Quantity in Cart

  Scenario: User adds product with specific quantity to cart and verifies it
    Given I am on the home page
    When I view the first product on the home page
    Then I should be on the product detail page
    When I set the product quantity to 4
    And I add the product to the cart
    And I view the cart
    Then I should see the product with quantity 4 in the cart