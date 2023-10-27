package com.psd.ExpenseManagementSystem.repository;

import org.springframework.data.repository.CrudRepository;

import com.psd.ExpenseManagementSystem.bean.Expense;


// Initializing a repository for an expense.
public interface ExpenseRepository extends CrudRepository<Expense,Long> {
	

}
