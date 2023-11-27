package ems
import static com.kms.katalon.core.checkpoint.CheckpointFactory.findCheckpoint
import static com.kms.katalon.core.testcase.TestCaseFactory.findTestCase
import static com.kms.katalon.core.testdata.TestDataFactory.findTestData
import static com.kms.katalon.core.testobject.ObjectRepository.findTestObject

import com.kms.katalon.core.annotation.Keyword
import com.kms.katalon.core.checkpoint.Checkpoint
import com.kms.katalon.core.checkpoint.CheckpointFactory
import com.kms.katalon.core.mobile.keyword.MobileBuiltInKeywords as Mobile
import com.kms.katalon.core.model.FailureHandling
import com.kms.katalon.core.testcase.TestCase
import com.kms.katalon.core.testcase.TestCaseFactory
import com.kms.katalon.core.testdata.TestData
import com.kms.katalon.core.testdata.TestDataFactory
import com.kms.katalon.core.testobject.ObjectRepository
import com.kms.katalon.core.testobject.TestObject
import com.kms.katalon.core.webservice.keyword.WSBuiltInKeywords as WS
import com.kms.katalon.core.webui.keyword.WebUiBuiltInKeywords as WebUI

import internal.GlobalVariable

import org.openqa.selenium.WebElement
import org.openqa.selenium.WebDriver
import org.openqa.selenium.By

import com.kms.katalon.core.mobile.keyword.internal.MobileDriverFactory
import com.kms.katalon.core.webui.driver.DriverFactory

import com.kms.katalon.core.testobject.RequestObject
import com.kms.katalon.core.testobject.ResponseObject
import com.kms.katalon.core.testobject.ConditionType
import com.kms.katalon.core.testobject.TestObjectProperty

import com.kms.katalon.core.mobile.helper.MobileElementCommonHelper
import com.kms.katalon.core.util.KeywordUtil

import com.kms.katalon.core.webui.exception.WebElementNotFoundException

import cucumber.api.java.en.And
import cucumber.api.java.en.Given
import cucumber.api.java.en.Then
import cucumber.api.java.en.When

class Homepage {
	@Given("I open the EMS Application")
	public void i_open_the_EMS_Application() {
		WebUI.openBrowser(GlobalVariable.url)
	}

	@Then("I can see the homepage")
	public void i_can_see_the_homepage() {
		assert WebUI.getWindowTitle() == "Homepage"
	}

	@Then("I can see the title of homepage")
	public void i_can_see_the_title_of_homepage() {
		WebUI.verifyElementVisible(findTestObject('Object Repository/EMS/HomePage/label_title'))
	}

	@Then("I can see the month of homepage")
	public void i_can_see_the_month_of_homepage() {
		WebUI.verifyElementVisible(findTestObject('Object Repository/EMS/HomePage/label_month'))
	}

	@Then("I can see the list box for expenses")
	public void i_can_see_the_list_box_for_expenses() {
		WebUI.verifyElementVisible(findTestObject('Object Repository/EMS/HomePage/table_expenses'))
	}

	@When("I click on add expense")
	public void i_click_on_add_expense() {
		WebUI.click(findTestObject('Object Repository/EMS/HomePage/button_addExpense'))
	}

	@Then("I can see add expense page")
	public void i_can_see_add_expense_page() {
		assert WebUI.getWindowTitle() == "Add Expense"
	}

	@When("I enter {string} as the expense amount")
	public void i_enter_as_the_expense_amount(String string) {
		WebUI.sendKeys(findTestObject('Object Repository/EMS/ExpensePage/field_amount'), string)
	}

	@When("I enter {string} as the expense name")
	public void i_enter_as_the_expense_name(String string) {
		WebUI.sendKeys(findTestObject('Object Repository/EMS/ExpensePage/field_name'), string)
	}

	@When("I enter {string} as the expense description")
	public void i_enter_as_the_expense_description(String string) {
		WebUI.sendKeys(findTestObject('Object Repository/EMS/ExpensePage/field_description'), string)
	}

	@When("I click submit on expense page")
	public void i_click_submit_on_expense_page() {
		WebUI.click(findTestObject('Object Repository/EMS/ExpensePage/button_submit'))
	}

	@Then("I can see the {string} expense with {string} as amount displayed in the list")
	public void i_can_see_the_expense_with_as_amount_displayed_in_the_list(String name, String amount) {
		WebUI.verifyElementVisible(findTestObject('Object Repository/EMS/HomePage/table_item_expense', ['name' : name, 'amount' : amount]))
	}
}