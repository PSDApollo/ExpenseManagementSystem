import { render, screen } from '@testing-library/react';
import BarChart from './BarChart';
import React from 'react'
import jsonData from './mockdata.json';
// import 'jest-canvas-mock';

class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  } 

function renderPage(){
  try {
    render(<BarChart />);
  } catch (error) {
    if(!expect(screen.getByTestId('graphical-dashboard').toBeInTheDocument())){
    console.error('An error occurred:', error);
    this.setState({ error });
    }
  }
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
  const linkElement = screen.getByText(`Total Expenses: `, { exact: false })
  expect(linkElement).toBeInTheDocument();
});

test('Verify currency dropdown is rendered', () => {
  window.ResizeObserver = ResizeObserver;
render(<BarChart />);
const linkElement = screen.getByText('Currency:');
expect(linkElement).toBeInTheDocument();
});

test('Verify USD is default for currency dropdown', () => {
  window.ResizeObserver = ResizeObserver;
render(<BarChart />);
const linkElement = screen.getByText('USD');
expect(linkElement).toBeInTheDocument();
});
