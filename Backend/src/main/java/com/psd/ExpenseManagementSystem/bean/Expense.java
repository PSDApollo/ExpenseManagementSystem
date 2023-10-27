package com.psd.ExpenseManagementSystem.bean;

import javax.persistence.*;
import java.util.Date;


// Creating a table with all the required fields.
@Entity
@Table(name="Expense")
public class Expense {

	@Id
	// This is used to create a id automatically in a sequence
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private  long id;
	private String name;

	private String description;

	private Integer amount;

	private Date expense_date;

	// Adding getters and setters for all the fields in the table.

	public long getProfile_id() {
		return profile_id;
	}

	public void setProfile_id(long profile_id) {
		this.profile_id = profile_id;
	}

	private long profile_id;

	public Expense() {

	}

	// Adding a constructor for initializing a table.
	public Expense(long id, String name, String description, Integer amount, Date expense_date, long profile_id) {
		super();
		this.id = id;
		this.name = name;
		this.expense_date = expense_date;
		this.amount = amount;
		this.description = description;
		this.profile_id = profile_id;
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
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
