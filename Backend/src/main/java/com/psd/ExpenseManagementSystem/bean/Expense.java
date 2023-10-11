package com.psd.ExpenseManagementSystem.bean;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

@Entity
@Table(name="Expense")
public class Expense {

	@Id
	private String id;
	private String name;

	private String description;

	private Integer amount;

	private Date expense_date;

	public Expense() {

	}
	public Expense(String id, String name, String description, Integer amount, Date expense_date) {
		super();
		this.id = id;
		this.name = name;
		this.expense_date = expense_date;
		this.amount = amount;
		this.description = description;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}

	public Integer getAmount() {
		return amount;
	}

	public void setAmount(Integer amount) {
		this.amount = amount;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Date getExpense_date() {
		return expense_date;
	}

	public void setExpense_date(Date expense_date) {
		this.expense_date = expense_date;
	}


}
