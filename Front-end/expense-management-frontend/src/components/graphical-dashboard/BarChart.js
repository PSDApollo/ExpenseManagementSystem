import React, { useEffect, useRef, useState } from 'react';
import { BarChartDesigner, getRandomColor, optionBuilder,dataSetBuilder } from './BarChartDesigner';
import { generateExpenseMockData, getExpenseArrayFromAPI } from './DataController';


const BarChart = () => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null); // Store the chart instance
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [highestExpenseDay, setHighestExpenseDay] = useState('');
  const getCurrentMonthExpenses = () => {
  const currentMonth = new Date().toLocaleString('default', { month: 'long' });
    return `${currentMonth} Expenses`;
  };

//Function to get day with most expenses
  function getDayWithMostExpenses(expenses, days) {
    const maxExpense = Math.max(...expenses);
    const dayWithMaxExpense = days[expenses.indexOf(maxExpense)];
    const currentMonthName = new Date().toLocaleString('default', { month: 'long' });
    setHighestExpenseDay(`Most spent on: ${dayWithMaxExpense}, ${currentMonthName} ${new Date().getFullYear()}`);
}

  const currentMonth = new Date().getMonth();
  const daysInMonth = new Date(new Date().getFullYear(), currentMonth + 1, 0).getDate();
  const randomColors = Array.from({ length: daysInMonth }, () => getRandomColor()); 
  const [expensesArray, setExpensesArray] = useState([]);

  useEffect(() => {
    // const exp = getExpenseArrayFromAPI()
    // console.log("in component" + exp)
    const fetchData = async () => {
      try {
        const result = await getExpenseArrayFromAPI();
        setExpensesArray(result);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error, e.g., display an error message to the user
      }
    };

    fetchData(); 
    if (chartRef.current) {
      if (chartInstanceRef.current) {
        //Destroys the existing canvas        
        chartInstanceRef.current.destroy();
      }

      const xLabelDays = Array.from({ length: daysInMonth }, (_, i) => `${i + 1}`);

      const yExpenseDataset = expensesArray
      console.log(yExpenseDataset)
      setTotalExpenses(yExpenseDataset.reduce((total, expense) => total + expense, 0));

      getDayWithMostExpenses(yExpenseDataset, xLabelDays);
      //Creates the bar chart
      chartInstanceRef.current = BarChartDesigner(chartRef, xLabelDays, [dataSetBuilder('Expenses', yExpenseDataset, randomColors)], optionBuilder('Day', true, 'Expenses', 'true', false))
    }
  }, []);

  
  return (
    <div>
      <h2>{getCurrentMonthExpenses()}</h2>
      <p>Total Expenses: ${totalExpenses}</p>
      <p>{highestExpenseDay}</p>
      <canvas role="img" id="dashboardCanvas" ref={chartRef} width="800" height="400"></canvas>
    </div>
  );
};

export default BarChart;
