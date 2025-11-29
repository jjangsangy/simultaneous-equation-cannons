import React from "react";

const LevelButton = ({ value, isSelected, onClick, colorClass }) => (
    <button
        onClick={() => onClick(value)}
        className={`
        w-12 h-12 flex items-center justify-center rounded-md font-bold text-base transition-all duration-200
        ${isSelected
                ? `${colorClass} text-slate-900 shadow-[0_0_15px_rgba(56,189,248,0.5)]`
                : "bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white"
            }
      `}
    >
        {value}
    </button>
);

export default LevelButton;
