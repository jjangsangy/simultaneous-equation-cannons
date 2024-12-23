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
    const [isToggleOn, setIsToggleOn] = useState(() => {
        return JSON.parse(localStorage.getItem("isToggleOn")) || false;
    });

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

    const showErrorMessage = (message) => {
        setErrorMessage(message);

        // Clear the error message after 3 seconds
        setTimeout(() => {
            setErrorMessage("");
        }, 3000);
    };

    const handleFusionLevelToggle = (level) => {
        if (selectedFusionLevels.includes(level)) {
            // Deselect the level
            setSelectedFusionLevels((prev) => prev.filter((l) => l !== level));
        } else {
            if (calculateExtraDeckCount() < MAX_EXTRA_DECK_SIZE) {
                // Add the level
                setSelectedFusionLevels((prev) => [...prev, level]);
            } else {
                showErrorMessage("Extra Deck limit exceeded! Maximum 15 cards allowed.");
            }
        }
    };

    const handleXyzRankToggle = (rank) => {
        if (selectedXyzRanks.includes(rank)) {
            // Deselect the rank
            setSelectedXyzRanks((prev) => prev.filter((r) => r !== rank));
        } else {
            if (calculateExtraDeckCount() + 2 <= MAX_EXTRA_DECK_SIZE) {
                // Add the rank
                setSelectedXyzRanks((prev) => [...prev, rank]);
            } else {
                showErrorMessage("Extra Deck limit exceeded! Maximum 15 cards allowed.");
            }
        }
    };

    const generatePossibleCards = (opponentMonsterRankOrLevel) => {
        const possibleCards = [];
        for (let total = 1; total <= 30; total++) {
            const result = solveCardRequirements(total, opponentMonsterRankOrLevel);
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
        localStorage.setItem("isToggleOn", isToggleOn);
    }, [totalCards, opponentMonsterRankOrLevel, selectedFusionLevels, selectedXyzRanks, isToggleOn]);

    return (
        <div className="app">
            <h1 className="title">Simultaneous Equation Cannons Calculator</h1>

            <h2 className="section-title">Extra Deck</h2>
            <div className="selection-section">
                <div className="selection-group-box">
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

                    <div className="deck-count">
                        <p>
                            <strong>Total Cards in Extra Deck:</strong> {calculateExtraDeckCount()} / 15
                        </p>
                    </div>

                    <div className="error-message-container">
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                    </div>

                    <button
                        className="clear-button"
                        onClick={() => {
                            setSelectedFusionLevels([]);
                            setSelectedXyzRanks([]);
                            setErrorMessage(""); // Clear any existing error message
                        }}
                    >
                        Clear Selections
                    </button>
                </div>
            </div>

            <h2 className="section-title">Board State</h2>
            <div className="input-section">
                <div className="input-group">
                    <label>Total Cards:</label>
                    <input
                        type="number"
                        value={totalCards}
                        onChange={(e) => {
                            const value = Math.max(0, Number(e.target.value));
                            setTotalCards(value);
                        }}
                        disabled={isToggleOn}
                    />
                    <div className="button-group">
                        <button onClick={() => setTotalCards((prev) => Math.max(0, prev - 1))} disabled={isToggleOn}>-</button>
                        <button onClick={() => setTotalCards((prev) => prev + 1)} disabled={isToggleOn}>+</button>
                    </div>
                    <div className="button-group">
                        <button onClick={() => setIsToggleOn((prev) => !prev)} className="toggle-possible-cards">
                            {isToggleOn ? "On" : "Off"}
                        </button>
                    </div>
                </div>
                <div className="input-group">
                    <label>Opponent Monster Rank/Level:</label>
                    <input
                        type="number"
                        value={opponentMonsterRankOrLevel}
                        onChange={(e) => {
                            const value = Math.min(12, Math.max(0, Number(e.target.value)));
                            setOpponentMonsterRankOrLevel(value);
                        }}
                    />
                    <div className="button-group">
                        <button
                            onClick={() => setOpponentMonsterRankOrLevel((prev) => Math.max(0, prev - 1))}
                        >
                            -
                        </button>
                        <button
                            onClick={() => setOpponentMonsterRankOrLevel((prev) => Math.min(12, prev + 1))}
                        >
                            +
                        </button>
                    </div>

                </div>
            </div>

            <div className="result-section">
                {isToggleOn ? (
                    <div className="result">
                        <h3>Possible Cards:</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Total Cards</th>
                                    <th>Xyz Rank</th>
                                    <th>Xyz Rank</th>
                                    <th>Fusion Level</th>
                                </tr>
                            </thead>
                            <tbody>
                                {generatePossibleCards(opponentMonsterRankOrLevel).map((card, index) => (
                                    <tr key={index}>
                                        <td>{card.total}</td>
                                        <td>{card.xyzRank1}</td>
                                        <td>{card.xyzRank2}</td>
                                        <td>{card.fusionLevel}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : calculationResult ? (
                    <div className="result">
                        <h3>Combination:</h3>
                        <p><strong>Xyz Rank 1:</strong> {calculationResult.xyzRank1}</p>
                        <p><strong>Xyz Rank 2:</strong> {calculationResult.xyzRank2}</p>
                        <p><strong>Fusion Level:</strong> {calculationResult.fusionLevel}</p>
                    </div>
                ) : selectedFusionLevels.length === 0 || selectedXyzRanks.length === 0 ? (
                    <p className="no-selection">Please select at least one Fusion Level and one XYZ Rank.</p>
                ) : (
                    <p className="no-result">No valid solution found with the selected parameters.</p>
                )}
            </div>
        </div>
    );
}

export default App;
