import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../components/Login';
import { BrowserRouter } from 'react-router-dom';

// Test case 1: Render check for Login
test('renders Login component', () => {
  render(
    <BrowserRouter><Login /></BrowserRouter>
  );
  expect(screen.getByPlaceholderText('Enter username')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
  expect(screen.getByText('Sign In')).toBeInTheDocument();
});

// Test case 2: Form submission check for Login
test('allows the user to login successfully', () => {
  render(
    <BrowserRouter><Login /></BrowserRouter>
  );
  
  // Simulate user typing an email and password
  fireEvent.change(screen.getByPlaceholderText('Enter username'), {
    target: { value: 'test@example.com' },
  });
  fireEvent.change(screen.getByPlaceholderText('Password'), {
    target: { value: 'password' },
  });

  // Simulate form submission
  fireEvent.click(screen.getByText('Sign In'));
  
  // Assertions can be more specific based on what happens on form submit
  // For example, checking if a function is called or if navigation occurs
});