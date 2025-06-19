Feature: Login functionality

  Scenario: Login User with incorrect email and password
    Given I am on the home page
    When I navigate to the login page
    And I enter invalid credentials
    And I click the login button
    Then I should see the error message "Your email or password is incorrect!"