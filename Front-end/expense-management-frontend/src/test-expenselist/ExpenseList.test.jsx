import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import ExpenseList from '../components/ExpenseList'; // Adjust the import path as needed

// Mock the localStorage getItem function
Storage.prototype.getItem = jest.fn();

// Mock the fetch function
global.fetch = jest.fn();

describe('ExpenseList Component', () => {
  beforeEach(() => {
    Storage.prototype.getItem.mockClear();
    global.fetch.mockClear();
  });

  it('fetches and displays expenses when the key is present in localStorage', async () => {
    // Mock a key in localStorage
    Storage.prototype.getItem.mockReturnValue('myMockedKey');

    // Mock a successful API response
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [{ id: 1, name: 'Expense 1', description: 'Description 1', amount: 100, expense_date: '2023-10-27' }],
    });

    render(<ExpenseList />);

    // Wait for the data to be loaded and displayed
    await waitFor(() => {
      expect(screen.getByText('Expense 1')).toBeInTheDocument();
      expect(screen.getByText('Description 1')).toBeInTheDocument();
      expect(screen.getByText('100')).toBeInTheDocument();
      expect(screen.getByText('2023-10-27')).toBeInTheDocument();
    });

    // Ensure that the fetch function was called with the correct URL and headers
    expect(fetch).toHaveBeenCalledWith('https://15af-2600-6c40-75f0-ffc0-dc90-95b4-5282-a6e0.ngrok-free.app/expenses', {
      method: 'GET',
      headers: {
        'Authorization': 'myMockedKey',
      }
    });
  });

  it('handles the case where the key is missing in localStorage', async () => {
    // Mock a missing key in localStorage
    Storage.prototype.getItem.mockReturnValue(null);

    render(<ExpenseList />);

    // Ensure that the "Key not found in local storage" message is displayed
    await waitFor(() => {
      expect(screen.getByText('Key not found in local storage')).toBeInTheDocument();
    });

    // Ensure that fetch was not called
    expect(fetch).not.toHaveBeenCalled();
  });
});
