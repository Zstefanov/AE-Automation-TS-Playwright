Feature: Search Products and Verify Cart After Login

  Scenario: Search product and verify cart persistence after login
    When I navigate to the "Products" page
    Then I should be on the "Products" page
    When I search for the product "Men Tshirt"
    Then I should see the "Searched Products" section
    And I should see at least one product displayed
    When I add searched product with id "2" to the cart
    And I view the cart
    Then I should see the product "Men Tshirt" in the cart
    When I login with valid credentials
    And I navigate to the cart page
    Then I should still see the product "Men Tshirt" in the cart