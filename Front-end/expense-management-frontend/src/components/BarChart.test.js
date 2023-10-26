import { render, screen } from '@testing-library/react';
import BarChart from './BarChart';
import React from 'react'

class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }

test('Verify Page is rendered', () => {
    window.ResizeObserver = ResizeObserver;
  render(<BarChart />);
  const currentMonth = new Date().toLocaleString('default', { month: 'long' });
  const linkElement = screen.getByText(`${currentMonth} Expenses`);
  expect(linkElement).toBeInTheDocument();
});

test('Verify total expenses are displayed', () => {
    window.ResizeObserver = ResizeObserver;
  render(<BarChart />);
  const linkElement = screen.getByText('Most spent on: ', { exact: false })
  expect(linkElement).toBeInTheDocument();
});

test('should show bar chart', () => {
  render(<BarChart />);
  const canvas = screen.getByRole('img');
  const ctx = canvas.getContext('2d');
  expect(ctx)
});
