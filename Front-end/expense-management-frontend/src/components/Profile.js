import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Select, MenuItem, Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { styled } from '@mui/system';

const StyledLink = styled('a')({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  color: '#1976D2',
  transition: 'color 0.3s ease',

  '&:hover': {
    color: '#135589',
  },
});

const Profile = () => {
  const navigate = useNavigate();

  // State to manage user data and selected currency
  const [user, setUser] = useState({
    name: '',
    email: '',
    expenseLimit: 1000,
  });

  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [isEditing, setEditing] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:9111/users?email=chanakfya@gmail.com');
        const userData = await response.json();

        if (userData.length > 0) {
          setUser({
            name: userData[0].profileName,
            email: userData[0].email,
            expenseLimit: 1000,
          });
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    // Call the function to fetch user data
    fetchUserData();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value);
  };

  const handleProfileUpdate = async () => {
    try {
      const updatedUserData = {
        name: user.name,
        email: user.email,
        expenseLimit: user.expenseLimit,
      };

      const response = await fetch('http://localhost:9111/users/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUserData),
      });

      if (response.ok) {
        console.log('Profile updated successfully');
      } else {
        console.error('Error updating profile:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setEditing(false);
    }
  };

  return (
    <Paper elevation={3} style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
      <Typography variant="h4" align="center" gutterBottom>
        {isEditing ? 'Edit Profile' : 'Profile Information'}
      </Typography>
      <StyledLink onClick={() => navigate('/dashboard')}>
        <FaArrowLeft style={{ marginRight: '5px' }} />
        Back to Dashboard
      </StyledLink>
      <Box display="flex" flexDirection="column" alignItems="stretch">
        {isEditing ? (
          <form style={{ width: '100%' }}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              style={{ marginBottom: '10px' }}
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              style={{ marginBottom: '10px' }}
            />
            <Box display="flex" justifyContent="space-between" alignItems="center" marginY="10px">
              <Typography variant="body1" style={{ flex: 1 }}>
                <strong>Currency:</strong>
              </Typography>
              <Select value={selectedCurrency} onChange={handleCurrencyChange} style={{ width: '150px' }}>
                <MenuItem value="USD">USD</MenuItem>
                <MenuItem value="EUR">EUR</MenuItem>
                <MenuItem value="INR">INR</MenuItem>
                {/* Add other currency options */}
              </Select>
            </Box>
            <TextField
              label="Expense Limit"
              variant="outlined"
              fullWidth
              margin="normal"
              value={user.expenseLimit}
              onChange={(e) => setUser({ ...user, expenseLimit: e.target.value })}
              style={{ marginBottom: '10px' }}
            />
            <Button variant="contained" onClick={handleProfileUpdate} style={{ marginTop: '15px', width: '100%' }}>
              Save Changes
            </Button>
          </form>
        ) : (
          <>
            <Typography variant="body1" gutterBottom>
              <strong>Name:</strong> {user.name}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Email:</strong> {user.email}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Currency:</strong> {selectedCurrency}
            </Typography>
            <Typography variant="body1">
              <strong>Expense Limit:</strong> {user.expenseLimit} {selectedCurrency}
            </Typography>
            <Button variant="contained" onClick={() => setEditing(true)} style={{ marginTop: '15px', width: '100%' }}>
              Edit Profile
            </Button>
          </>
        )}
      </Box>
    </Paper>
  );
};

export default Profile;