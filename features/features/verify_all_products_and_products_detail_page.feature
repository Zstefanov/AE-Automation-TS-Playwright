Feature: Verify All Products and Product Detail Page

  Scenario: User verifies all products and product details
    Given I am on the home page
    When I navigate to the All Products page
    Then I should see the All Products page
    And I should see the products list
    When I view the first product details
    Then I should be on the product detail page
    And I should see product details: name, category, price, availability, condition, brand