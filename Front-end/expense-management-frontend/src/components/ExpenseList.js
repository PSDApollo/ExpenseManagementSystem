import React, { useEffect, useState } from 'react';
import '../expenseliststyle.css';
import { Box, Typography, Select, MenuItem, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import { Link } from 'react-router-dom';

function ExpenseList() {
  const [expenses, setExpenses] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [exchangeRates, setExchangeRates] = useState({
    USD: { symbol: '$', rate: 1 },
    EUR: { symbol: '€', rate: 0.85 },
    INR: { symbol: '₹', rate: 73.5 },
  });

  useEffect(() => {
    console.log('Fetching expenses...');
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

  const handleCurrencyChange = (event) => {
    const newCurrency = event.target.value;
    setSelectedCurrency(newCurrency);
  };

  const convertAmountToSelectedCurrency = (amount, currency) => {
    const rate = exchangeRates[currency].rate;
    return (amount * rate).toFixed(2);
  };

  const getCurrencySymbol = (currency) => {
    return exchangeRates[currency].symbol;
  };

  return (
    <div className="expense-list-container">
      <h1 className="expense-list-title">Expense List</h1>
      <Box sx={{ float: 'right', marginBottom: '10px' }}>
        <label htmlFor="currency">Currency:    </label>
        <Select id="currency" value={selectedCurrency} onChange={handleCurrencyChange}>
          <MenuItem value="USD">USD</MenuItem>
          <MenuItem value="EUR">EUR</MenuItem>
          <MenuItem value="INR">INR</MenuItem>
        </Select>
      </Box>
      <table  className="expense-list-table">
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
              <td>{getCurrencySymbol(selectedCurrency)}{convertAmountToSelectedCurrency(expense.amount, selectedCurrency)}</td>
              <td>{new Date(expense.expense_date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <Box textAlign="center" mt={2}>
          <Link to="/dashboard">
            <button variant="contained" className="action-btn" style={{ width: '200px' }}>
              Back to Dashboard
            </button>
          </Link>
        </Box>
    </div>
  );
}

export default ExpenseList;
