Feature: Search Product

  Scenario: Search for a product
    When I navigate to the "Products" page
    Then I should be on the "Products" page
    When I search for the product "Dress"
    Then I should see the "Searched Products" section
    And I should see at least one product displayed