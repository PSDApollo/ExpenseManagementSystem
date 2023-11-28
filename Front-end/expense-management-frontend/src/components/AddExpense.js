import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../addexpensestyle.css'; 

function AddExpense() {
  const navigate = useNavigate();
  const [expense, setExpense] = useState({
    name: '',
    description: '',
    amount: '',
    expenseDate: '',
    friendId: '',
  });
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const authKey = localStorage.getItem('myKey');
    if (authKey) {
      fetch('https:///friends', {
        method: 'GET',
        headers: {
          'Authorization': authKey,
        }
      })
      .then(response => response.json())
      .then(data => setFriends(data))
      .catch(error => console.error('Error fetching friends:', error));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExpense({ ...expense, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newExpense = {
      ...expense,
      amount: parseFloat(expense.amount),
      friendId: parseInt(expense.friendId),
    };
    const authKey = localStorage.getItem('myKey');
    fetch('https://expenses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authKey,
      },
      body: JSON.stringify(newExpense),
    })
    .then(response => {
      if (response.ok) {
        alert('Expense added successfully.');
        navigate('/dashboard');
      } else {
        alert('Failed to add expense.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });

  };

  return (
    <div className='add-expense-container'>
      <form className='add-expense-form' onSubmit={handleSubmit}>
        <h1 className='add-expense-heading'>Add Expense</h1>
        <div className='add-expense-input-group'>
          <input 
            className='add-expense-input' 
            type="text" 
            name="name" 
            placeholder="Name" 
            value={expense.name}
            onChange={handleInputChange} 
          />
        </div>
        <div className='add-expense-input-group'>
          <input 
            className='add-expense-input' 
            type="text" 
            name="description" 
            placeholder="Description" 
            value={expense.description}
            onChange={handleInputChange} 
          />
        </div>
        <div className='add-expense-input-group'>
          <input 
            className='add-expense-input' 
            type="number" 
            name="amount" 
            placeholder="Amount" 
            value={expense.amount}
            onChange={handleInputChange} 
          />
        </div>
        <div className='add-expense-input-group'>
          <input 
            className='add-expense-input' 
            type="date" 
            name="expenseDate" 
            value={expense.expenseDate}
            onChange={handleInputChange} 
          />
        </div>
        <div className='add-expense-input-group'>
          <select 
            className='add-expense-select'
            name="friendId" 
            value={expense.friendId} 
            onChange={handleInputChange}
          >
            <option value="">Select a friend's email</option>
            {friends.map(friend => (
              <option key={friend.id} value={friend.id}>
                {friend.email}
              </option>
            ))}
          </select>
        </div>
        <button className='add-expense-submit' type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddExpense;
