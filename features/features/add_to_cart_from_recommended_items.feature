Feature: Add product from Recommended Items to cart

  Scenario: User can add a recommended item to the cart
    Given I have scrolled to the bottom of the home page
    Then I confirm the "RECOMMENDED ITEMS" section is displayed
    When I add the first product from the recommended items to the cart
    And I open the cart from the confirmation modal
    Then the recommended product should appear in the cart page