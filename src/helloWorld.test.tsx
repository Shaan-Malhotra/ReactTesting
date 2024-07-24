import React from 'react';
import { render, screen } from '@testing-library/react';
import HelloWorld from './components/helloWorld';

test('renders Hello, world!', () => {
    render(<HelloWorld />);
    const element = screen.getByText(/Hello, world!/i);
    expect(element).toBeInTheDocument();
});
