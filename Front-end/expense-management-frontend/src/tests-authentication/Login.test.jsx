import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from './Login';

test('form submission calls the handleSubmit function', () => {
  render(<Login />);
  const usernameInput = screen.getByPlaceholderText('Enter username');
  const passwordInput = screen.getByPlaceholderText('Password');
  const signInButton = screen.getByText('Sign In');

  const mockSubmit = jest.fn();
  const originalFetch = global.fetch;
  global.fetch = () => Promise.resolve({ ok: true, text: () => 'some-key' });

  Login.prototype.handleSubmit = mockSubmit; 

  fireEvent.change(usernameInput, { target: { value: 'testuser' } });
  fireEvent.change(passwordInput, { target: { value: 'password' } });
  fireEvent.click(signInButton);

  expect(mockSubmit).toHaveBeenCalled();

  global.fetch = originalFetch;
});

test('renders login form with input fields and submit button', () => {
  render(<Login />);
  const usernameInput = screen.getByPlaceholderText('Enter username');
  const passwordInput = screen.getByPlaceholderText('Password');
  const signInButton = screen.getByText('Sign In');

  expect(usernameInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(signInButton).toBeInTheDocument();
});