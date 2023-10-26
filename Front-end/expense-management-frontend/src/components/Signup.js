// components/Signup.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style.css';

function Signup() {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({
        username: '',
        password: '',
        email: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserInfo({
            ...userInfo,
            [name]: value
        });
    };

    const handleSubmit = () => {
        fetch('backend-signup-url', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userInfo)
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                navigate('/login');
            } else {
                alert('Signup failed!');
            }
        })
        .catch(error => {
            console.error('Signup Error:', error);
        });
    };

    return (
        <div className="expense-add">
            <h1>Signup</h1>
            <form>
                <label>Username:
                    <input type="text" name="username" onChange={handleInputChange} />
                </label><br />
                <label>Email:
                    <input type="email" name="email" onChange={handleInputChange} />
                </label><br />
                <label>Password:
                    <input type="password" name="password" onChange={handleInputChange} />
                </label><br />
                <button type="button" onClick={handleSubmit}>Signup</button>
            </form>
        </div>
    );
}

export default Signup;
