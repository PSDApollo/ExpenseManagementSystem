Feature: As a User, I want to see a graphical dashboard of expenses, So that I can analyze my expenses over the month

  Scenario: Verify if graphical dashboard is visible
    Given I open the EMS Application
    Then I can see the login page
    When I enter valid username
    And I enter valid password
    And I click on submit on login page
    Then I can see the homepage
    When I click on the graphical dashboard
    Then I am on the graphical dashboard page

  Scenario: Verify if barchart is visible
    Given I am on the graphical dashboard page
    Then I can see the barchart

  Scenario: Verify if I can see the components of dashboard
    Given I am on the graphical dashboard page
    Then I can see the title of graphical dashboard
    And I can see the total expenses
    And I can see the day with most expenses
    And I can see the back to dashboard button

  Scenario: Verify Back to dashboard button works
    Given I am on the graphical dashboard page
    When I click on back to dashboard button
    Then I can see the homepage
