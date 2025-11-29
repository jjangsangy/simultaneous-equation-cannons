# Active Context

## Current Focus
- Performance optimization and modern tooling.

## Recent Changes
- Integrated React Compiler (Babel plugin) for automatic memoization.
- Configured Vite to work with React Compiler on React 18 using `react-compiler-runtime`.
- Refactored `src/App.js` into multiple functional components (`Header`, `Tutorial`, `ExtraDeckSelector`, `BoardStateInput`, `ResultsDisplay`, `Footer`).
- Extracted business logic and state management into a custom hook `src/hooks/useCalculator.js`.
- Moved mathematical logic to pure functions in `src/utils/solver.js`.
- Centralized icons in `src/components/icons.js`.

## Next Steps
- Gather user feedback on the new structure (if any).
- Continue with roadmap items.

## Active Decisions
- **Tooling**: Switched to React Compiler for performance instead of manual `useMemo`/`useCallback` optimization.
- **Modularity**: Split the monolithic `App.js` to separate concerns (UI vs Logic vs State).
- **Directory Structure**: Adopted a standard `components/`, `hooks/`, `utils/` structure.
