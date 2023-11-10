import React from 'react';
import { Link } from 'react-router-dom';
import '../dashboardstyle.css';  
function Dashboard() {
  return (
      <div className="dashboard-container">
          <header>
              <h1 data-testid='APOLLO'>APOLLO</h1>
              <Link to="/">
                  <button className="logout-btn" data-testid='Logout'>Logout</button>
              </Link>
          </header>
          <div className="main-content">
              <h2 data-testid='Welcome User!' className='welcome-box'>Welcome User!</h2>
              <Link to="/add-expense">
                  <button className="action-btn" data-testid='Add Expense'>Add Expense</button>
              </Link>
              <Link to="/expenselist">
                  <button className="action-btn" data-testid='Expense Log'>Expense Log</button>
              </Link>
              <Link to="/graphical-dashboard">
                  <button className="action-btn" data-testid='Graphical Dashboard'>Graphical Dashboard</button>
              </Link>
          </div>
      </div>
  );
}

export default Dashboard;

