Feature: Verify Subscription in Cart page

  Scenario: User subscribes from the cart page successfully
    Given I am on the home page
    When I view the subscription cart page
    Then I should see the recommended "Subscription" section
    When I enter a random email and click subscribe
    Then I should see a subscription success message