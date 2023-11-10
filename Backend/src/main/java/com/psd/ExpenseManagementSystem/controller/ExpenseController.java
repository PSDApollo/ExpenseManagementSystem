package com.psd.ExpenseManagementSystem.controller;

import java.util.List;
import java.util.Optional;

import com.psd.ExpenseManagementSystem.bean.Expense;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.psd.ExpenseManagementSystem.service.ExpenseService;


// This file is used for showing all the APIs related to an expense.
@RestController
public class ExpenseController {
	@Autowired
	private ExpenseService expenseService;

	// Defining a route for getting all the expenses.
	@RequestMapping("/expenses")
	public List<Expense> getAllExpenses()
	{
		return expenseService.getAllExpenses();
	}


	// Defining a route for getting an expense by id
	@RequestMapping(method = RequestMethod.GET, value = "/expenses/{id}")
	public Optional<Expense> getAnExpense(@PathVariable long id)
	{
		return expenseService.getAnExpense(id);
	}


	// Defining a route for adding an expense.
	@RequestMapping(method = RequestMethod.POST, value="/expenses")
	public void addExpense(@RequestBody Expense expense)
	{
		expenseService.addExpense(expense);
	}


	// Defining a route for updating an expense.
	@RequestMapping(method = RequestMethod.PUT, value="/expenses/{id}")
	public void updateExpense(@PathVariable Long id, @RequestBody Expense expense)
	{
		expenseService.updateExpense(id, expense);
	}

	// Defining a route for deleting an expense.
	@RequestMapping(method = RequestMethod.DELETE, value="/expenses/{id}")
	public void DeleteExpense(@PathVariable Long id)
	{
		expenseService.deleteExpense(id);
	}

	// Defining a route for retrieving just expense amounts.
	@RequestMapping(method = RequestMethod.GET, value="/expenses/dashboard")
	public List<Integer> getFilteredExpensesForDashboard()
	{
		return expenseService.getFilteredExpensesForDashboard();
	}

}
