package com.psd.ExpenseManagementSystem.service;

import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

import com.psd.ExpenseManagementSystem.bean.Expense;
import com.psd.ExpenseManagementSystem.repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;

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

	public Optional<Expense> getAnExpense(long id)
	{
		return expenseRepo.findById(id);
	}

	public void addExpense(Expense expense) {
		expenseRepo.save(expense);

	}

	public void updateExpense(Long id, Expense expense) {
		expenseRepo.save(expense);

	}

	public void deleteExpense(Long id) {
		expenseRepo.deleteById(id);

	}
}
