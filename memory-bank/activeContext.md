# Active Context

## Current Work Focus
Improving mobile usability and addressing touch target issues.

## Recent Changes
- **Mobile Usability Fix**:
  - Increased button size for Fusion/Xyz selection to `w-12 h-12` (48px) globally to ensure accessible touch targets.
  - Removed `scale-105` transformation from selected buttons to prevent stacking context issues where selected buttons would capture clicks intended for adjacent buttons.
- **Favicon Update**:
  - Implemented a new SVG favicon (`public/favicon.svg`) featuring a "Calculator" icon style.
  - Matches the app's dark theme (Slate-900 background, Cyan-400 stroke).
  - Removed old PNG favicons to ensure consistency.
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
- **Button Styling**: Prioritized accessibility (touch target size) and reliable interaction over visual flair (scaling effect) for the selection buttons.
- **Card Image Source**: Using a direct URL to Yugipedia for the card image. Ideally, this should be a local asset or a more permanent CDN link to ensure reliability, but this works for now.
- **Tailwind CSS Version**: Used v3 for stability.
- **Persistence**: Using `localStorage` to save user state.
