import React from "react";
import { useCalculator } from "./hooks/useCalculator";
import Header from "./components/Header";
import Tutorial from "./components/Tutorial";
import ExtraDeckSelector from "./components/ExtraDeckSelector";
import BoardStateInput from "./components/BoardStateInput";
import ResultsDisplay from "./components/ResultsDisplay";
import Footer from "./components/Footer";

const App = () => {
    const {
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
    } = useCalculator();

    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-cyan-500 selection:text-white p-4 md:p-8">
            <div className="max-w-4xl mx-auto space-y-6">
                <Header />
                <Tutorial />
                <ExtraDeckSelector
                    selectedFusionLevels={selectedFusionLevels}
                    handleFusionLevelToggle={handleFusionLevelToggle}
                    selectedXyzRanks={selectedXyzRanks}
                    handleXyzRankToggle={handleXyzRankToggle}
                    extraDeckCount={calculateExtraDeckCount()}
                    maxExtraDeckSize={MAX_EXTRA_DECK_SIZE}
                    clearSelections={clearSelections}
                    errorMessage={errorMessage}
                />
                <BoardStateInput
                    totalCards={totalCards}
                    setTotalCards={setTotalCards}
                    opponentMonsterRankOrLevel={opponentMonsterRankOrLevel}
                    setOpponentMonsterRankOrLevel={setOpponentMonsterRankOrLevel}
                    isToggleOn={isToggleOn}
                    setIsToggleOn={setIsToggleOn}
                />
                <ResultsDisplay
                    isToggleOn={isToggleOn}
                    calculationResult={calculationResult}
                    selectedFusionLevels={selectedFusionLevels}
                    selectedXyzRanks={selectedXyzRanks}
                    possibleCards={generatePossibleCards()}
                />
                <Footer />
            </div>
        </div>
    );
};

export default App;
