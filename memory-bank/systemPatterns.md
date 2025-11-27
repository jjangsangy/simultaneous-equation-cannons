# System Patterns

## Architecture
- **Single Page Application (SPA)**: Built with React.
- **Component Structure**:
  - `App`: The main container and logic handler.
    - Manages state for game variables and user inputs.
    - Contains sub-components (defined locally for simplicity): `LevelButton`, `Trash2`, `Calculator`, `Info`, `Github`, `HelpCircle`.
    - Handles persistence via `useEffect`.
    - Includes a **Card Preview** modal/dropdown for displaying card details.

## State Management
- **React `useState`**: Used for all local state.
  - `totalCards` (number)
  - `opponentMonsterRankOrLevel` (number)
  - `selectedFusionLevels` (array of numbers)
  - `selectedXyzRanks` (array of numbers)
  - `calculationResult` (object | null)
  - `errorMessage` (string)
  - `isToggleOn` (boolean)
  - `showCardPreview` (boolean): Controls visibility of the card details modal.
- **Persistence**: State is initialized from `localStorage` if available, and updated in `localStorage` whenever it changes.

## Styling
- **Tailwind CSS**: Utility-first CSS framework.
- **Theme**: Dark mode style (Slate grays, Cyan/Teal accents).
- **Responsive Design**: Uses Tailwind's responsive prefixes (e.g., `md:p-8`, `md:text-3xl`) to adapt to different screen sizes.

## Logic Patterns
- **Calculation**: The core logic solves a system of equations:
  - Let $T$ = Total Cards
  - Let $O$ = Opponent Rank
  - Let $F$ = Fusion Level
  - Let $X$ = Xyz Rank (we assume two Xyz monsters of the same rank for simplicity or as per card strategy).
  - Equations:
    1. $F + 2X = \text{ExtraDeckCount}$ (Not exactly the equation from the card, but used for checking extra deck size)
    - Actually, the card effect logic implemented is:
      - $R = T - O$
      - $L = 2O - T$
      - If $R > 0$ and $L > 0$, then $XyzRank = R$ and $FusionLevel = L$.
      - This derives from the simultaneous equations:
        - $X + F = O$ ?? No, let's verify the math in `solveCardRequirements`.
        - The code says: `R = tCards - oppRank`, `L = 2 * oppRank - tCards`.
        - It returns `fusionLevel: L, xyzRank1: R, xyzRank2: R`.
        - So it implies the solution requires banishing 1 Fusion (Level $L$) and 2 Xyz (Rank $R$).

## Code Organization
- `src/App.js`: Contains all logic and UI.
- `src/index.css`: Tailwind directives.
- `tailwind.config.js`: Tailwind configuration.
