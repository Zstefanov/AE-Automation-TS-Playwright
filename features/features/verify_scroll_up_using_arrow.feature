Feature: Verify Scroll Up and Scroll Down Functionality

  Scenario: User scrolls down and then scrolls up using the arrow button
    Given I am on the home page
    When I scroll to the bottom of the page
    Then I should see the recommended "Subscription" section
    When I click the scroll up arrow button
    Then I should see the text "Full-Fledged practice website for Automation Engineers"