import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useCalculator } from './useCalculator';

describe('useCalculator hook', () => {
    beforeEach(() => {
        // Clear localStorage before each test
        localStorage.clear();
        vi.restoreAllMocks();
    });

    it('should initialize with default values', () => {
        const { result } = renderHook(() => useCalculator());

        expect(result.current.totalCards).toBe(0);
        expect(result.current.opponentMonsterRankOrLevel).toBe(0);
        expect(result.current.selectedFusionLevels).toEqual([]);
        expect(result.current.selectedXyzRanks).toEqual([]);
        expect(result.current.calculationResult).toBeNull();
    });

    it('should update inputs', () => {
        const { result } = renderHook(() => useCalculator());

        act(() => {
            result.current.setTotalCards(10);
            result.current.setOpponentMonsterRankOrLevel(8);
        });

        expect(result.current.totalCards).toBe(10);
        expect(result.current.opponentMonsterRankOrLevel).toBe(8);
    });

    it('should toggle fusion levels', () => {
        const { result } = renderHook(() => useCalculator());

        // Add level 5
        act(() => {
            result.current.handleFusionLevelToggle(5);
        });
        expect(result.current.selectedFusionLevels).toContain(5);

        // Remove level 5
        act(() => {
            result.current.handleFusionLevelToggle(5);
        });
        expect(result.current.selectedFusionLevels).not.toContain(5);
    });

    it('should toggle xyz ranks', () => {
        const { result } = renderHook(() => useCalculator());

        // Add rank 4
        act(() => {
            result.current.handleXyzRankToggle(4);
        });
        expect(result.current.selectedXyzRanks).toContain(4);

        // Remove rank 4
        act(() => {
            result.current.handleXyzRankToggle(4);
        });
        expect(result.current.selectedXyzRanks).not.toContain(4);
    });

    it('should respect max extra deck size', () => {
        const { result } = renderHook(() => useCalculator());
        const MAX = result.current.MAX_EXTRA_DECK_SIZE; // 15

        // Fill with Xyz (each takes 2 slots)
        // 7 Xyz * 2 = 14 slots
        act(() => {
            for (let i = 1; i <= 7; i++) {
                result.current.handleXyzRankToggle(i);
            }
        });
        expect(result.current.calculateExtraDeckCount()).toBe(14);

        // Try to add one more Xyz (needs 2 slots, only 1 left)
        act(() => {
            result.current.handleXyzRankToggle(8);
        });
        // Should not add
        expect(result.current.selectedXyzRanks).not.toContain(8);
        expect(result.current.errorMessage).toBeTruthy();

        // But we can add a Fusion (needs 1 slot)
        act(() => {
            result.current.handleFusionLevelToggle(1);
        });
        expect(result.current.selectedFusionLevels).toContain(1);
        expect(result.current.calculateExtraDeckCount()).toBe(15);

        // Now full.
        act(() => {
            result.current.handleFusionLevelToggle(2);
        });
        expect(result.current.selectedFusionLevels).not.toContain(2);
    });

    it('should perform calculation when inputs are valid', () => {
        const { result } = renderHook(() => useCalculator());

        // Setup scenario: T=10, O=8 -> Fusion 6, Xyz 2 (x2)
        act(() => {
            result.current.setTotalCards(10);
            result.current.setOpponentMonsterRankOrLevel(8);
            result.current.handleFusionLevelToggle(6);
            result.current.handleXyzRankToggle(2);
        });

        expect(result.current.calculationResult).toEqual({
            fusionLevel: 6,
            xyzRank1: 2,
            xyzRank2: 2
        });
    });

    it('should clear selections', () => {
        const { result } = renderHook(() => useCalculator());

        act(() => {
            result.current.handleFusionLevelToggle(5);
            result.current.handleXyzRankToggle(4);
        });

        expect(result.current.selectedFusionLevels).toHaveLength(1);
        expect(result.current.selectedXyzRanks).toHaveLength(1);

        act(() => {
            result.current.clearSelections();
        });

        expect(result.current.selectedFusionLevels).toHaveLength(0);
        expect(result.current.selectedXyzRanks).toHaveLength(0);
    });

    it('should persist state to localStorage', () => {
        const { result, unmount } = renderHook(() => useCalculator());

        act(() => {
            result.current.setTotalCards(99);
        });

        // Verify it's in localStorage
        expect(localStorage.getItem('totalCards')).toBe('99');

        unmount();

        // New hook instance should read from localStorage
        const { result: newResult } = renderHook(() => useCalculator());
        expect(newResult.current.totalCards).toBe(99);
    });
});
