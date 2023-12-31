Feature: As a user of this system,
  I want to add an expense, so that I can manage my expenses.

  Scenario: Verify if homepage is available
    Given I open the EMS Application
    Then I can see the homepage

  Scenario: Verify I can add a new expense
    Given I can see the homepage
    When I click on add expense
    Then I can see add expense page
    When I enter '10' as the expense amount
    And I enter 'groceries' as the expense name
    And I enter 'For weekly grocery items' as the expense description
    And I click submit on expense page
    Then I can see the homepage
    And I can see the 'groceries' expense with '10' as amount displayed in the list
