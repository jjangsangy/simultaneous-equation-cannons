# Technical Context

## Core Technologies
- **React**: Frontend framework (v18.2.0).
- **Vite**: Build tool and development server (v7.x).
- **React Compiler**: Automatic memoization compiler (Babel plugin).
- **Tailwind CSS**: Styling framework (v3.x).
  - **PostCSS**: CSS transformation tool.
  - **Autoprefixer**: Vendor prefix management.

## Testing Technologies
- **Vitest**: Unit and integration testing runner (v4.x).
- **React Testing Library**: Component testing utilities.
- **JSDOM**: Browser environment simulation for tests.
- **Husky**: Git hooks (pre-commit).
- **Lint-staged**: Staged file linter/tester.

## Development Environment
- **Node.js**: Runtime environment (v20.x recommended).
- **npm**: Package manager.
- **OS**: Linux.

## Project Structure
- `src/`: Source code.
  - `App.jsx`: Main component.
  - `index.css`: Global styles and Tailwind imports.
  - `index.jsx`: Entry point.
  - `components/`: UI components.
  - `hooks/`: Custom hooks.
  - `utils/`: Utility functions.
- `public/`: Static assets.
- `package.json`: Dependencies and scripts.
- `tailwind.config.js`: Tailwind configuration.
- `postcss.config.js`: PostCSS configuration.
- `vite.config.mjs`: Vite configuration (ES Module).
- `vitest.setup.js`: Vitest setup file.

## Dependencies
- `react`, `react-dom`
- `react-compiler-runtime` (Runtime support for React Compiler)
- `vite`, `@vitejs/plugin-react` (DevDependencies)
- `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `jsdom` (DevDependencies - Testing)
- `husky`, `lint-staged` (DevDependencies - Git Hooks)
- `babel-plugin-react-compiler`, `eslint-plugin-react-compiler` (DevDependencies)
- `tailwindcss`, `postcss`, `autoprefixer` (DevDependencies)
- `gh-pages` (DevDependency for deployment)
