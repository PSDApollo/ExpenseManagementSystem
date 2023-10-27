import React, { useEffect, useState } from 'react';
import '../expenseliststyle.css'; // Import your CSS file for styling
 
function ExpenseList() {
  const [expenses, setExpenses] = useState([]);
 
  useEffect(() => {
    console.log('Fetching expenses...');
    const key = localStorage.getItem('myKey'); // Get the key from local storage
 
    if (key) {
      fetch('https://15af-2600-6c40-75f0-ffc0-dc90-95b4-5282-a6e0.ngrok-free.app/expenses', {
        method: 'GET',
        headers: {
          'Authorization': key, // Use the key as the Authorization header
        }
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Parse the response as JSON
      })
      .then((data) => {
        console.log('Data received:', data);
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
    <div>
      <h1>Expense List</h1>
      <table className="expense-table">
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
              <td>{expense.amount}</td>
              <td>{new Date(expense.expense_date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
 
export default ExpenseList;