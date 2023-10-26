import React from 'react';
import AddExpense from './AddExpense';
import ExpenseList from './ExpenseList';
import '../style.css';

function Dashboard() {
  return (
    <div className='dashboard'>
      <AddExpense />
      <ExpenseList />
    </div>
  );
}

export default Dashboard;
