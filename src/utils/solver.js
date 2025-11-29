export const MAX_EXTRA_DECK_SIZE = 15;

export const calculateExtraDeckCount = (selectedFusionLevels, selectedXyzRanks) =>
    selectedFusionLevels.length + selectedXyzRanks.length * 2;

export const solveCardRequirements = (tCards, oppRank) => {
    const R = tCards - oppRank;
    const L = 2 * oppRank - tCards;

    if (R > 0 && L > 0) {
        return {
            fusionLevel: L,
            xyzRank1: R,
            xyzRank2: R,
        };
    } else {
        return null;
    }
};

export const generatePossibleCards = (oppRank, selectedFusionLevels, selectedXyzRanks) => {
    const possibleCards = [];
    for (let total = 1; total <= 30; total++) {
        const result = solveCardRequirements(total, oppRank);
        if (
            result &&
            selectedFusionLevels.includes(result.fusionLevel) &&
            selectedXyzRanks.includes(result.xyzRank1)
        ) {
            possibleCards.push({ total, ...result });
        }
    }
    return possibleCards;
};
