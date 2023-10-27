import React from 'react';
import { useNavigate } from 'react-router-dom';
import AddExpense from './AddExpense';
import ExpenseList from './ExpenseList';
import '../style.css';

function Dashboard() {
  const navigate = useNavigate();
  return (
    <div className='dashboard'>
      <AddExpense />
      <ExpenseList />
    </div>
  );
}

export default Dashboard;
