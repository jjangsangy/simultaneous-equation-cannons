import React from "react";
import { Info } from "./icons";

const ResultsDisplay = ({
    isToggleOn,
    calculationResult,
    selectedFusionLevels,
    selectedXyzRanks,
    possibleCards,
}) => {
    return (
        <section className="space-y-4">
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 min-h-[200px] flex flex-col justify-center items-center text-center shadow-lg relative overflow-hidden">
                {/* Background Decoration */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-teal-400 to-cyan-500 opacity-50" />

                {isToggleOn ? (
                    <div className="w-full">
                        <h3 className="text-xl font-bold text-cyan-400 mb-6">
                            Possible Combinations
                        </h3>
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
                                    {possibleCards.map((card, index) => (
                                        <tr
                                            key={index}
                                            className="hover:bg-slate-700/30 transition-colors"
                                        >
                                            <td className="p-3 font-mono text-cyan-300">
                                                {card.total}
                                            </td>
                                            <td className="p-3 font-mono">{card.xyzRank1}</td>
                                            <td className="p-3 font-mono">{card.fusionLevel}</td>
                                        </tr>
                                    ))}
                                    {possibleCards.length === 0 && (
                                        <tr>
                                            <td
                                                colSpan="3"
                                                className="p-6 text-center text-slate-500 italic"
                                            >
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
                        <h3 className="text-2xl font-bold text-white mb-2">
                            Valid Solution Found
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700">
                                <div className="text-slate-400 text-xs uppercase tracking-wider mb-1">
                                    Fusion Level
                                </div>
                                <div className="text-4xl font-black text-cyan-400">
                                    {calculationResult.fusionLevel}
                                </div>
                            </div>
                            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700 sm:col-span-2">
                                <div className="text-slate-400 text-xs uppercase tracking-wider mb-1">
                                    Required Xyz Ranks
                                </div>
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
                        <p>
                            Please select at least one{" "}
                            <span className="text-cyan-400 font-bold">Fusion Level</span> and
                            one <span className="text-teal-400 font-bold">Xyz Rank</span> to
                            begin.
                        </p>
                    </div>
                ) : (
                    <div className="text-slate-500">
                        <p className="text-lg font-medium text-red-400 mb-2">
                            No Valid Solution
                        </p>
                        <p className="text-sm opacity-70">
                            Try adjusting the card count or extra deck selections.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ResultsDisplay;
