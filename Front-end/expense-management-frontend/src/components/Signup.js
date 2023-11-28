import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import expenseManagementImage from '../images/samsung-uk-n2FLiPRGaxk-unsplash.jpg';
import '../signupstyles.css';

function Signup() {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({
        email: '',      
        password: '',
        profile_name: '',
        confirmPassword: '' 
    });
    const [passwordError, setPasswordError] = useState(''); 

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserInfo({
            ...userInfo,
            [name]: value
        });

        if (name === 'confirmPassword' || name === 'password') {
            setPasswordError('');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Check if passwords match
        if (userInfo.password !== userInfo.confirmPassword) {
            setPasswordError('Passwords do not match');
            return;
        }
        setPasswordError('');

        const payload = {
            email: userInfo.email,
            password: userInfo.password,
            profile_name: userInfo.profile_name
        };
    
        fetch('http://localhost:9111/register', {
            method: 'POST',
            origin: 'http://localhost:3000/',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
        .then((response) => {
            console.log(response);
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
          console.error(error);
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
                placeholder="Enter Email" 
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
                name="confirmPassword" 
                placeholder="Retype Password" 
                onChange={handleInputChange} 
              />
              {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
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
