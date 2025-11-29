import React, { useState } from "react";
import cardImage from "../assets/SimultaneousEquationCannons.webp";
import { Calculator, HelpCircle } from "./icons";

const Header = () => {
    const [showCardPreview, setShowCardPreview] = useState(false);

    return (
        <header className="flex items-center justify-between pb-6 border-b border-slate-700/50 relative">
            <div className="flex items-center gap-3">
                <div className="p-3 bg-cyan-500/10 rounded-xl">
                    <Calculator className="w-8 h-8 text-cyan-400" />
                </div>
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
                    Simultaneous Equation <span className="text-cyan-400">Cannons</span>
                </h1>
            </div>
            <div className="relative flex items-center gap-2">
                <button
                    onClick={() => setShowCardPreview(!showCardPreview)}
                    className="p-2 text-slate-400 hover:text-cyan-400 hover:bg-slate-800 rounded-lg transition-all"
                    title="View Card Details"
                >
                    <HelpCircle className="w-6 h-6" />
                </button>

                {showCardPreview && (
                    <div className="absolute right-0 top-12 w-[calc(100vw-2rem)] md:w-96 z-50 bg-slate-800 border border-slate-600 rounded-xl shadow-2xl p-4 md:p-6 animate-in fade-in slide-in-from-top-2">
                        <div className="flex flex-col gap-4">
                            <div className="relative aspect-[0.69] w-48 mx-auto rounded-lg overflow-hidden shadow-lg border border-slate-700">
                                <img
                                    src={cardImage}
                                    alt="Simultaneous Equation Cannons"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-bold text-lg text-white">
                                    Simultaneous Equation Cannons
                                </h3>
                                <div className="text-xs font-bold text-pink-500 uppercase tracking-wider">
                                    [Trap Card]
                                </div>
                                <p className="text-sm text-slate-300 leading-relaxed text-justify">
                                    Banish 1 Fusion Monster and 2 Xyz Monsters with the same Rank
                                    from your Extra Deck, whose combined Level and Ranks equal the
                                    total number of cards in both players' hands and on the field,
                                    then you can apply this effect.
                                    <br />
                                    <br />
                                    ● Return 2 of your banished monsters to the Extra Deck (1 Xyz
                                    and 1 Fusion) whose combined Level and Rank equal the Level or
                                    Rank of 1 face-up monster your opponent controls, then banish
                                    all cards they control.
                                </p>
                            </div>
                        </div>
                        <div
                            className="fixed inset-0 -z-10"
                            onClick={() => setShowCardPreview(false)}
                        />
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
