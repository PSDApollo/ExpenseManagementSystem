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
      toast.error('Expense limit crossed. Be careful!', { position: 'top-center' });

      // Reset the flag after a delay
      setTimeout(() => {
        setExpenseLimitCrossed(false);
      }, 1000); // Adjust the delay time as needed
    }
  }, [expenseLimitCrossed]);

  return (
    <div className="dashboard-container">
      <header>
        <h1 data-testid="APOLLO">APOLLO</h1>
        <Link to="/profile">
          <FontAwesomeIcon icon={faUser} className="profile-icon" data-testid="ProfileIcon" />
        </Link>
        <Link to="/">
          <button className="logout-btn" data-testid="Logout">
            Logout
          </button>
        </Link>
      </header>
      <div className="main-content">
        <h2 data-testid="Welcome User!" className="welcome-box">
          Welcome User!
        </h2>
        <Link to="/add-expense">
          <button className="action-btn" data-testid="Add Expense">
            Add Expense
          </button>
        </Link>
        <Link to="/expenselist">
          <button className="action-btn" data-testid="Expense Log">
            Expense Log
          </button>
        </Link>
        <Link to="/graphical-dashboard">
          <button className="action-btn" data-testid="Graphical Dashboard">
            Graphical Dashboard
          </button>
        </Link>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
}

export default Dashboard;
