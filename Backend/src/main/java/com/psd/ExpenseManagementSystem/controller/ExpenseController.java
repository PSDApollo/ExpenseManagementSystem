package com.psd.ExpenseManagementSystem.controller;

import java.util.List;

import com.psd.ExpenseManagementSystem.bean.Expense;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.psd.ExpenseManagementSystem.service.ExpenseService;

@RestController
public class ExpenseController {
	@Autowired
	private ExpenseService expenseService;

	@RequestMapping("/expenses")
	public List<Expense> getAllExpenses()
	{
		return expenseService.getAllExpenses();
	}

	@RequestMapping(method = RequestMethod.POST, value="/expenses")
	public void addExpense(@RequestBody Expense expense)
	{
		expenseService.addExpense(expense);
	}

	@RequestMapping(method = RequestMethod.PUT, value="/expenses/{id}")
	public void updateExpense(@PathVariable String id, @RequestBody Expense expense)
	{
		expenseService.updateExpense(id, expense);
	}
	@RequestMapping(method = RequestMethod.DELETE, value="/expenses/{id}")
	public void DeleteExpense(@PathVariable String id)
	{
		expenseService.deleteExpense(id);
	}

}
