Feature: Verify Scroll Up without Arrow button and Scroll Down functionality

  Scenario: User scrolls down and then scrolls up manually without using arrow button
    Given I am on the home page
    When I scroll to the bottom of the page
    Then I should see the recommended "Subscription" section
    When I scroll to the top of the page
    Then I should see the text "Full-Fledged practice website for Automation Engineers"