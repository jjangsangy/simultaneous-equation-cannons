import React, { useState } from "react";
import { BookOpen, ChevronDown, Info } from "./icons";

const Tutorial = () => {
    const [showTutorial, setShowTutorial] = useState(false);

    return (
        <section>
            <button
                onClick={() => setShowTutorial(!showTutorial)}
                className="w-full flex items-center justify-between p-4 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 rounded-xl transition-all group"
            >
                <div className="flex items-center gap-3">
                    <BookOpen className="w-5 h-5 text-cyan-400" />
                    <span className="font-semibold text-slate-200 group-hover:text-white transition-colors">
                        How to Use
                    </span>
                </div>
                <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${showTutorial ? "rotate-180" : ""
                        }`}
                />
            </button>

            <div
                className={`grid transition-all duration-300 ease-in-out ${showTutorial
                    ? "grid-rows-[1fr] opacity-100 mt-4"
                    : "grid-rows-[0fr] opacity-0"
                    }`}
            >
                <div className="overflow-hidden">
                    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 space-y-6">
                        <section>
                            <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-400 mb-2">
                                1. Extra Deck Setup
                            </h3>
                            <p className="text-slate-300 text-sm leading-relaxed">
                                Select the <strong className="text-white">Fusion Levels</strong>{" "}
                                and <strong className="text-white">Xyz Ranks</strong> of
                                monsters you currently have available in your Extra Deck. The
                                calculator uses these to find a combination of 1 Fusion and 2
                                Xyz monsters (same Rank) to banish.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-400 mb-2">
                                2. Total Cards
                            </h3>
                            <p className="text-slate-300 text-sm leading-relaxed">
                                Enter the total number of cards in{" "}
                                <strong className="text-white">BOTH players' hands</strong> and
                                on <strong className="text-white">BOTH players' fields</strong>.
                                <span className="block mt-1 text-slate-400 italic">
                                    Include the Simultaneous Equation Cannons card itself.
                                </span>
                            </p>
                        </section>

                        <section>
                            <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-400 mb-2">
                                3. Opponent Monster
                            </h3>
                            <p className="text-slate-300 text-sm leading-relaxed">
                                Enter the{" "}
                                <strong className="text-white">Rank or Level</strong> of{" "}
                                <strong className="text-white">1 face-up monster</strong> your
                                opponent controls.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-400 mb-2">
                                4. Show Possible Combinations
                            </h3>
                            <p className="text-slate-300 text-sm leading-relaxed">
                                Enable this toggle to see{" "}
                                <strong className="text-white">all valid solutions</strong> for
                                the current Opponent Monster Rank/Level. This lists every
                                combination of Total Cards, Xyz Rank, and Fusion Level that
                                would work, helping you plan your field setup.
                            </p>
                        </section>

                        <div className="bg-cyan-900/20 border border-cyan-500/30 rounded-lg p-3 flex gap-3 items-start">
                            <Info className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                            <div>
                                <h4 className="font-bold text-cyan-100 text-sm mb-0.5">
                                    Winning the Equation
                                </h4>
                                <p className="text-xs text-cyan-200/80">
                                    If a valid combination is found, the calculator will show you
                                    exactly which Fusion Level and Xyz Ranks to banish to satisfy
                                    both the activation cost and the resolution effect!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Tutorial;
