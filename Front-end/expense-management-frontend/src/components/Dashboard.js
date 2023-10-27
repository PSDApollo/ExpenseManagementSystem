import React from 'react';
import { Link } from 'react-router-dom';
import '../dashboardstyle.css';  
import BarChart from './BarChart';
function Dashboard() {
  return (
      <div className="dashboard-container">
          <header>
              <h1>APOLLO</h1>
              <Link to="/">
                  <button className="logout-btn">Logout</button>
              </Link>
          </header>
          <div className="main-content">
              <h2>Welcome User!</h2>
              <Link to="/add-expense">
                  <button className="action-btn">Add Expense</button>
              </Link>
              <Link to="/expenselist">
                  <button className="action-btn">Expense Log</button>
              </Link>
              <Link to="/graphical-dashboard">
                  <button className="action-btn">Graphical Dashboard</button>
              </Link>
          </div>
      </div>
  );
}

export default Dashboard;

