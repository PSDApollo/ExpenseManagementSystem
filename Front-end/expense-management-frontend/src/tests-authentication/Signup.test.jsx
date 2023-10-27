import React from 'react';
import { render, screen } from '@testing-library/react';
import Signup from './Signup';

test('renders signup form with input fields and submit button', () => {
  render(<Signup />);
  const nameInput = screen.getByLabelText('Name:');
  const emailInput = screen.getByLabelText('Email:');
  const passwordInput = screen.getByLabelText('Password:');
  const signupButton = screen.getByText('Signup');

  expect(nameInput).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(signupButton).toBeInTheDocument();
});

test('form submission calls the handleSubmit function', () => {
  render(<Signup />);
  const nameInput = screen.getByLabelText('Name:');
  const emailInput = screen.getByLabelText('Email:');
  const passwordInput = screen.getByLabelText('Password:');
  const signupButton = screen.getByText('Signup');

  const mockSubmit = jest.fn();
  const originalFetch = global.fetch;
  global.fetch = () => Promise.resolve({ ok: true });

  Signup.prototype.handleSubmit = mockSubmit; // Mock the handleSubmit function

  fireEvent.change(nameInput, { target: { value: 'John Doe' } });
  fireEvent.change(emailInput, { target: { value: 'johndoe@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'secretpassword' } });
  fireEvent.click(signupButton);

  expect(mockSubmit).toHaveBeenCalled();

  global.fetch = originalFetch;
});