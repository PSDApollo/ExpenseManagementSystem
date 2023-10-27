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



class LoginPage {
		@Then("I can see the login page")
	public void i_can_see_the_login_page() {
		assert WebUI.getWindowTitle() == "Log In"
	}

	@Then("I can see the title of login page")
	public void i_can_see_the_title_of_login_page() {
		WebUI.verifyElementVisible(findTestObject('Object Repository/EMS/loginPage/title'))
	}

	@Then("I can see user name field")
	public void i_can_see_user_name_field() {
		WebUI.verifyElementVisible(findTestObject('Object Repository/EMS/loginPage/userName'))
	}

	@Then("I can see password field")
	public void i_can_see_password_field() {
		WebUI.verifyElementVisible(findTestObject('Object Repository/EMS/loginPage/password'))
	}

	@Then("I can see the submit button on login page")
	public void i_can_see_the_submit_button_on_login_page() {
		WebUI.verifyElementVisible(findTestObject('Object Repository/EMS/loginPage/signIn'))
	}

	@When("I enter {string} as the passsword")
	public void i_enter_as_the_passsword(String string) {
		WebUI.sendKeys(findTestObject('Object Repository/EMS/ExpensePage/field_amount'), string)
	}

	@When("I click on submit on login page")
	public void i_click_on_submit_on_login_page() {
		WebUI.verifyElementVisible(findTestObject('Object Repository/EMS/HomePage/label_title'))
	}

	@Then("I can see the invalid password message")
	public void i_can_see_the_invalid_password_message() {
		WebUI.verifyElementVisible(findTestObject('Object Repository/EMS/HomePage/label_title'))
	}

	@When("I enter valid username")
	public void i_enter_valid_username() {
		WebUI.sendKeys(findTestObject('Object Repository/EMS/ExpensePage/field_amount'), GlobalVariable.userName)
	}

	@When("I enter valid password")
	public void i_enter_valid_password() {
		WebUI.sendKeys(findTestObject('Object Repository/EMS/loginPage/password'), GlobalVariable.password)
	}

	@Then("I can see Create an account button")
	public void i_can_see_Create_an_account_button() {
		WebUI.verifyElementVisible(findTestObject('Object Repository/EMS/loginPage/signup'))
	}

	@When("I click on Create an account button")
	public void i_click_on_button(String string) {
		WebUI.click(findTestObject('Object Repository/EMS/HomePage/button_addExpense'))
	}
}