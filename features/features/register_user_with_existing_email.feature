Feature: Register User with Existing Email

  Scenario: Attempt to register using already registered email
    Given I am on the home page
    When I navigate to the login page
    And I attempt to register with an existing email
    Then I should see an error message that email already exists