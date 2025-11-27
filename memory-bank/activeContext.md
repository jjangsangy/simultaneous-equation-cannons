# Active Context

## Current Work Focus
Implemented a Card Preview feature to allow users to view the "Simultaneous Equation Cannons" card details and image directly within the app.

## Recent Changes
- **Card Preview Feature**:
  - Added a "Card Info" button (question mark icon) to the header.
  - Implemented a dropdown/modal that displays the card image and full effect text.
  - Used Yugipedia for the card image source.
  - Styled with Tailwind CSS (absolute positioning, backdrop blur, animations).
- **Tailwind CSS Integration** (Previous):
  - Installed `tailwindcss`, `postcss`, `autoprefixer`.
  - Configured `tailwind.config.js` to scan `src` files.
  - Updated `src/index.css` with Tailwind directives.
- **App Component Update** (Previous):
  - Replaced `src/App.js` with a new implementation that uses Tailwind utility classes.
  - New UI design with a dark theme (slate/cyan color scheme).

## Next Steps
- Verify the build and functionality in a browser environment.
- Potential future enhancements:
  - Add more visual feedback for valid/invalid states.
  - Unit testing for the calculation logic.

## Active Decisions
- **Card Image Source**: Using a direct URL to Yugipedia for the card image. Ideally, this should be a local asset or a more permanent CDN link to ensure reliability, but this works for now.
- **Tailwind CSS Version**: Used v3 for stability.
- **Persistence**: Using `localStorage` to save user state.
