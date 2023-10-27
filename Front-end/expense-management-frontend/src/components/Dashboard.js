import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../dashboardstyle.css';  

function Dashboard() {
    const navigate = useNavigate();
    
    
    const [sessionKey, setSessionKey] = useState(""); 

    const sendKeyToBackend = (endpoint) => {
        fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionKey
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
            } else {
                console.error("Error sending session key to backend.");
            }
        });
    }

    const handleLogout = () => {
        navigate("/");
    }

    return (
        <div className="dashboard-container">
            <header>
                <h1>APOLLO</h1>
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </header>
            <div className="main-content">
                <h2>Welcome User!</h2>
                <Link to="/add-expense" onClick={() => sendKeyToBackend("https://15af-2600-6c40-75f0-ffc0-dc90-95b4-5282-a6e0.ngrok-free.app/expenses")}>
                    <button className="action-btn">Add Expense</button>
                </Link>
                <Link to="/expenselist" onClick={() => sendKeyToBackend("https://15af-2600-6c40-75f0-ffc0-dc90-95b4-5282-a6e0.ngrok-free.app/login")}>
                    <button className="action-btn">Expense Log</button>
                </Link>
            </div>
        </div>
    );
}

export default Dashboard;
