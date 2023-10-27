import React from 'react';
import '../style.css'


function Home() {
  return (
    <div class='centered-div'>
      <h1>Welcome to the Expense Tracker</h1>
      <p>Click the button below to add an expense:</p>
      <a href="/add-expense">Add Expense</a>
      <a href="/dashboard">Go to Dashboard</a>
    </div>
  );
}

export default Home;
