import React, { useEffect, useState } from 'react';

function ExpenseList() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    console.log('Fetching expenses...');
    fetch('https://099b-2600-6c40-7500-11f5-3c2f-7679-1906-59fb.ngrok-free.app/expenses')
      .then((response) => {
        if (response.ok) {
          console.log('Successfully fetched expenses.');
          return response.json();
        } else {
          throw new Error('Failed to fetch expenses.');
        }
      })
      .then((data) => {
        console.log('Data received:', data);
        setExpenses(data);
      })
      .catch((error) => {
        console.error('Error fetching expenses:', error);
      });
  }, []);

  return (
    <div>
      <h1>Expense List</h1>
      <ul>
        {expenses.map((expense) => (
          <li key={expense.id}>
            {expense.name} - {expense.amount}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExpenseList;
