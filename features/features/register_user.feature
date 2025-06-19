Feature: Register User

  Scenario: Successful registration and account deletion
    Given I am on the home page
    When I navigate to the login page
    And I register a new user
    Then I should see that I am logged in
    When I delete the user account I should see that the account was deleted
