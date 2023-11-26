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

  const [friends, setFriends] = useState([]); // State to hold the friends data

  useEffect(() => {
    // Fetch the friends using the auth key
    const authKey = localStorage.getItem('myKey');
    fetch('https://c919-2600-6c40-75f0-82e0-75e2-b725-7087-47b7.ngrok-free.app/friends', {
      method: 'GET',
      headers: {
        'Authorization': authKey,
      }
    })
    .then(response => response.json())
    .then(data => setFriends(data)) // Update the friends state with the fetched data
    .catch(error => console.error('Error fetching friends:', error));
  }, []); // The empty array ensures this effect runs only once on component mount

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExpense({ ...expense, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newExpense = {
      ...expense,
      amount: parseFloat(expense.amount), // Parse amount to ensure it's a float
      expenseDate: expense.expenseDate,
      friendId: parseInt(expense.friendId), // Parse friendId to ensure it's an integer
    };

    const authKey = localStorage.getItem('myKey');
    fetch('https://c919-2600-6c40-75f0-82e0-75e2-b725-7087-47b7.ngrok-free.app/expenses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authKey,
      },
      body: JSON.stringify(newExpense),
    })
    .then((response) => {
      if (response.ok) {
        console.log('Expense added successfully.');
        alert('Expense added successfully.');
        navigate('/dashboard');
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
      <form onSubmit={handleSubmit}>
        <label>Name: <input type="text" name="name" onChange={handleInputChange} /></label><br />
        <label>Description: <input type="text" name="description" onChange={handleInputChange} /></label><br />
        <label>Amount: <input type="number" name="amount" onChange={handleInputChange} /></label><br />
        <label>Date: <input type="date" name="expenseDate" onChange={handleInputChange} /></label><br />
        <label>Friend:
          <select 
            name="friendId" 
            value={expense.friendId} 
            onChange={handleInputChange}
          >
            <option value="">Select a friend's email</option>
            {friends.map(friend => (
              <option key={friend.id} value={friend.friend_id}>
                {friend.email}
              </option>
            ))}
          </select>
        </label><br />
        <button type="submit">Add Expense</button>
      </form>
    </div>
  );
}

export default AddExpense;
