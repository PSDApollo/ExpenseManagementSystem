package com.psd.ExpenseManagementSystem.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.psd.ExpenseManagementSystem.bean.Expense;
import com.psd.ExpenseManagementSystem.repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ExpenseService {
	@Autowired
	public ExpenseRepository expenseRepo;

	public List<Expense> getAllExpenses()
	{
		List<Expense> expenses = new ArrayList<>();
		expenseRepo.findAll().forEach(expenses::add);
		return expenses;
	}

	public Optional<Expense> getAnExpense(String id)
	{
		return expenseRepo.findById(id);
	}

	public void addExpense(Expense expense) {
		expenseRepo.save(expense);

	}

	public void updateExpense(String id, Expense expense) {
		expenseRepo.save(expense);

	}

	public void deleteExpense(String id) {
		expenseRepo.deleteById(id);

	}
}
