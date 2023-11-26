import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../loginstyle.css';
import expenseManagementImage from '../images/naassom-azevedo-Q_Sei-TqSlc-unsplash.jpg';

function Login() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: '',
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

    fetch('https://c919-2600-6c40-75f0-82e0-75e2-b725-7087-47b7.ngrok-free.app/login', {
      method: 'POST',
      origin: 'http://localhost:3000/',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })
    .then((response) => {
      if (response.ok) {
        console.log('Login Successful!');
        window.alert('Login Success');
        return response.text(); 
      } else {
        window.alert('Login failed');
        throw new Error('Login failed');
      }
    })
    .then((key) => {
      localStorage.setItem('myKey', key);
      console.log('Key received: ', key);
      navigate('/dashboard');
    })
    .catch((error) => {
      console.error(error);
    });
  };

  return (
    <div className="container">
      <div className="image-section">
        <img src={expenseManagementImage} alt="Expense Management" />
      </div>
      <div className="form-section">
        <h1>Hello Apollo!</h1>
        <p>Welcome back you've been missed!</p>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            className="username"
            name="email" 
            placeholder="Enter username" 
            onChange={handleInputChange} 
          />
          <input 
            type="password" 
            className="password"
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
