import React from "react";
import { Info } from "./icons";

const BoardStateInput = ({
    totalCards,
    setTotalCards,
    opponentMonsterRankOrLevel,
    setOpponentMonsterRankOrLevel,
    isToggleOn,
    setIsToggleOn,
}) => {
    return (
        <section className="space-y-4">
            <h2 className="text-xl font-bold text-slate-200">Board State</h2>
            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Total Cards Input */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-400 block">
                            Total Cards (Field + Hands)
                        </label>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() =>
                                    !isToggleOn && setTotalCards(Math.max(0, totalCards - 1))
                                }
                                disabled={isToggleOn}
                                className="w-9 h-9 flex items-center justify-center rounded-lg bg-slate-700 hover:bg-slate-600 active:bg-slate-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-lg font-bold"
                            >
                                -
                            </button>
                            <input
                                type="number"
                                value={totalCards}
                                onChange={(e) =>
                                    setTotalCards(Math.max(0, Number(e.target.value)))
                                }
                                disabled={isToggleOn}
                                className="w-full bg-slate-900 border border-slate-600 rounded-lg py-1.5 px-3 text-center text-lg font-mono focus:outline-none focus:ring-2 focus:ring-cyan-500 disabled:opacity-50"
                            />
                            <button
                                onClick={() => !isToggleOn && setTotalCards(totalCards + 1)}
                                disabled={isToggleOn}
                                className="w-9 h-9 flex items-center justify-center rounded-lg bg-slate-700 hover:bg-slate-600 active:bg-slate-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-lg font-bold"
                            >
                                +
                            </button>
                        </div>
                    </div>

                    {/* Opponent Rank Input */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-400 block">
                            Opponent Monster Rank/Level
                        </label>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() =>
                                    setOpponentMonsterRankOrLevel(
                                        Math.max(0, opponentMonsterRankOrLevel - 1)
                                    )
                                }
                                className="w-9 h-9 flex items-center justify-center rounded-lg bg-slate-700 hover:bg-slate-600 active:bg-slate-500 transition-colors text-lg font-bold"
                            >
                                -
                            </button>
                            <input
                                type="number"
                                value={opponentMonsterRankOrLevel}
                                onChange={(e) =>
                                    setOpponentMonsterRankOrLevel(
                                        Math.min(12, Math.max(0, Number(e.target.value)))
                                    )
                                }
                                className="w-full bg-slate-900 border border-slate-600 rounded-lg py-1.5 px-3 text-center text-lg font-mono focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            />
                            <button
                                onClick={() =>
                                    setOpponentMonsterRankOrLevel(
                                        Math.min(12, opponentMonsterRankOrLevel + 1)
                                    )
                                }
                                className="w-9 h-9 flex items-center justify-center rounded-lg bg-slate-700 hover:bg-slate-600 active:bg-slate-500 transition-colors text-lg font-bold"
                            >
                                +
                            </button>
                        </div>
                    </div>
                </div>

                {/* Toggle Switch */}
                <div className="mt-4 pt-4 border-t border-slate-700 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-400 text-sm">
                        <Info className="w-4 h-4" />
                        <span>Show all possible card combinations</span>
                    </div>
                    <button
                        onClick={() => setIsToggleOn(!isToggleOn)}
                        className={`
                  relative inline-flex h-8 w-16 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-900
                  ${isToggleOn ? "bg-cyan-500" : "bg-slate-700"}
                `}
                    >
                        <span
                            className={`
                    inline-block h-6 w-6 transform rounded-full bg-white transition-transform duration-300
                    ${isToggleOn ? "translate-x-9" : "translate-x-1"}
                  `}
                        />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default BoardStateInput;
