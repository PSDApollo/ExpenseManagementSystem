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



class GraphicalDashboard {

	@When("I click on the graphical dashboard")
	public void i_click_on_the_graphical_dashboard() {
		WebUI.click(findTestObject('Object Repository/EMS/GraphicalDashboard/button_backToDashBoard'))
	}

	@Given("I am on the graphical dashboard page")
	public void i_am_on_the_graphical_dashboard_page() {
		WebUI.verifyElementVisible(findTestObject('Object Repository/EMS/GraphicalDashboard/title'))
	}

	@Then("I can see the barchart")
	public void i_can_see_the_barchart() {
		WebUI.verifyElementVisible(findTestObject('Object Repository/EMS/GraphicalDashboard/graph_BarChart'))	
	}

	@Then("I can see the title of graphical dashboard")
	public void i_can_see_the_title_of_graphical_dashboard() {
		WebUI.verifyElementVisible(findTestObject('Object Repository/EMS/GraphicalDashboard/title'))	
	}

	@Then("I can see the total expenses")
	public void i_can_see_the_total_expenses() {
		WebUI.verifyElementVisible(findTestObject('Object Repository/EMS/GraphicalDashboard/label_totalExpenses'))
	}

	@Then("I can see the day with most expenses")
	public void i_can_see_the_day_with_most_expenses() {
		WebUI.verifyElementVisible(findTestObject('Object Repository/EMS/GraphicalDashboard/label_DayWithMostExpenses'))
	}

	@Then("I can see the back to dashboard button")
	public void i_can_see_the_back_to_dashboard_button() {
		WebUI.verifyElementVisible(findTestObject('Object Repository/EMS/GraphicalDashboard/button_backToDashBoard'))
	}

	@When("I click on back to dashboard button")
	public void i_click_on_back_to_dashboard_button() {
		WebUI.click(findTestObject('Object Repository/EMS/GraphicalDashboard/button_backToDashBoard'))
	}
}