Feature: View and Cart Brand Products

  Scenario: User views and switches brand product listings
    Given I am on the home page
    When I click on the Products button
    Then I should see the list of available brands
    When I select the "Polo" brand
    Then I should see products listed for brand "Polo"
    When I select the "H&M" brand
    Then I should see products listed for brand "H&M"