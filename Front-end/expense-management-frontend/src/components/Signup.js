import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import expenseManagementImage from '../images/pexels-cottonbro-studio-4629633.jpg';
import '../signupstyles.css';

function Signup() {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({
        email: '',      
        password: '',
        profile_name: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserInfo({
            ...userInfo,
            [name]: value
        });
    };

    const handleSubmit = () => {
        const payload = {
            email: userInfo.email,
            password: userInfo.password,
            profile_name: userInfo.profile_name
        };
    
        fetch('https://15af-2600-6c40-75f0-ffc0-dc90-95b4-5282-a6e0.ngrok-free.app/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
        .then((response) => {
            if (response.ok) {
                console.log('User added!');
                alert('User Registered Successfully.');
                navigate('/');
            } else {
                alert('Already User Exists!.');
                navigate('/signup')
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Signup failed. Please try again.');
        });
    };

    return (
        <div className="container">
          <div className="image-section">
            <img src={expenseManagementImage} alt="Expense Management" />
          </div>
          <div className="form-section color-section">
            <h1 data-testid='signup-header'>Signup Apollo!</h1>
            <form onSubmit={handleSubmit}>
              <input 
                type="text" 
                className="profile_name"
                name="profile_name" 
                placeholder="Full Name" 
                onChange={handleInputChange} 
              />
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
              <input 
                type="password" 
                className="password1"
                name="password1" 
                placeholder="Retype Password" 
                onChange={handleInputChange} 
              />
              <button type="submit" data-testid='signup-button'>Sign Up</button>
              <div className="signup-text">
                Already have an account? <Link to="/">Login</Link>
              </div>
            </form>
          </div>
        </div>
      );
    }

export default Signup;
