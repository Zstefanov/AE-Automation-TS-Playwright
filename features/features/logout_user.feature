Feature: Logout functionality

  Scenario: Logout User
    Given I am on the home page
    When I navigate to the login page
    And I enter valid credentials
    And I click the login button
    Then I should see the user logged in
    When I click the logout button
    Then I should be navigated to the login page