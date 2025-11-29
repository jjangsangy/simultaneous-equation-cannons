import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ExtraDeckSelector from './ExtraDeckSelector';

describe('ExtraDeckSelector', () => {
    const defaultProps = {
        selectedFusionLevels: [],
        handleFusionLevelToggle: vi.fn(),
        selectedXyzRanks: [],
        handleXyzRankToggle: vi.fn(),
        extraDeckCount: 0,
        maxExtraDeckSize: 15,
        clearSelections: vi.fn(),
        errorMessage: '',
    };

    it('renders all fusion levels and xyz ranks', () => {
        render(<ExtraDeckSelector {...defaultProps} />);
        
        // 12 fusion buttons + 12 xyz buttons = 24 buttons
        // + 1 clear button = 25 buttons
        const buttons = screen.getAllByRole('button');
        // We can't rely on exact count easily because LevelButton might be used elsewhere? 
        // No, in this component only.
        
        // Check for specific text content
        expect(screen.getByText('Select Fusion Levels')).toBeInTheDocument();
        expect(screen.getByText('Select Xyz Ranks')).toBeInTheDocument();
        
        // We have two '1' buttons, two '2' buttons etc.
        const ones = screen.getAllByText('1');
        expect(ones).toHaveLength(2);
    });

    it('displays extra deck count', () => {
        render(<ExtraDeckSelector {...defaultProps} extraDeckCount={5} />);
        expect(screen.getByText('5 / 15 Cards')).toBeInTheDocument();
    });

    it('handles button clicks', () => {
        render(<ExtraDeckSelector {...defaultProps} />);
        
        const ones = screen.getAllByText('1');
        // First one is fusion (based on order in code)
        fireEvent.click(ones[0]);
        expect(defaultProps.handleFusionLevelToggle).toHaveBeenCalledWith(1);
        
        // Second one is xyz
        fireEvent.click(ones[1]);
        expect(defaultProps.handleXyzRankToggle).toHaveBeenCalledWith(1);
    });

    it('calls clearSelections', () => {
        render(<ExtraDeckSelector {...defaultProps} />);
        
        const clearBtn = screen.getByText('Clear Selections');
        fireEvent.click(clearBtn);
        expect(defaultProps.clearSelections).toHaveBeenCalled();
    });

    it('displays error message', () => {
        render(<ExtraDeckSelector {...defaultProps} errorMessage="Limit Exceeded" />);
        expect(screen.getByText('Limit Exceeded')).toBeInTheDocument();
    });
});
