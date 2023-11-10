import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Dashboard from '../components/Dashboard';

describe('Dashboard component', () => {
  it('renders header and buttons', () => {
    render(
      <Router>
        <Dashboard />
      </Router>
    );

    // Check if the header is rendered
    expect(screen.getByText('APOLLO')).toBeInTheDocument();

    // Check if the "Logout" button is rendered
    expect(screen.getByText('Logout')).toBeInTheDocument();

    // Check if the welcome message is rendered
    expect(screen.getByText('Welcome User!')).toBeInTheDocument();

    // Check if the "Add Expense" button is rendered
    expect(screen.getByText('Add Expense')).toBeInTheDocument();

    // Check if the "Expense Log" button is rendered
    expect(screen.getByText('Expense Log')).toBeInTheDocument();

    // Check if the "Graphical Dashboard" button is rendered
    expect(screen.getByText('Graphical Dashboard')).toBeInTheDocument();
  });
});
