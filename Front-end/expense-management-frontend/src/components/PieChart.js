import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const PieChart = () => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null); // Store the chart instance

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstanceRef.current) {
        // If a chart instance already exists, destroy it
        chartInstanceRef.current.destroy();
      }

      const ctx = chartRef.current.getContext('2d');

      chartInstanceRef.current = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Red', 'Blue', 'Yellow', 'Green'],
          datasets: [
            {
              data: [300, 50, 100, 200],
              backgroundColor: ['red', 'blue', 'yellow', 'green'],
            },
          ],
        },
        options: {
          // Chart.js options (e.g., tooltips, legends) can be added here
        },
      });
    }
  }, []);

  return (
    <div>
      <h2>Pie Chart</h2>
      <canvas ref={chartRef} width="400" height="400"></canvas>
    </div>
  );
};

export default PieChart;
