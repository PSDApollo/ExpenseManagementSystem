import React from 'react';
import { render, screen } from '@testing-library/react';
import ExpenseList from './ExpenseList.';

describe('ExpenseList', () => {
  it('renders the expense list heading', () => {
    render(<ExpenseList />);
    const heading = screen.getByRole('heading', { name: /expense list/i });
    expect(heading).toBeInTheDocument();
  });

  it('renders the expense table with data', () => {
    const expenses = [
      {
        id: 1,
        name: 'Rent',
        description: 'Monthly rent payment',
        amount: 1000,
        expense_date: '2023-11-01',
      },
      {
        id: 2,
        name: 'Groceries',
        description: 'Weekly grocery shopping',
        amount: 200,
        expense_date: '2023-11-05',
      },
    ];
    render(<ExpenseList />);
    expenses.forEach((expense) => {
      const name = screen.getByText(expense.name);
      const description = screen.getByText(expense.description);
      const amount = screen.getByText(expense.amount.toString());
      const date = screen.getByText('11/1/2023');
      expect(name).toBeInTheDocument();
      expect(description).toBeInTheDocument();
      expect(amount).toBeInTheDocument();
      expect(date).toBeInTheDocument();
    });
  });

  it('displays an error message if the API call fails', async () => {
    const errorMessage = 'Error fetching expenses';
    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.reject(new Error(errorMessage))
    );
    render(<ExpenseList />);
    const error = await screen.findByText(errorMessage);
    expect(error).toBeInTheDocument();
    console.error.mockRestore();
    global.fetch.mockRestore();
  });
});