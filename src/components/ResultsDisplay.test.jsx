import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ResultsDisplay from './ResultsDisplay';

describe('ResultsDisplay', () => {
    it('renders instruction when no extra deck cards selected', () => {
        render(
            <ResultsDisplay
                isToggleOn={false}
                calculationResult={null}
                selectedFusionLevels={[]}
                selectedXyzRanks={[]}
                possibleCards={[]}
            />
        );
        expect(screen.getByText(/Please select at least one/)).toBeInTheDocument();
    });

    it('renders "No Valid Solution" when selections exist but no result', () => {
        render(
            <ResultsDisplay
                isToggleOn={false}
                calculationResult={null}
                selectedFusionLevels={[1]}
                selectedXyzRanks={[1]}
                possibleCards={[]}
            />
        );
        expect(screen.getByText('No Valid Solution')).toBeInTheDocument();
    });

    it('renders result when calculationResult is present', () => {
        const result = { fusionLevel: 6, xyzRank1: 2, xyzRank2: 2 };
        render(
            <ResultsDisplay
                isToggleOn={false}
                calculationResult={result}
                selectedFusionLevels={[6]}
                selectedXyzRanks={[2]}
                possibleCards={[]}
            />
        );
        expect(screen.getByText('Valid Solution Found')).toBeInTheDocument();
        expect(screen.getByText('6')).toBeInTheDocument();
        expect(screen.getAllByText('2')).toHaveLength(2);
    });

    it('renders table when toggle is on', () => {
        const possible = [
            { total: 10, fusionLevel: 6, xyzRank1: 2 },
            { total: 12, fusionLevel: 4, xyzRank1: 4 }
        ];
        render(
            <ResultsDisplay
                isToggleOn={true}
                calculationResult={null}
                selectedFusionLevels={[]}
                selectedXyzRanks={[]}
                possibleCards={possible}
            />
        );
        
        expect(screen.getByText('Possible Combinations')).toBeInTheDocument();
        expect(screen.getByText('10')).toBeInTheDocument();
        expect(screen.getByText('6')).toBeInTheDocument();
        expect(screen.getAllByText('4')).toHaveLength(2);
    });

    it('renders no combinations message when table is empty', () => {
        render(
            <ResultsDisplay
                isToggleOn={true}
                calculationResult={null}
                selectedFusionLevels={[]}
                selectedXyzRanks={[]}
                possibleCards={[]}
            />
        );
        expect(screen.getByText('No combinations possible with current selection.')).toBeInTheDocument();
    });
});
