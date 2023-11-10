import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Signup from '../components/Signup';

describe('Signup Component', () => {
    test('renders Signup header', () => {
        render(<BrowserRouter><Signup /></BrowserRouter>);
        const headerElement = screen.getByTestId('signup-header');
        expect(headerElement).toBeInTheDocument();
    });

    test('clicks Signup button', () => {
        render(<BrowserRouter><Signup /></BrowserRouter>);
        const signupButton = screen.getByTestId('signup-button');
        fireEvent.click(signupButton);
    });

});
