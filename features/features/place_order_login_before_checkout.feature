Feature: Place Order with Login before Checkout


    Scenario: Place order after login before checkout
        Given I am on the home page
        When I log in with valid credentials
        And I add products to the cart
        And I go to the cart page
        Then I should see the cart page displayed
        When I proceed to checkout
        Then I should see address details and order review
        When I enter order comments and place the order
        And I enter valid payment details and confirm order
        Then I should see order confirmation message
        When I delete the user account I should see the user account deleted message
        