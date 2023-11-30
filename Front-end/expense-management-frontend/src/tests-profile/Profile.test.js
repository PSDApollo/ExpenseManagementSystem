import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Profile from '../components/Profile';
describe('Profile component', () => {
  it('renders header and buttons', () => {
    render(
      <Router>
        <Profile />
      </Router>
    );

    // Check if the header is rendered
    expect(screen.getByText('Profile Information')).toBeInTheDocument();

    // Check if the "Logout" button is rendered
    expect(screen.getByText('Name:')).toBeInTheDocument();

    // Check if the welcome message is rendered
    expect(screen.getByText('Email:')).toBeInTheDocument();

    // Check if the "Add Expense" button is rendered
    expect(screen.getByText('Expense Limit:')).toBeInTheDocument();

    // Check if the "Expense Log" button is rendered
    expect(screen.getByText('Edit Profile')).toBeInTheDocument();

    // Check if the "Graphical Dashboard" button is rendered
    expect(screen.getByText('Back to Dashboard')).toBeInTheDocument();
  });
});
