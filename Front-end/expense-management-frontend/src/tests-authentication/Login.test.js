import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../components/Login';
import { BrowserRouter } from 'react-router-dom';

// Test case 1: Render check for Login
test('renders Login component', () => {
  render(
    <BrowserRouter><Login /></BrowserRouter>
  );
  
  expect(screen.getByPlaceholderText('Your@gmail.com')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Your Password')).toBeInTheDocument();
  expect(screen.getByText('Log In')).toBeInTheDocument();
});

// Test case 2: Form submission check for Login
test('allows the user to login successfully', () => {
  render(
    <BrowserRouter><Login /></BrowserRouter>
  );
  
  // Simulate user typing an email and password
  fireEvent.change(screen.getByPlaceholderText('Your@gmail.com'), {
    target: { value: 'test@example.com' },
  });
  fireEvent.change(screen.getByPlaceholderText('Your Password'), {
    target: { value: 'password' },
  });

  // Simulate form submission
  fireEvent.click(screen.getByText('Log In'));

});
