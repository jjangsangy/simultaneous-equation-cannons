import React, { useState, useEffect } from "react";

// Lucide React Icons
const Trash2 = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M3 6h18" />
        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
        <line x1="10" x2="10" y1="11" y2="17" />
        <line x1="14" x2="14" y1="11" y2="17" />
    </svg>
);

const Calculator = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <rect width="16" height="20" x="4" y="2" rx="2" />
        <line x1="8" x2="16" y1="6" y2="6" />
        <line x1="16" x2="16" y1="14" y2="18" />
        <path d="M16 10h.01" />
        <path d="M12 10h.01" />
        <path d="M8 10h.01" />
        <path d="M12 14h.01" />
        <path d="M8 14h.01" />
        <path d="M12 18h.01" />
        <path d="M8 18h.01" />
    </svg>
);

const Info = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4" />
        <path d="M12 8h.01" />
    </svg>
);

const App = () => {
    // State Initialization
    const [totalCards, setTotalCards] = useState(() => {
        try {
            const stored = localStorage.getItem("totalCards");
            return stored ? Number(stored) : 0;
        } catch { return 0; }
    });

    const [opponentMonsterRankOrLevel, setOpponentMonsterRankOrLevel] = useState(() => {
        try {
            const stored = localStorage.getItem("opponentMonsterRankOrLevel");
            return stored ? Number(stored) : 0;
        } catch { return 0; }
    });

    const [selectedFusionLevels, setSelectedFusionLevels] = useState(() => {
        try {
            const stored = localStorage.getItem("selectedFusionLevels");
            return stored ? JSON.parse(stored) : [];
        } catch { return []; }
    });

    const [selectedXyzRanks, setSelectedXyzRanks] = useState(() => {
        try {
            const stored = localStorage.getItem("selectedXyzRanks");
            return stored ? JSON.parse(stored) : [];
        } catch { return []; }
    });

    const [calculationResult, setCalculationResult] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [isToggleOn, setIsToggleOn] = useState(() => {
        try {
            const stored = localStorage.getItem("isToggleOn");
            return stored ? JSON.parse(stored) : false;
        } catch { return false; }
    });

    const levels = Array.from({ length: 12 }, (_, i) => i + 1);
    const MAX_EXTRA_DECK_SIZE = 15;

    // Effects for Persistence
    useEffect(() => {
        localStorage.setItem("totalCards", totalCards);
        localStorage.setItem("opponentMonsterRankOrLevel", opponentMonsterRankOrLevel);
        localStorage.setItem("selectedFusionLevels", JSON.stringify(selectedFusionLevels));
        localStorage.setItem("selectedXyzRanks", JSON.stringify(selectedXyzRanks));
        localStorage.setItem("isToggleOn", JSON.stringify(isToggleOn));
    }, [totalCards, opponentMonsterRankOrLevel, selectedFusionLevels, selectedXyzRanks, isToggleOn]);

    // Logic
    const calculateExtraDeckCount = () =>
        selectedFusionLevels.length + selectedXyzRanks.length * 2;

    const solveCardRequirements = (tCards, oppRank) => {
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

    const showErrorMessage = (message) => {
        setErrorMessage(message);
        setTimeout(() => {
            setErrorMessage("");
        }, 3000);
    };

    const handleFusionLevelToggle = (level) => {
        if (selectedFusionLevels.includes(level)) {
            setSelectedFusionLevels((prev) => prev.filter((l) => l !== level));
        } else {
            if (calculateExtraDeckCount() + 1 <= MAX_EXTRA_DECK_SIZE) {
                setSelectedFusionLevels((prev) => [...prev, level]);
            } else {
                showErrorMessage("Extra Deck limit exceeded! Maximum 15 cards allowed.");
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
                showErrorMessage("Extra Deck limit exceeded! Maximum 15 cards allowed.");
            }
        }
    };

    const generatePossibleCards = (oppRank) => {
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

    // Main Calculation Effect
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

    // Render Helpers
    const LevelButton = ({ value, isSelected, onClick, colorClass }) => (
        <button
            onClick={() => onClick(value)}
            className={`
        w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-md font-bold text-sm md:text-base transition-all duration-200
        ${isSelected
                    ? `${colorClass} text-slate-900 shadow-[0_0_15px_rgba(56,189,248,0.5)] scale-105`
                    : "bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white"
                }
      `}
        >
            {value}
        </button>
    );

    const extraDeckCount = calculateExtraDeckCount();
    const isOverLimit = extraDeckCount > MAX_EXTRA_DECK_SIZE;

    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-cyan-500 selection:text-white p-4 md:p-8">
            <div className="max-w-4xl mx-auto space-y-6">

                {/* Header */}
                <header className="flex items-center justify-between pb-6 border-b border-slate-700/50">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-cyan-500/10 rounded-xl">
                            <Calculator className="w-8 h-8 text-cyan-400" />
                        </div>
                        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
                            Simultaneous Equation <span className="text-cyan-400">Cannons</span>
                        </h1>
                    </div>
                </header>

                {/* Extra Deck Section */}
                <section className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-slate-200">Extra Deck</h2>
                        <div className={`text-sm font-semibold px-3 py-1 rounded-full ${isOverLimit ? 'bg-red-500/20 text-red-400' : 'bg-slate-800 text-slate-400'}`}>
                            {extraDeckCount} / {MAX_EXTRA_DECK_SIZE} Cards
                        </div>
                    </div>

                    <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
                        {/* Fusion Levels */}
                        <div className="mb-6">
                            <h3 className="text-sm uppercase tracking-wider font-semibold text-slate-400 mb-3">Select Fusion Levels</h3>
                            <div className="flex flex-wrap gap-2">
                                {levels.map((level) => (
                                    <LevelButton
                                        key={`fusion-${level}`}
                                        value={level}
                                        isSelected={selectedFusionLevels.includes(level)}
                                        onClick={handleFusionLevelToggle}
                                        colorClass="bg-cyan-400"
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Xyz Ranks */}
                        <div className="mb-8">
                            <h3 className="text-sm uppercase tracking-wider font-semibold text-slate-400 mb-3">Select Xyz Ranks</h3>
                            <div className="flex flex-wrap gap-2">
                                {levels.map((rank) => (
                                    <LevelButton
                                        key={`xyz-${rank}`}
                                        value={rank}
                                        isSelected={selectedXyzRanks.includes(rank)}
                                        onClick={handleXyzRankToggle}
                                        colorClass="bg-teal-400"
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Controls & Errors */}
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                            <button
                                onClick={() => {
                                    setSelectedFusionLevels([]);
                                    setSelectedXyzRanks([]);
                                    setErrorMessage("");
                                }}
                                className="flex items-center gap-2 px-5 py-2.5 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-lg transition-colors font-medium text-sm"
                            >
                                <Trash2 className="w-4 h-4" />
                                Clear Selections
                            </button>

                            {errorMessage && (
                                <div className="animate-pulse text-red-400 text-sm font-medium bg-red-950/30 px-4 py-2 rounded-lg border border-red-900/50">
                                    {errorMessage}
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* Board State Section */}
                <section className="space-y-4">
                    <h2 className="text-xl font-bold text-slate-200">Board State</h2>
                    <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                            {/* Total Cards Input */}
                            <div className="space-y-3">
                                <label className="text-sm font-medium text-slate-400 block">Total Cards (Field + Hand)</label>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => !isToggleOn && setTotalCards(Math.max(0, totalCards - 1))}
                                        disabled={isToggleOn}
                                        className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-700 hover:bg-slate-600 active:bg-slate-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-xl font-bold"
                                    >
                                        -
                                    </button>
                                    <input
                                        type="number"
                                        value={totalCards}
                                        onChange={(e) => setTotalCards(Math.max(0, Number(e.target.value)))}
                                        disabled={isToggleOn}
                                        className="w-full bg-slate-900 border border-slate-600 rounded-lg py-2 px-4 text-center text-xl font-mono focus:outline-none focus:ring-2 focus:ring-cyan-500 disabled:opacity-50"
                                    />
                                    <button
                                        onClick={() => !isToggleOn && setTotalCards(totalCards + 1)}
                                        disabled={isToggleOn}
                                        className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-700 hover:bg-slate-600 active:bg-slate-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-xl font-bold"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            {/* Opponent Rank Input */}
                            <div className="space-y-3">
                                <label className="text-sm font-medium text-slate-400 block">Opponent Monster Rank/Level</label>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => setOpponentMonsterRankOrLevel(Math.max(0, opponentMonsterRankOrLevel - 1))}
                                        className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-700 hover:bg-slate-600 active:bg-slate-500 transition-colors text-xl font-bold"
                                    >
                                        -
                                    </button>
                                    <input
                                        type="number"
                                        value={opponentMonsterRankOrLevel}
                                        onChange={(e) => setOpponentMonsterRankOrLevel(Math.min(12, Math.max(0, Number(e.target.value))))}
                                        className="w-full bg-slate-900 border border-slate-600 rounded-lg py-2 px-4 text-center text-xl font-mono focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                    />
                                    <button
                                        onClick={() => setOpponentMonsterRankOrLevel(Math.min(12, opponentMonsterRankOrLevel + 1))}
                                        className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-700 hover:bg-slate-600 active:bg-slate-500 transition-colors text-xl font-bold"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                        </div>

                        {/* Toggle Switch */}
                        <div className="mt-8 pt-6 border-t border-slate-700 flex items-center justify-between">
                            <div className="flex items-center gap-2 text-slate-400 text-sm">
                                <Info className="w-4 h-4" />
                                <span>Show all possible card combinations</span>
                            </div>
                            <button
                                onClick={() => setIsToggleOn(!isToggleOn)}
                                className={`
                  relative inline-flex h-8 w-16 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-900
                  ${isToggleOn ? 'bg-cyan-500' : 'bg-slate-700'}
                `}
                            >
                                <span
                                    className={`
                    inline-block h-6 w-6 transform rounded-full bg-white transition-transform duration-300
                    ${isToggleOn ? 'translate-x-9' : 'translate-x-1'}
                  `}
                                />
                            </button>
                        </div>
                    </div>
                </section>

                {/* Results Section */}
                <section className="space-y-4">
                    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 min-h-[200px] flex flex-col justify-center items-center text-center shadow-lg relative overflow-hidden">
                        {/* Background Decoration */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-teal-400 to-cyan-500 opacity-50" />

                        {isToggleOn ? (
                            <div className="w-full">
                                <h3 className="text-xl font-bold text-cyan-400 mb-6">Possible Combinations</h3>
                                <div className="overflow-x-auto w-full">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="border-b border-slate-700 text-slate-400 text-sm uppercase tracking-wider">
                                                <th className="p-3">Total Cards</th>
                                                <th className="p-3">Xyz Rank</th>
                                                <th className="p-3">Fusion Level</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-700/50">
                                            {generatePossibleCards(opponentMonsterRankOrLevel).map((card, index) => (
                                                <tr key={index} className="hover:bg-slate-700/30 transition-colors">
                                                    <td className="p-3 font-mono text-cyan-300">{card.total}</td>
                                                    <td className="p-3 font-mono">{card.xyzRank1}</td>
                                                    <td className="p-3 font-mono">{card.fusionLevel}</td>
                                                </tr>
                                            ))}
                                            {generatePossibleCards(opponentMonsterRankOrLevel).length === 0 && (
                                                <tr>
                                                    <td colSpan="3" className="p-6 text-center text-slate-500 italic">
                                                        No combinations possible with current selection.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ) : calculationResult ? (
                            <div className="space-y-6 animate-in fade-in zoom-in duration-300">
                                <h3 className="text-2xl font-bold text-white mb-2">Valid Solution Found</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                    <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700">
                                        <div className="text-slate-400 text-xs uppercase tracking-wider mb-1">Fusion Level</div>
                                        <div className="text-4xl font-black text-cyan-400">{calculationResult.fusionLevel}</div>
                                    </div>
                                    <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700 sm:col-span-2">
                                        <div className="text-slate-400 text-xs uppercase tracking-wider mb-1">Required Xyz Ranks</div>
                                        <div className="text-4xl font-black text-teal-400 flex items-center justify-center gap-4">
                                            <span>{calculationResult.xyzRank1}</span>
                                            <span className="text-slate-600 text-2xl">&</span>
                                            <span>{calculationResult.xyzRank2}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : selectedFusionLevels.length === 0 || selectedXyzRanks.length === 0 ? (
                            <div className="text-slate-500">
                                <Info className="w-12 h-12 mx-auto mb-3 opacity-20" />
                                <p>Please select at least one <span className="text-cyan-400 font-bold">Fusion Level</span> and one <span className="text-teal-400 font-bold">Xyz Rank</span> to begin.</p>
                            </div>
                        ) : (
                            <div className="text-slate-500">
                                <p className="text-lg font-medium text-red-400 mb-2">No Valid Solution</p>
                                <p className="text-sm opacity-70">Try adjusting the card count or extra deck selections.</p>
                            </div>
                        )}
                    </div>
                </section>

            </div>
        </div>
    );
};

export default App;
