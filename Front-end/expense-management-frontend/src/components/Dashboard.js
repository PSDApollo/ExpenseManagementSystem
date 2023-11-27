import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../dashboardstyle.css';

function Dashboard() {
  const [expenseLimitCrossed, setExpenseLimitCrossed] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:9111/expenses/limit?email=' + localStorage.getItem('email'), {
          method: 'GET',
          headers: {
            'Authorization': localStorage.getItem('myKey')
          }
        });
        const userData = await response.json();
        console.log('API Response:', userData);
        setExpenseLimitCrossed(userData.result);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []); // Empty dependency array to run only once when the component is mounted

  useEffect(() => {
    // Display toast when expense limit is crossed
    if (expenseLimitCrossed) {
      toast.error('Monthly expense limit exceeded. Careful!', { position: 'top-center' });

      // Reset the flag after a delay
      setTimeout(() => {
        setExpenseLimitCrossed(false);
      }, 5000); // Adjust the delay time as needed (5 seconds in this example)
    }
  }, [expenseLimitCrossed]);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <Link to="/profile">
          <FontAwesomeIcon icon={faUser} className="profile-icon" data-testid="ProfileIcon" />
        </Link>
        <h1 className="dashboard-h1" data-testid='APOLLO'>APOLLO</h1>
        <Link to="/" className="dashboard-logout-link">
          <button className="dashboard-logout-btn" data-testid='Logout'>Logout</button>
        </Link>
      </header>
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
            <button className="dashboard-action-btn">Add Friends</button>
          </Link>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
}

export default Dashboard;
