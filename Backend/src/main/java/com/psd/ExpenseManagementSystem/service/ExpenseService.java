package com.psd.ExpenseManagementSystem.service;

import java.util.*;

import com.psd.ExpenseManagementSystem.bean.Expense;
import com.psd.ExpenseManagementSystem.iterators.ProfileIdAndMonthFilteredExpenseIterator;
import com.psd.ExpenseManagementSystem.repository.ExpenseRepository;
import com.psd.ExpenseManagementSystem.repository.ProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;

// This file is for writing the functionalities for all the things related to expense.
@Service
public class ExpenseService {
	@Autowired
	public ExpenseRepository expenseRepo;

	@Autowired
	ProfileRepository userRepo;

	@Autowired
	private HttpServletRequest request;

	// Functionality for getting all the expenses created.
	public List<Expense> getAllExpenses()
	{
		List<Expense> expenses = new ArrayList<>();
		expenseRepo.findAll().forEach(expenses::add);
		return expenses;
	}


	// Functionality for getting the token from headers
	public String getHeaders(){
		return request.getHeader("Authorization");
	}

	// Functionality for getting a specific expense.
	public Optional<Expense> getAnExpense(long id)
	{
		return expenseRepo.findById(id);
	}

	// Functionality for getting the user related information i.e., for session.
	public long getProfileIdFromHeader(){
		byte[] decodedBytes = Base64.getDecoder().decode(getHeaders());
		String decodedString = new String(decodedBytes);
		decodedString = decodedString.split(":")[0];
		return userRepo.findByEmail(decodedString).getId();
	}

	// Functionality for adding an expense.
	public void addExpense(Expense expense) {
		long profile_id = getProfileIdFromHeader();
		expense.setProfile_id(profile_id);
		expenseRepo.save(expense);

	}

	// Functionality for updating an expense.
	public void updateExpense(Long id, Expense expense) {
		expenseRepo.save(expense);

	}

	// Functionality for deleting an expense.
	public void deleteExpense(Long id) {
		expenseRepo.deleteById(id);

	}

	//Functionality for getting expense amounts for current user
	public List<Map.Entry<Integer,Integer>> getFilteredExpensesForDashboard(){

		List<Expense> allExpenses = getAllExpenses();
		List<Map.Entry<Integer,Integer>> expenseAmounts = new ArrayList<>();

		ProfileIdAndMonthFilteredExpenseIterator expenseIterator = new ProfileIdAndMonthFilteredExpenseIterator(allExpenses, getProfileIdFromHeader());

		while (expenseIterator.hasNext()) {
			Map.Entry<Integer,Integer> amount = expenseIterator.next();
			expenseAmounts.add(amount);
		}
		return expenseAmounts;
	}
	
}

