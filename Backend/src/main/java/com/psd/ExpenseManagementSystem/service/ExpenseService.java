package com.psd.ExpenseManagementSystem.service;

import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

import com.psd.ExpenseManagementSystem.bean.Expense;
import com.psd.ExpenseManagementSystem.repository.ExpenseRepository;
import com.psd.ExpenseManagementSystem.repository.ProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.Calendar;
import java.util.Date;
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

	private boolean isExpenseFromCurrentMont(Date dateOfExpense){
		int currentMonth = Calendar.getInstance().get(Calendar.MONTH) + 1;
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(dateOfExpense);
		int monthValue = calendar.get(Calendar.MONTH) + 1;
		return currentMonth == monthValue;
	}

	public List<Integer> getFilteredExpensesForDashboard(){

		List<Expense> allExpenses = getAllExpenses();
		List<Integer> expenseAmounts = new ArrayList<>();

		for(Expense expense : allExpenses){
			if(isExpenseFromCurrentMont(expense.getExpense_date()))
				expenseAmounts.add(expense.getAmount());
		}

		return expenseAmounts;
	}
	
}
