# Active Context

## Current Focus
- Performance optimization and modern tooling.
- Ensuring code quality and reliability through testing.

## Recent Changes
- Implemented a comprehensive test suite using Vitest, React Testing Library, and JSDOM.
- Integrated automated testing into the CI/CD pipeline (GitHub Actions).
- Configured pre-commit hooks using Husky and Lint-staged to run tests on staged files.
- Renamed `vite.config.js` to `vite.config.mjs` for better ES Module compatibility.
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
- **Testing Framework**: Chose Vitest over Jest for better integration with Vite.
- **CI/CD**: Configured deployment workflow to require passing tests before deploying.
- **Tooling**: Switched to React Compiler for performance instead of manual `useMemo`/`useCallback` optimization.
- **Modularity**: Split the monolithic `App.js` to separate concerns (UI vs Logic vs State).
- **Directory Structure**: Adopted a standard `components/`, `hooks/`, `utils/` structure.
