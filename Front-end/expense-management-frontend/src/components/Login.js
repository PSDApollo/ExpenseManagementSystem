import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../loginstyle.css';
import expenseManagementImage from '../images/samsung-uk-n2FLiPRGaxk-unsplash.jpg';

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
      <div className="login-form">
        <h1 className="Login">Login to Apollo</h1>
        <p className="description">Welcome back, you've been missed!</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email" className='username'>Username</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              placeholder="Your@gmail.com" 
              onChange={handleInputChange} 
            />
          </div>
          <div className="input-group">
            <label htmlFor="password" className='password'>Password</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              placeholder="Your Password" 
              onChange={handleInputChange} 
            />
          </div>
          <button type="submit">Log In</button>
          <Link to="/signup" className="forgot-password">Don't have an account? Signup</Link>
        </form>
      </div>
      <div className="image-section">
        <img src={expenseManagementImage} alt="Expense Management" />
      </div>
    </div>
  );
}

export default Login;
