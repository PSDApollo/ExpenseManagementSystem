import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../loginstyle.css';
import expenseManagementImage from '../images/naassom-azevedo-Q_Sei-TqSlc-unsplash.jpg';

function Login() {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCredentials({
            ...credentials,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault(); 
        fetch('backend-url', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                navigate('/home');
            } else {
                alert('Login failed!');
            }
        })
        .catch(error => {
            console.error('Login Error:', error);
        });
    };

    return (
        <div className="container">
            <div className="image-section">
                <img src={expenseManagementImage} alt="Expense Management" />
                <div className="tagline">Plan. Track. Thrive.<br />Expense Management the Apollo Way.</div>
            </div>
            <div className="form-section">
                <h1>Hello Apollo!</h1>
                <p>Welcome back you've been missed!</p>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        class = "username"
                        name="username" 
                        placeholder="Enter username" 
                        onChange={handleInputChange} 
                    />
                    <input 
                        type="password" 
                        class = "password"
                        name="password" 
                        placeholder="Password" 
                        onChange={handleInputChange} 
                    />
                    <button type="submit">Sign In</button>
                    <div className="signup-text">
                    Don't have an account? <Link to="/signup">Signup</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
