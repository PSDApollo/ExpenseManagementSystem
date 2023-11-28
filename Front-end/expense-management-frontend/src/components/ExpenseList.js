import React, { useEffect, useState } from 'react';
import '../expenseliststyle.css'; 

function ExpenseList() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    // Fetching expenses from the backend
    const key = localStorage.getItem('myKey');

    if (key) {
      fetch('http://localhost:9111/expenses', {
        method: 'GET',
        headers: {
          'Authorization': key,
        },
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setExpenses(data);
      })
      .catch((error) => {
        console.error('Error fetching expenses:', error);
      });
    } else {
      console.error('Key not found in local storage');
    }
  }, []);

  return (
    <div className="expense-list-container">
      <h1 className="expense-list-title">Expense List</h1>
      {expenses.length > 0 ? (
        <table className="expense-list-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Expense Date</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id}>
                <td>{expense.name}</td>
                <td>{expense.description}</td>
                <td>${expense.amount.toFixed(2)}</td>
                <td>{new Date(expense.expense_date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="expense-list-no-data">No expenses to display</p>
      )}
    </div>
  );
}

export default ExpenseList;
