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



class SignUpPage {
		@When("I can see the title of sign up page")
	public void i_can_see_the_title_of_sign_up_page() {
		assert WebUI.getWindowTitle() == "Sign Up"
	}

	@Given("I can see the sign up page")
	public void i_can_see_the_sign_up_page() {
		WebUI.verifyElementVisible(findTestObject('Object Repository/EMS/signupPage/title'))
	}

	@Then("I can see email field")
	public void i_can_see_email_field() {
		WebUI.verifyElementVisible(findTestObject('Object Repository/EMS/signupPage/email'))
	}

	@Then("I can see the create account button on sign up page")
	public void i_can_see_the_create_account_button_on_sign_up_page() {
		WebUI.verifyElementVisible(findTestObject('Object Repository/EMS/signupPage/Login'))
	}

	@When("I enter valid email")
	public void i_enter_valid_email() {
		WebUI.sendKeys(findTestObject('Object Repository/EMS/signupPage/email'), GlobalVariable.email)
	}

	@When("I click on submit on sign up page")
	public void i_click_on_submit_on_sign_up_page() {
		WebUI.click(findTestObject('Object Repository/EMS/signupPage/signUp'))
	}
}