import { useState, useEffect } from "react";
import {
    solveCardRequirements,
    generatePossibleCards as generatePossibleCardsUtil,
    calculateExtraDeckCount as calculateExtraDeckCountUtil,
    MAX_EXTRA_DECK_SIZE,
} from "../utils/solver";

export const useCalculator = () => {
    // State Initialization
    const [totalCards, setTotalCards] = useState(() => {
        try {
            const stored = localStorage.getItem("totalCards");
            return stored ? Number(stored) : 0;
        } catch {
            return 0;
        }
    });

    const [opponentMonsterRankOrLevel, setOpponentMonsterRankOrLevel] = useState(
        () => {
            try {
                const stored = localStorage.getItem("opponentMonsterRankOrLevel");
                return stored ? Number(stored) : 0;
            } catch {
                return 0;
            }
        }
    );

    const [selectedFusionLevels, setSelectedFusionLevels] = useState(() => {
        try {
            const stored = localStorage.getItem("selectedFusionLevels");
            return stored ? JSON.parse(stored) : [];
        } catch {
            return [];
        }
    });

    const [selectedXyzRanks, setSelectedXyzRanks] = useState(() => {
        try {
            const stored = localStorage.getItem("selectedXyzRanks");
            return stored ? JSON.parse(stored) : [];
        } catch {
            return [];
        }
    });

    const [calculationResult, setCalculationResult] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [isToggleOn, setIsToggleOn] = useState(() => {
        try {
            const stored = localStorage.getItem("isToggleOn");
            return stored ? JSON.parse(stored) : false;
        } catch {
            return false;
        }
    });

    // Effects for Persistence
    useEffect(() => {
        localStorage.setItem("totalCards", totalCards);
        localStorage.setItem(
            "opponentMonsterRankOrLevel",
            opponentMonsterRankOrLevel
        );
        localStorage.setItem(
            "selectedFusionLevels",
            JSON.stringify(selectedFusionLevels)
        );
        localStorage.setItem(
            "selectedXyzRanks",
            JSON.stringify(selectedXyzRanks)
        );
        localStorage.setItem("isToggleOn", JSON.stringify(isToggleOn));
    }, [
        totalCards,
        opponentMonsterRankOrLevel,
        selectedFusionLevels,
        selectedXyzRanks,
        isToggleOn,
    ]);

    // Main Calculation Effect
    useEffect(() => {
        const result = solveCardRequirements(
            totalCards,
            opponentMonsterRankOrLevel
        );

        if (
            result &&
            selectedFusionLevels.length > 0 &&
            selectedXyzRanks.length > 0 &&
            selectedFusionLevels.includes(result.fusionLevel) &&
            selectedXyzRanks.includes(result.xyzRank1)
        ) {
            setCalculationResult(result);
        } else {
            setCalculationResult(null);
        }
    }, [
        totalCards,
        opponentMonsterRankOrLevel,
        selectedFusionLevels,
        selectedXyzRanks,
    ]);

    const showErrorMessage = (message) => {
        setErrorMessage(message);
        setTimeout(() => {
            setErrorMessage("");
        }, 3000);
    };

    const calculateExtraDeckCount = () =>
        calculateExtraDeckCountUtil(selectedFusionLevels, selectedXyzRanks);

    const handleFusionLevelToggle = (level) => {
        if (selectedFusionLevels.includes(level)) {
            setSelectedFusionLevels((prev) => prev.filter((l) => l !== level));
        } else {
            if (calculateExtraDeckCount() + 1 <= MAX_EXTRA_DECK_SIZE) {
                setSelectedFusionLevels((prev) => [...prev, level]);
            } else {
                showErrorMessage(
                    "Extra Deck limit exceeded! Maximum 15 cards allowed."
                );
            }
        }
    };

    const handleXyzRankToggle = (rank) => {
        if (selectedXyzRanks.includes(rank)) {
            setSelectedXyzRanks((prev) => prev.filter((r) => r !== rank));
        } else {
            if (calculateExtraDeckCount() + 2 <= MAX_EXTRA_DECK_SIZE) {
                setSelectedXyzRanks((prev) => [...prev, rank]);
            } else {
                showErrorMessage(
                    "Extra Deck limit exceeded! Maximum 15 cards allowed."
                );
            }
        }
    };

    const clearSelections = () => {
        setSelectedFusionLevels([]);
        setSelectedXyzRanks([]);
        setErrorMessage("");
    };

    const generatePossibleCards = () =>
        generatePossibleCardsUtil(
            opponentMonsterRankOrLevel,
            selectedFusionLevels,
            selectedXyzRanks
        );

    return {
        totalCards,
        setTotalCards,
        opponentMonsterRankOrLevel,
        setOpponentMonsterRankOrLevel,
        selectedFusionLevels,
        selectedXyzRanks,
        calculationResult,
        errorMessage,
        isToggleOn,
        setIsToggleOn,
        handleFusionLevelToggle,
        handleXyzRankToggle,
        clearSelections,
        generatePossibleCards,
        calculateExtraDeckCount,
        MAX_EXTRA_DECK_SIZE,
    };
};
