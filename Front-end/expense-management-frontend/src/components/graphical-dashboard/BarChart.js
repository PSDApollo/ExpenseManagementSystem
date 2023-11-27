import React, { useEffect, useRef, useState } from 'react';
import { BarChartDesigner, getRandomColor, optionBuilder, dataSetBuilder } from './BarChartDesigner';
import { getExpenseArrayFromAPI } from './DataController';

const BarChart = () => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null); // Store the chart instance
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [highestExpenseDay, setHighestExpenseDay] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [exchangeRates, setExchangeRates] = useState({
    USD: { symbol: '$', rate: 1 },
    EUR: { symbol: '€', rate: 0.85 },
    INR: { symbol: '₹', rate: 73.5 },
  });
  const getCurrentMonthExpenses = () => {
    const currentMonth = new Date().toLocaleString('default', { month: 'long' });
    return `${currentMonth} Expenses`;
  };

  // Function to get day with most expenses
  function getDayWithMostExpenses(expenses, days) {
    const maxExpense = Math.max(...expenses);
    const dayWithMaxExpense = days[expenses.indexOf(maxExpense)];
    const currentMonthName = new Date().toLocaleString('default', { month: 'long' });
    setHighestExpenseDay(`Most spent on: ${dayWithMaxExpense}, ${currentMonthName} ${new Date().getFullYear()}`);
  }

  const getCurrencySymbol = (currency) => {
    return exchangeRates[currency].symbol;
  };

  const currentMonth = new Date().getMonth();
  const daysInMonth = new Date(new Date().getFullYear(), currentMonth + 1, 0).getDate();
  const randomColors = Array.from({ length: daysInMonth }, () => getRandomColor());
  const [expensesArray, setExpensesArray] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getExpenseArrayFromAPI();
        setExpensesArray(result);

        if (chartRef.current) {
          if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
          }

          const xLabelDays = Array.from({ length: daysInMonth }, (_, i) => `${i + 1}`);

          // Convert expenses to selected currency
          const convertedExpenses = result.map((expense) => {
            // Perform currency conversion logic here based on selectedCurrency
            // For simplicity, let's assume USD is the base currency
            if (selectedCurrency === 'EUR') {
              return expense * 0.85; // Assuming 1 USD = 0.85 EUR
            } else if (selectedCurrency === 'INR') {
              return expense * 73.5; // Assuming 1 USD = 73.5 INR
            } else {
              return expense; // Default to USD
            }
          });

          setTotalExpenses(convertedExpenses.reduce((total, expense) => total + expense, 0));

          getDayWithMostExpenses(convertedExpenses, xLabelDays);
          chartInstanceRef.current = BarChartDesigner(
            chartRef,
            xLabelDays,
            [dataSetBuilder('Expenses', convertedExpenses, randomColors)],
            optionBuilder('Day', true, 'Expenses', 'true', false)
          );
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [selectedCurrency]); // Listen for changes in selectedCurrency

  const handleCurrencyChange = (event) => {
    const newCurrency = event.target.value;
    setSelectedCurrency(newCurrency);
  };

  return (
    <div>
      <div className="currency-dropdown">
        <label htmlFor="currency">Currency:</label>
        <select id="currency" value={selectedCurrency} onChange={handleCurrencyChange}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="INR">INR</option>
        </select>
      </div>
      <h2>{getCurrentMonthExpenses()}</h2>
      <p>Total Expenses: {getCurrencySymbol(selectedCurrency)}{totalExpenses.toFixed(2)}</p>
      <p>{highestExpenseDay}</p>
      <canvas role="img" id="dashboardCanvas" ref={chartRef} width="800" height="400"></canvas>
    </div>
  );
};

export default BarChart;
