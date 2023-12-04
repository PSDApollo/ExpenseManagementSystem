import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';

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

const BackToDashboardButton = styled(Button)({
  marginTop: '20px',
  width: '100%',
  backgroundColor: '#1976D2',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#135589',
  },
});

const SaveChangesButton = styled(Button)({
  marginTop: '15px',
  width: '100%',
  backgroundColor: '#4CAF50',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#45a049',
  },
});

const Profile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: '',
    email: '',
    expenseLimit: 1000,
  });

  const [isEditing, setEditing] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:9111/users?email=' +  localStorage.getItem('email'));
        const userData = await response.json();

        if (userData.length > 0) {
          setUser({
            name: userData[0].profileName,
            email: userData[0].email,
            expenseLimit: userData[0].expenseLimit,
          });
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleProfileUpdate = async () => {
    try {
      const updatedUserData = {
        profileName: user.name,
        email: user.email,
        expenseLimit: parseFloat(user.expenseLimit) || 0,
      };

      const response = await fetch('http://localhost:9111/users/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : localStorage.getItem('myKey')
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
    <div className="expense-list-container">
    <Paper elevation={5} style={{ maxWidth: '600px', margin: 'auto', padding: '40px', borderRadius: '10px', backgroundColor: '#fff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <Typography variant="h4" align="center" gutterBottom>
        {isEditing ? 'Edit Profile' : 'Profile Information'}
      </Typography>
      {/* <StyledLink onClick={() => navigate('/dashboard')}>
        <FaArrowLeft style={{ marginRight: '5px', fontSize: '1.2em' }} />
        Back to Dashboard
      </StyledLink> */}
      <Box display="flex" flexDirection="column" alignItems="stretch" mt={4}>
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
              disabled={true}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              style={{ marginBottom: '10px' }}
            />
            <TextField
              label="Expense Limit"
              variant="outlined"
              fullWidth
              margin="normal"
              value={user.expenseLimit}
              onChange={(e) => setUser({ ...user, expenseLimit: parseFloat(e.target.value) || 0 })}
              style={{ marginBottom: '10px' }}
            />
            <SaveChangesButton variant="contained" onClick={handleProfileUpdate}>
              Save Changes
            </SaveChangesButton>
          </form>
        ) : (
          <>
            <Typography variant="body1" gutterBottom>
              <strong>Name:</strong> {user.name}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Email:</strong> {user.email}
            </Typography>
            <Typography variant="body1">
              <strong>Expense Limit:</strong> {user.expenseLimit}
            </Typography>
            <BackToDashboardButton variant="contained" onClick={() => setEditing(true)}>
              Edit Profile
            </BackToDashboardButton>
          </>
        )}
      </Box>
      <Box textAlign="center" mt={2}>
          <Link to="/dashboard">
            <button variant="contained" className="action-btn" style={{ width: '200px' }}>
              Back to Dashboard
            </button>
          </Link>
        </Box>
    </Paper>
    </div>
  );
};

export default Profile;