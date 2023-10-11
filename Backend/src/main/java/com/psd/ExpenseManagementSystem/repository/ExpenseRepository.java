package com.psd.ExpenseManagementSystem.repository;

import org.springframework.data.repository.CrudRepository;

import com.psd.ExpenseManagementSystem.bean.Expense;

public interface ExpenseRepository extends CrudRepository<Expense,String> {
	

}
