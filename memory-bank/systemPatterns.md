# System Patterns

## Architecture
- **Single Page Application (SPA)**: Built with React.
- **Component Structure**:
  - `App`: Composition root that assembles the UI and provides data via `useCalculator`.
  - **Components (`src/components/`)**:
    - `Header`: Title and Card Preview modal.
    - `Tutorial`: Collapsible "How to Use" guide.
    - `ExtraDeckSelector`: UI for selecting Fusion Levels and Xyz Ranks.
    - `BoardStateInput`: Inputs for Total Cards and Opponent Rank.
    - `ResultsDisplay`: Shows the calculation result or possible combinations table.
    - `Footer`: Application footer.
    - `LevelButton`: Reusable button component for levels/ranks.
    - `icons.js`: Centralized export for SVG icons.
  - **Hooks (`src/hooks/`)**:
    - `useCalculator`: Manages application state, persistence, and business logic.
  - **Utils (`src/utils/`)**:
    - `solver.js`: Pure functions for mathematical logic.

## State Management
- **React `useState`**: Used for all local state within `useCalculator`.
  - `totalCards` (number)
  - `opponentMonsterRankOrLevel` (number)
  - `selectedFusionLevels` (array of numbers)
  - `selectedXyzRanks` (array of numbers)
  - `calculationResult` (object | null)
  - `errorMessage` (string)
  - `isToggleOn` (boolean)
- **Persistence**: State is initialized from `localStorage` if available, and updated in `localStorage` whenever it changes, handled within `useCalculator`.

## Testing Strategy
- **Unit Tests** (`src/utils/solver.test.js`): Verify core mathematical logic and edge cases in `solver.js`.
- **Integration Tests** (`src/hooks/useCalculator.test.js`): Verify state management, business logic, and interactions in `useCalculator.js`.
- **Component Tests** (`src/components/*.test.jsx`): Verify rendering, user interactions, and prop handling for individual UI components.
- **App Smoke Test** (`src/App.test.jsx`): Ensure the main application renders without crashing and key elements are present.
- **CI/CD Integration**: Tests run automatically on push/PR via GitHub Actions. Deployment to GitHub Pages is blocked if tests fail.
- **Pre-commit Hooks**: Tests run on staged files to prevent committing broken code.

## Styling
- **Tailwind CSS**: Utility-first CSS framework.
- **Theme**: Dark mode style (Slate grays, Cyan/Teal accents).
- **Responsive Design**: Uses Tailwind's responsive prefixes (e.g., `md:p-8`, `md:text-3xl`) to adapt to different screen sizes.

## Logic Patterns
- **Calculation**: The core logic solves a system of equations:
  - Let $T$ = Total Cards
  - Let $O$ = Opponent Rank
  - Let $F$ = Fusion Level
  - Let $X$ = Xyz Rank (we assume two Xyz monsters of the same rank).
  - Derived solution:
      - $X = T - O$
      - $F = 2O - T$
  - If $X > 0$ and $F > 0$, then the solution requires banishing 1 Fusion (Level $F$) and 2 Xyz (Rank $X$).
  - Logic is encapsulated in `src/utils/solver.js`.

## Code Organization
- `src/App.js`: Main entry point for layout.
- `src/components/`: UI components.
- `src/hooks/`: Custom React hooks.
- `src/utils/`: Utility functions.
- `src/index.css`: Tailwind directives.
