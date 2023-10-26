Feature: As a User, I want to login, So that I can access the expenses based on my account

  Scenario: Verify if login page is visible
    Given I open the EMS Application
    Then I can see the login page
    And I can see the title of login page

  Scenario: Verify fields in login page
    Given I can see the login page
    Then I can see user name field
    And I can see password field
    And I can see the submit button on login page
    And I can see Create an account button

  Scenario: Verify invalid password message
    Given I can see the login page
    When I enter "abcd" as the passsword
    And I click on submit on login page
    Then I can see the invalid password message
    
    Scenario: Verify valid login
    Given I can see the login page
    When I enter valid username
    And I enter valid password
    And I click on submit on login page
    Then I can see the homepage
