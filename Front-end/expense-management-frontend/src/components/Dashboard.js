// Dashboard.js
import React from 'react';
import BarChart from './BarChart';
// import './dashboard.css';
const Dashboard = () => {
  return (
    <div>
    <h1>Graphical Dashboard</h1>
    <div className='container'>
      <div className='barchart-container'>
      <BarChart />
      </div>
    </div>
    </div>
  );
};

export default Dashboard;
