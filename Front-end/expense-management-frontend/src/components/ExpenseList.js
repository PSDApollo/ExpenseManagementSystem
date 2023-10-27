import React, { useEffect, useState } from 'react';
 
function ExpenseList() {
  const [expenses, setExpenses] = useState([]);
 
  useEffect(() => {
    console.log('Fetching expenses...');
    fetch('https://15af-2600-6c40-75f0-ffc0-dc90-95b4-5282-a6e0.ngrok-free.app/expenses', {
      origin: 'http://localhost:3000/',
    headers: {
        'Authorization': localStorage.getItem('userKey') // Send the user key in headers
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
 