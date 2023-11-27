import React, { useEffect, useState } from 'react';

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
    <div>
      <h1>Expense List</h1>
      <div style={{ float: 'right', marginBottom: '10px' }}>
        <label htmlFor="currency">Currency:</label>
        <select id="currency" value={selectedCurrency} onChange={handleCurrencyChange}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="INR">INR</option>
        </select>
      </div>
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
              <td>{getCurrencySymbol(selectedCurrency)}{convertAmountToSelectedCurrency(expense.amount, selectedCurrency)}</td>
              <td>{new Date(expense.expense_date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ExpenseList;
