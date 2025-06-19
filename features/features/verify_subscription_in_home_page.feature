Feature: Verify Subscription in Home Page

  Scenario: User subscribes from the home page successfully
    Given I am on the home page
    When I scroll to the bottom of the page
    Then I should see the recommended "Subscription" section
    When I enter a random email and click subscribe
    Then I should see a subscription success message