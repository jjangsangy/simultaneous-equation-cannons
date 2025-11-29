import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App', () => {
    it('renders the application header', () => {
        render(<App />);
        expect(screen.getByRole('heading', { name: /Simultaneous Equation/i })).toBeInTheDocument();
    });

    it('renders all main sections', () => {
        render(<App />);
        expect(screen.getByText('Extra Deck')).toBeInTheDocument();
        expect(screen.getByText('Board State')).toBeInTheDocument();
        // Tutorial starts collapsed usually? Or maybe visible. 
        // Based on components, 'How to Use' might be visible.
        // Let's check for basic elements.
    });

    it('renders initial state correctly', () => {
        render(<App />);
        
        // Initial Total Cards: 0
        const inputs = screen.getAllByRole('spinbutton');
        expect(inputs[0]).toHaveValue(0); 
        
        // Initial Message
        expect(screen.getByText(/Please select at least one/)).toBeInTheDocument();
    });
});
