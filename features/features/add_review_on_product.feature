Feature: Add Review on Product

  Scenario: User can add a review to a product
    Given I am on the home page
    When I navigate to the products page
    Then I should see the All Products page
    When I view the first product details
    Then I should see the review "Write Your Review" section
    When I submit a review with name "Playwright Tester", email "tester@example.com", and text "This is an automated test review."
    Then I should see a success message "Thank you for your review."