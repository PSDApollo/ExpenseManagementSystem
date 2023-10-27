import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

const BarChart = () => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null); // Store the chart instance
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [highestExpenseDay, setHighestExpenseDay] = useState('');
  const [expenses, setExpenses] = useState([]);

  const getCurrentMonthExpenses = () => {
    const currentMonth = new Date().toLocaleString('default', { month: 'long' });
    return `${currentMonth} Expenses`;
  };
  // const headers = {
  //   'Authorization': 'Y2hhbmFreWFAZ21haWwuY29tOnBhc3N3b3Jk',
  //   'Access-Control-Allow-Origin' : '*'
  // }

  const headers = new Headers();
headers.append('Authorization', `Basic Y2hhbmFreWFAZ21haWwuY29tOnBhc3N3b3Jk`); // Ensure correct case

  useEffect(() => {

  //   fetch('https://15af-2600-6c40-75f0-ffc0-dc90-95b4-5282-a6e0.ngrok-free.app/expenses', {
  //     method: 'GET',
  //     headers: headers,
  //     // mode: 'no-cors',
  //     origin: 'http://localhost:3000/'
  // })
  //     .then((response) => {
  //       if (response.ok) {
  //         console.log('Successfully fetched expenses.');
  //         return response.json();
  //       } else {
  //         throw new Error('Failed to fetch expenses.');
  //       }
  //     })
  //     .then((data) => {
  //       console.log('Data received:', data);
  //       setExpenses(data);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching expenses:', error);
  //     });
  

    if (chartRef.current) {
      if (chartInstanceRef.current) {
        // If a chart instance already exists, destroy it
        chartInstanceRef.current.destroy();
      }

      const ctx = chartRef.current.getContext('2d');

      const currentMonth = new Date().getMonth();
      const daysInMonth = new Date(new Date().getFullYear(), currentMonth + 1, 0).getDate();

      const days = Array.from({ length: daysInMonth }, (_, i) => `${i + 1}`);
      const expenses = Array.from({ length: daysInMonth }, () =>
        Math.floor(Math.random() * 100) + 1
      ); // Sample data

      const randomColors = Array.from({ length: daysInMonth }, () => getRandomColor()); // Generate random colors

      setTotalExpenses(expenses.reduce((total, expense) => total + expense, 0));

      // Find the day with the highest expense
      const maxExpense = Math.max(...expenses);
      const dayWithMaxExpense = days[expenses.indexOf(maxExpense)];

      // Format the highest expense day
      const currentMonthName = new Date().toLocaleString('default', { month: 'long' });
      setHighestExpenseDay(`Most spent on: ${dayWithMaxExpense}, ${currentMonthName} ${new Date().getFullYear()}`);

      chartInstanceRef.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: days,
          datasets: [
            {
              label: 'Expenses',
              data: expenses,
              backgroundColor: randomColors,
            },
          ],
        },
        options: {
          scales: {
            x: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Day',
              },
            },
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Expenses',
              },
            },
          },
          plugins: {
            legend: {
              display: false, // Set the display option to false to hide the legend
            },
          },
        },
      });
    }
  }, []);

  // Function to generate a random color
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  
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
