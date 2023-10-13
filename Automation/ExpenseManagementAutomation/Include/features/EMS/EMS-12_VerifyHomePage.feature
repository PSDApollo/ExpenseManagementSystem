Feature: As a user, I want to have a homepage, So that I can see the list of income and expenses for the month

  Scenario: Verify if homepage is available
    Given I open the EMS Application
    Then I can see the homepage

  Scenario: Verify if basic elements are available
    Given I can see the homepage
    Then I can see the title of homepage
    And I can see the month of homepage
    And I can see the list box for expenses
    
    Scenario: Verify I can see new expense in homepage
    Given I can see the homepage
    When I click on add expense
    Then I can see add expense page
    When I enter '10' as the expense amount
    And I enter 'groceries' as the expense name
		And I enter 'For weekly grocery items' as the expense description
		And I click submit on expense page
		Then I can see the homepage
		And I can see the 'groceries' expense with '10' as amount displayed in the list