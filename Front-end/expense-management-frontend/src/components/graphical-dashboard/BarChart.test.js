import { render, screen } from '@testing-library/react';
import BarChart from './BarChart';
import React from 'react'
import jsonData from './mockdata.json';
import 'jest-canvas-mock';

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

test('Verify Bar chart is rendered', () => {
  render(<BarChart />);
  const canvas = screen.getByRole('img');
  const ctx = canvas.getContext('2d');
  expect(ctx)
});

test('Verify Total expenses section is rendered', () => {
    window.ResizeObserver = ResizeObserver;
  render(<BarChart />);
  const linkElement = screen.getByText(`Total Expenses: $${jsonData.reduce((total, expense) => total + expense, 0)}`)
  expect(linkElement).toBeInTheDocument();
});


test('Verify Most spent section is rendered', () => {
    window.ResizeObserver = ResizeObserver;
  render(<BarChart />);
  const linkElement = screen.getByText('Most spent on: ', { exact: false })
  expect(linkElement).toBeInTheDocument();
});
