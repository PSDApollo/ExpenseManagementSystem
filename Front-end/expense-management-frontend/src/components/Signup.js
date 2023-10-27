import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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

    // const handleSubmit = () => {
    //     const payload = {
    //         email: userInfo.email,
    //         password: userInfo.password,
    //         profile_name: userInfo.profile_name
    //     };

    
    //     fetch('https://15af-2600-6c40-75f0-ffc0-dc90-95b4-5282-a6e0.ngrok-free.app/register', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(payload),
    //     })
    //     .then(res => res.json())
    //     .then(data => {
    //         if (data.success) {
    //             navigate('/');
    //         } else {
    //             alert('Signup failed!');
    //         }
    //     })
    //     .catch(error => {
    //         console.error('Signup Error:', error);
    //     });
    // };
    const handleSubmit = () => {
        const payload = {
            email: userInfo.email,
            password: userInfo.password,
            profile_name: userInfo.profile_name
        };
    
        fetch('https://15af-2600-6c40-75f0-ffc0-dc90-95b4-5282-a6e0.ngrok-free.app/register', {
          method: 'POST',
          origin: 'http://localhost:3000/',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        })
          .then((response) => {
            if (response.ok) {
              console.log('User added!');
              window.alert('User Registered Successfully.');
              navigate('/');
            } else {
              window.alert('Already User Exists!.');
              navigate('/signup')
            }
          })
          .catch((error) => {
            console.error(error);
          });
      };

    return (
        <>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
            <link href="https://fonts.googleapis.com/css2?family=Alumni+Sans+Collegiate+One&family=Black+Ops+One&display=swap" rel="stylesheet" />

            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
            <link href="https://fonts.googleapis.com/css2?family=Pixelify+Sans&display=swap" rel="stylesheet" />

            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
            <link href="https://fonts.googleapis.com/css2?family=Russo+One&display=swap" rel="stylesheet" />
            <div className="signup-container">
                <div className="left-section">
                    <div className="tagline">
                        PLAN.<br />
                        TRACK.<br />
                        THRIVE.<br />
                        EXPENSE MANAGEMENT THE APOLLO WAY!
                    </div>
                </div>
                <div className="right-section">
                    <h1>Signup</h1>
                    <form>
                        <label>Name:
                            <input type="text" name="profile_name" onChange={handleInputChange} />
                        </label><br />
                        <label>Email:
                            <input type="email" name="email" onChange={handleInputChange} />
                        </label><br />
                        <label>Password:
                            <input type="password" name="password" onChange={handleInputChange} />
                        </label><br />
                        <button type="button" onClick={handleSubmit}>Signup</button>
                    </form>
                    <p>Already have an account? <Link to="/">Login</Link></p>
                </div>
            </div>
        </>
    );
}


export default Signup;