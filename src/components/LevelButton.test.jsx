import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import LevelButton from './LevelButton';

describe('LevelButton', () => {
    it('renders the value', () => {
        render(<LevelButton value={5} isSelected={false} onClick={() => {}} colorClass="bg-blue-500" />);
        expect(screen.getByText('5')).toBeInTheDocument();
    });

    it('calls onClick with value when clicked', () => {
        const handleClick = vi.fn();
        render(<LevelButton value={7} isSelected={false} onClick={handleClick} colorClass="bg-blue-500" />);
        
        fireEvent.click(screen.getByText('7'));
        expect(handleClick).toHaveBeenCalledWith(7);
    });

    it('applies active styles when selected', () => {
        render(<LevelButton value={3} isSelected={true} onClick={() => {}} colorClass="bg-red-500" />);
        const button = screen.getByText('3');
        expect(button.className).toContain('bg-red-500');
    });

    it('applies inactive styles when not selected', () => {
        render(<LevelButton value={3} isSelected={false} onClick={() => {}} colorClass="bg-red-500" />);
        const button = screen.getByText('3');
        expect(button.className).toContain('bg-slate-700');
    });
});
