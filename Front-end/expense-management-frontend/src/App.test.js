import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the login component', () => {
  render(<App />);


  const loginHeading = screen.getByText("Login to Apollo");
  expect(loginHeading).toBeInTheDocument();


  const emailInput = screen.getByPlaceholderText('Your@gmail.com');
  expect(emailInput).toBeInTheDocument();


  const passwordInput = screen.getByPlaceholderText('Your Password');
  expect(passwordInput).toBeInTheDocument();
});
