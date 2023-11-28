import React from 'react';
import { Link } from 'react-router-dom';
import '../dashboardstyle.css'; 
import newImg from '../images/newimg.png';

function Dashboard() {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1 className="dashboard-h1" data-testid='APOLLO'>APOLLO</h1>
        <Link to="/" className="dashboard-logout-link">
          <button className="dashboard-logout-btn" data-testid='Logout'>Logout</button>
        </Link>
      </header>
      <div className="dashboard-content-wrapper"> 
        <div className="dashboard-image-container"> 
          <img src={newImg} alt="Descriptive Alt Text" className="dashboard-img"/>
        </div>
        <div className="dashboard-main-content">
          <div className="dashboard-welcome-box" data-testid='Welcome User!'>Welcome User!</div>
          <div className="dashboard-button-container">
            <Link to="/add-expense" className="dashboard-button-link">
              <button className="dashboard-action-btn" data-testid='Add Expense'>Add Expense</button>
            </Link>
            <Link to="/expenselist" className="dashboard-button-link">
              <button className="dashboard-action-btn" data-testid='Expense Log'>Expense Log</button>
            </Link>
            <Link to="/graphical-dashboard" className="dashboard-button-link">
              <button className="dashboard-action-btn" data-testid='Graphical Dashboard'>Graphical Dashboard</button>
            </Link>
            <Link to="/add-friends" className="dashboard-button-link">
              <button className="dashboard-action-btn" data-testid='Add Friends'>Add Friends</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
