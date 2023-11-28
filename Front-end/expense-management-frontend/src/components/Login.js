import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../loginstyle.css';
import expenseManagementImage from '../images/LoginPage.png';

function Login() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [emailError, setEmailError] = useState(''); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value
    });

    // Email validation logic
    if (name === 'email') {
      if (value.includes('@')) {
        setEmailError('');
      } else {
        setEmailError('Please enter a valid email');
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!credentials.email.includes('@')) {
      setEmailError('Please enter a valid email');
      return;
    }
    setEmailError('');

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
    <div className="login-container">
      <div className="login-form">
        <h1 className="login-title">Login to Apollo</h1>
        <p className="login-description">Welcome back, you've been missed!</p>
        <form onSubmit={handleSubmit}>
          <div className="login-input-group">
            <label htmlFor="email" className='login-username'>Username</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              placeholder="Your@gmail.com" 
              onChange={handleInputChange} 
              value={credentials.email}
            />
            {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
          </div>
          <div className="login-input-group">
            <label htmlFor="password" className='login-password'>Password</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              placeholder="Your Password" 
              onChange={handleInputChange} 
              value={credentials.password}
            />
          </div>
          <button type="submit" className="login-button">Log In</button>
          <Link to="/signup" className="login-forgot-password">Don't have an account? Signup</Link>
        </form>
      </div>
      <div className="login-image-section">
        <img src={expenseManagementImage} alt="Expense Management" />
      </div>
    </div>
  );
}

export default Login;
