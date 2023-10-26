Feature: As a User, I want to login, So that I can access the expenses based on my account

  Scenario: Verify if signup page is visible
    Given I open the EMS Application
    Then I can see the login page
    And I can see Create an account button
    When I click on "Create an account" button
    And I can see the title of sign up page

  Scenario: Verify fields in sign up page
    Given I can see the sign up page
    Then I can see user name field
    And I can see password field
    And I can see email field
    And I can see the create account button on sign up page

  Scenario: Verify invalid password message
    Given I can see the sign up page
    When I enter "abcd" as the passsword
    And I click on submit on login page
    Then I can see the invalid password message
    
    Scenario: Verify valid sign up
    Given I can see the sign up page
    When I enter valid username
    And I enter valid password
    And I enter valid email
    And I click on submit on sign up page
    Then I can see the homepage
