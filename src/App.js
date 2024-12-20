import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
    const [totalCards, setTotalCards] = useState(() => {
        return Number(localStorage.getItem("totalCards")) || 0;
    });
    const [opponentMonsterRankOrLevel, setOpponentMonsterRankOrLevel] = useState(() => {
        return Number(localStorage.getItem("opponentMonsterRankOrLevel")) || 0;
    });
    const [selectedFusionLevels, setSelectedFusionLevels] = useState(() => {
        return JSON.parse(localStorage.getItem("selectedFusionLevels")) || [];
    });
    const [selectedXyzRanks, setSelectedXyzRanks] = useState(() => {
        return JSON.parse(localStorage.getItem("selectedXyzRanks")) || [];
    });
    const [calculationResult, setCalculationResult] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    const levels = Array.from({ length: 12 }, (_, i) => i + 1);
    const MAX_EXTRA_DECK_SIZE = 15;

    const calculateExtraDeckCount = () =>
        selectedFusionLevels.length + selectedXyzRanks.length * 2;

    const solveCardRequirements = (totalCards, opponentMonsterRankOrLevel) => {
        const R = totalCards - opponentMonsterRankOrLevel;
        const L = 2 * opponentMonsterRankOrLevel - totalCards;

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

    const handleFusionLevelToggle = (level) => {
        if (selectedFusionLevels.includes(level)) {
            setSelectedFusionLevels((prev) => prev.filter((l) => l !== level));
            setErrorMessage("");
        } else {
            if (calculateExtraDeckCount() < MAX_EXTRA_DECK_SIZE) {
                setSelectedFusionLevels((prev) => [...prev, level]);
                setErrorMessage("");
            } else {
                setErrorMessage("Extra Deck limit exceeded! Maximum 15 cards allowed.");
            }
        }
    };

    const handleXyzRankToggle = (rank) => {
        if (selectedXyzRanks.includes(rank)) {
            setSelectedXyzRanks((prev) => prev.filter((r) => r !== rank));
            setErrorMessage("");
        } else {
            if (calculateExtraDeckCount() + 2 <= MAX_EXTRA_DECK_SIZE) {
                setSelectedXyzRanks((prev) => [...prev, rank]);
                setErrorMessage("");
            } else {
                setErrorMessage("Extra Deck limit exceeded! Maximum 15 cards allowed.");
            }
        }
    };

    useEffect(() => {
        const result = solveCardRequirements(totalCards, opponentMonsterRankOrLevel);

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
    }, [totalCards, opponentMonsterRankOrLevel, selectedFusionLevels, selectedXyzRanks]);

    // Save to localStorage whenever the state changes
    useEffect(() => {
        localStorage.setItem("totalCards", totalCards);
        localStorage.setItem("opponentMonsterRankOrLevel", opponentMonsterRankOrLevel);
        localStorage.setItem("selectedFusionLevels", JSON.stringify(selectedFusionLevels));
        localStorage.setItem("selectedXyzRanks", JSON.stringify(selectedXyzRanks));
    }, [totalCards, opponentMonsterRankOrLevel, selectedFusionLevels, selectedXyzRanks]);

    return (
        <div className="app">
            <h1 className="title">Simultaneous Equation Cannons</h1>

            <div className="input-section">
                <div className="input-group">
                    <label>Total Cards (in both hands and on the field):</label>
                    <input
                        type="number"
                        value={totalCards}
                        onChange={(e) => setTotalCards(Number(e.target.value))}
                    />
                </div>

                <div className="input-group">
                    <label>Opponent Monster Rank/Level:</label>
                    <input
                        type="number"
                        value={opponentMonsterRankOrLevel}
                        onChange={(e) => setOpponentMonsterRankOrLevel(Number(e.target.value))}
                    />
                </div>
            </div>

            <div className="selection-section">
                <div className="selection-group">
                    <h3>Select Fusion Levels:</h3>
                    <div className="level-buttons">
                        {levels.map((level) => (
                            <button
                                key={`fusion-${level}`}
                                className={selectedFusionLevels.includes(level) ? "selected" : ""}
                                onClick={() => handleFusionLevelToggle(level)}
                            >
                                {level}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="selection-group">
                    <h3>Select Xyz Ranks:</h3>
                    <div className="level-buttons">
                        {levels.map((rank) => (
                            <button
                                key={`xyz-${rank}`}
                                className={selectedXyzRanks.includes(rank) ? "selected" : ""}
                                onClick={() => handleXyzRankToggle(rank)}
                            >
                                {rank}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="result-section">
                {calculationResult ? (
                    <div className="result">
                        <h3>Calculation Result:</h3>
                        <p><strong>Fusion Level:</strong> {calculationResult.fusionLevel}</p>
                        <p><strong>Xyz Rank 1:</strong> {calculationResult.xyzRank1}</p>
                        <p><strong>Xyz Rank 2:</strong> {calculationResult.xyzRank2}</p>
                    </div>
                ) : selectedFusionLevels.length === 0 || selectedXyzRanks.length === 0 ? (
                    <p className="no-selection">Please select at least one Fusion Level and one XYZ Rank.</p>
                ) : (
                    <p className="no-result">No valid solution found with the selected parameters.</p>
                )}
            </div>

            <div className="error-message">{errorMessage && <p>{errorMessage}</p>}</div>

            <div className="deck-count">
                <p>
                    Total Cards in Extra Deck: <strong>{calculateExtraDeckCount()}</strong> /{" "}
                    {MAX_EXTRA_DECK_SIZE}
                </p>
            </div>
        </div>
    );
}

export default App;
