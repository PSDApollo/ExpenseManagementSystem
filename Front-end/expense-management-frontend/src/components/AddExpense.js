import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style.css';

function AddExpense() {
  const history = useNavigate();

  const [expense, setExpense] = useState({
    name: '',
    description: '',
    amount: 0,
    expenseDate: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExpense({ ...expense, [name]: value });
  };

  const handleSubmit = () => {
    const newExpense = {
      name: expense.name,
      description: expense.description,
      amount: parseInt(expense.amount),
      expense_date: expense.expenseDate,
    };

    fetch('https://3390-2600-6c40-7500-11f5-3c2f-7679-1906-59fb.ngrok-free.app/expenses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newExpense),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Expense added successfully.');
          window.alert('Expense added successfully.');
          history('/');
        } else {
          console.error('Failed to add expense.');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className='expense-add'>
      <h2 className='team-name'>ALPHA</h2>
      <h1>Add Expense</h1>
      <form>
        <label>Name: <input type="text" name="name" onChange={handleInputChange} /></label><br />
        <label>Description: <input type="text" name="description" onChange={handleInputChange} /></label><br />
        <label>Amount: <input type="number" name="amount" onChange={handleInputChange} /></label><br />
        <label>Date: <input type="date" name="expenseDate" onChange={handleInputChange} /></label><br />
        <button type="button" onClick={handleSubmit}>Add Expense</button>
      </form>
    </div>
  );
}

export default AddExpense;
