# Technical Context

## Core Technologies
- **React**: Frontend framework (v18.2.0).
- **Vite**: Build tool and development server (v7.x).
- **React Compiler**: Automatic memoization compiler (Babel plugin).
- **Tailwind CSS**: Styling framework (v3.x).
  - **PostCSS**: CSS transformation tool.
  - **Autoprefixer**: Vendor prefix management.

## Development Environment
- **Node.js**: Runtime environment.
- **npm**: Package manager.
- **OS**: Linux.

## Project Structure
- `src/`: Source code.
  - `App.js`: Main component.
  - `index.css`: Global styles and Tailwind imports.
  - `index.js`: Entry point.
- `public/`: Static assets.
- `package.json`: Dependencies and scripts.
- `tailwind.config.js`: Tailwind configuration.
- `postcss.config.js`: PostCSS configuration.

## Dependencies
- `react`, `react-dom`
- `react-compiler-runtime` (Runtime support for React Compiler)
- `vite`, `@vitejs/plugin-react` (DevDependencies)
- `babel-plugin-react-compiler`, `eslint-plugin-react-compiler` (DevDependencies)
- `tailwindcss`, `postcss`, `autoprefixer` (DevDependencies)
- `gh-pages` (DevDependency for deployment)
