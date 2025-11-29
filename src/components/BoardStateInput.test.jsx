import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import BoardStateInput from './BoardStateInput';

describe('BoardStateInput', () => {
    const defaultProps = {
        totalCards: 10,
        setTotalCards: vi.fn(),
        opponentMonsterRankOrLevel: 5,
        setOpponentMonsterRankOrLevel: vi.fn(),
        isToggleOn: false,
        setIsToggleOn: vi.fn(),
    };

    it('renders input fields with correct values', () => {
        render(<BoardStateInput {...defaultProps} />);
        
        // Use getAllByRole('spinbutton') to get number inputs
        const inputs = screen.getAllByRole('spinbutton');
        expect(inputs[0]).toHaveValue(10); // Total Cards
        expect(inputs[1]).toHaveValue(5);  // Opponent Rank
    });

    it('handles total cards increment/decrement', () => {
        render(<BoardStateInput {...defaultProps} />);
        
        // There are multiple + and - buttons.
        // We can target by text.
        // The first - is for total cards.
        const minusButtons = screen.getAllByText('-');
        const plusButtons = screen.getAllByText('+');
        
        fireEvent.click(plusButtons[0]);
        expect(defaultProps.setTotalCards).toHaveBeenCalledWith(11);
        
        fireEvent.click(minusButtons[0]);
        expect(defaultProps.setTotalCards).toHaveBeenCalledWith(9);
    });

    it('handles toggle switch click', () => {
        render(<BoardStateInput {...defaultProps} />);
        
        // Find the toggle button. It contains a span but is a button role.
        // It has text "Show all possible card combinations" nearby.
        // The button itself might be hard to select by text inside it (it has empty span).
        // Let's select by class or role.
        // There are 5 buttons total (-, +, -, +, Toggle).
        // The toggle is the last one? Or we can look for the one with switch role if it had one (it doesn't).
        
        const buttons = screen.getAllByRole('button');
        const toggleButton = buttons[buttons.length - 1]; // Assuming it's the last one in DOM order
        
        fireEvent.click(toggleButton);
        expect(defaultProps.setIsToggleOn).toHaveBeenCalledWith(true);
    });
    
    it('disables total cards input when toggle is on', () => {
        render(<BoardStateInput {...defaultProps} isToggleOn={true} />);
        
        const inputs = screen.getAllByRole('spinbutton');
        expect(inputs[0]).toBeDisabled();
        
        // Buttons should also be disabled
        const minusButtons = screen.getAllByText('-');
        expect(minusButtons[0]).toBeDisabled();
    });
});
