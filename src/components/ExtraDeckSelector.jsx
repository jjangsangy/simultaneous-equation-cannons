import React from "react";
import LevelButton from "./LevelButton";
import { Trash2 } from "./icons";

const ExtraDeckSelector = ({
    selectedFusionLevels,
    handleFusionLevelToggle,
    selectedXyzRanks,
    handleXyzRankToggle,
    extraDeckCount,
    maxExtraDeckSize,
    clearSelections,
    errorMessage,
}) => {
    const levels = Array.from({ length: 12 }, (_, i) => i + 1);
    const isOverLimit = extraDeckCount > maxExtraDeckSize;

    return (
        <section className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-200">Extra Deck</h2>
                <div
                    className={`text-sm font-semibold px-3 py-1 rounded-full ${isOverLimit
                        ? "bg-red-500/20 text-red-400"
                        : "bg-slate-800 text-slate-400"
                        }`}
                >
                    {extraDeckCount} / {maxExtraDeckSize} Cards
                </div>
            </div>

            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
                {/* Fusion Levels */}
                <div className="mb-6">
                    <h3 className="text-sm uppercase tracking-wider font-semibold text-slate-400 mb-3">
                        Select Fusion Levels
                    </h3>
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
                    <h3 className="text-sm uppercase tracking-wider font-semibold text-slate-400 mb-3">
                        Select Xyz Ranks
                    </h3>
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
                        onClick={clearSelections}
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
    );
};

export default ExtraDeckSelector;
