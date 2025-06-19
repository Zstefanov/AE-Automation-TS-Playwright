Feature: Login User and Delete Account

  Scenario: Login User with correct email and password and delete the account
    Given a new user account is created
    And the user logs out
    When the user navigates to the Login page
    And the user logs in with correct credentials
    Then the user should see "Logged in as username"
    When I delete the user account I should see the user account deleted message