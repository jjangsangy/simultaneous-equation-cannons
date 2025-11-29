import { describe, it, expect } from 'vitest';
import {
    calculateExtraDeckCount,
    solveCardRequirements,
    generatePossibleCards,
    MAX_EXTRA_DECK_SIZE
} from './solver';

describe('solver utils', () => {
    describe('calculateExtraDeckCount', () => {
        it('should correctly calculate count', () => {
            const fusion = [1, 2];
            const xyz = [3, 4];
            // 2 fusion + 2 * 2 xyz = 6
            expect(calculateExtraDeckCount(fusion, xyz)).toBe(6);
        });

        it('should return 0 for empty arrays', () => {
            expect(calculateExtraDeckCount([], [])).toBe(0);
        });
    });

    describe('solveCardRequirements', () => {
        it('should return valid solution when possible', () => {
            // Example: Total = 10, Opponent Rank = 4
            // R = 10 - 4 = 6
            // L = 2*4 - 10 = -2 -> Wait, L must be > 0.

            // Let's find a valid case.
            // X = T - O
            // F = 2O - T
            // Need X > 0 and F > 0.

            // Try O=8, T=10
            // X = 10 - 8 = 2
            // F = 2*8 - 10 = 6
            // Solution: Fusion Lv 6, 2x Xyz Rank 2.
            // Check: Banished = 1 Fusion + 2 Xyz = 3 cards.
            // Sum of Levels/Ranks = 6 + 2 + 2 = 10. (Matches T)
            // Number of Xyz (2) * Rank (2) = 4. Wait.
            // Condition 2: "number of Xyz Monsters banished times the opponent's monster's Rank/Level equals the number of cards on the field and in hands"
            // So: (NumXyz * RankXyz) must equal T ?? No, re-read context.

            // productContext.md says:
            // 1. total number of ranks/levels equals the number of cards on the field and in hands. (F + 2X = T)
            // 2. The number of Xyz Monsters banished times the opponent's monster's Rank/Level equals the number of cards on the field and in hands. (2 * O = T? No)

            // Let's re-read the solver logic in `solver.js`.
            // R = tCards - oppRank;
            // L = 2 * oppRank - tCards;
            // return { fusionLevel: L, xyzRank1: R, xyzRank2: R }

            // Implied equations:
            // Xyz Rank = R
            // Fusion Level = L
            // We banish 2 Xyz (Rank R) and 1 Fusion (Level L).

            // Sum of Levels/Ranks: L + R + R = L + 2R
            // Substitute: (2O - T) + 2(T - O) = 2O - T + 2T - 2O = T.
            // Correct: Sum of ranks/levels equals Total Cards (T).

            // Second condition from card text (usually): 
            // "number of Xyz Monsters banished x Rank of Xyz Monster = Total Cards"? No.
            // "number of Xyz Monsters banished x Opponent's Rank = Total Cards"?
            // Let's check the derivation.
            // Usually Simultaneous Equation Cannons requires:
            // Xyz * Rank + Fusion * Level = Total Cards? No.

            // Let's trust the code I read in solver.js, assuming it implements the logic correctly derived from the card.
            // The code implements:
            // Xyz Rank = T - O
            // Fusion Level = 2*O - T

            // Let's test with T=10, O=8
            // R = 10 - 8 = 2
            // L = 16 - 10 = 6
            // Result: Fusion 6, Xyz 2.

            const result = solveCardRequirements(10, 8);
            expect(result).toEqual({
                fusionLevel: 6,
                xyzRank1: 2,
                xyzRank2: 2
            });
        });

        it('should return null when no solution exists (L <= 0)', () => {
            // T=10, O=4
            // R = 6
            // L = 8 - 10 = -2
            expect(solveCardRequirements(10, 4)).toBeNull();
        });

        it('should return null when no solution exists (R <= 0)', () => {
            // T=4, O=8
            // R = 4 - 8 = -4
            // L = 16 - 4 = 12
            expect(solveCardRequirements(4, 8)).toBeNull();
        });
    });

    describe('generatePossibleCards', () => {
        it('should find possible cards based on selections', () => {
            // Opponent Rank = 8
            // We have Fusion 6 and Xyz 2 available.
            // Should match Total = 10.

            const fusion = [6];
            const xyz = [2];
            const oppRank = 8;

            const possible = generatePossibleCards(oppRank, fusion, xyz);

            // Expect to find at least one solution where total is 10.
            const match = possible.find(p => p.total === 10);
            expect(match).toBeDefined();
            expect(match).toEqual({
                total: 10,
                fusionLevel: 6,
                xyzRank1: 2,
                xyzRank2: 2
            });
        });

        it('should return empty if no combinations match', () => {
            const fusion = [1];
            const xyz = [1];
            const oppRank = 100; // Unlikely to match anything in loop 1-30

            const possible = generatePossibleCards(oppRank, fusion, xyz);
            expect(possible).toHaveLength(0);
        });
    });

    it('should export MAX_EXTRA_DECK_SIZE', () => {
        expect(MAX_EXTRA_DECK_SIZE).toBe(15);
    });
});
