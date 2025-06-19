Feature: View Category Products

  Scenario: User views products by categories and subcategories
    Given I am on the home page
    Then I should see the list of available categories
    When I expand the "Women" category
    And I select the "Dress" subcategory under "Women"
    Then I should see products listed for category "WOMEN - DRESS PRODUCTS"
    When I expand the "Men" category
    And I select the "Tshirts" subcategory under "Men"
    Then I should see products listed for category "MEN - TSHIRTS PRODUCTS"