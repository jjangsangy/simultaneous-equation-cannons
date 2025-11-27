# Active Context

## Current Work Focus
Adding Help/Tutorial features to clarify app usage in relation to Yugioh game mechanics.

## Recent Changes
- **Tutorial Mode**:
  - **Refinement**: Moved the "How to Use" guide from a header modal to a **collapsible dropdown** in the main body for better transparency and accessibility.
  - Added a new section explaining the **"Show Possible Combinations"** toggle option.
  - Implemented a smooth expand/collapse animation for the tutorial section.
  - Removed the `BookOpen` icon from the header.
  - Simplified the instruction regarding the inclusion of the *Simultaneous Equation Cannons* card itself based on user feedback.
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
- **Tutorial UI**: Moved from a modal to an accordion-style dropdown in the main body. This avoids context switching (opening/closing a modal) and allows the user to keep the guide open while using the calculator if they wish.
- **Tutorial Content**: Focused on bridging the gap between the calculator's UI inputs and the specific text of the Yugioh card to ensure players understand *why* they are entering these numbers.
- **Button Styling**: Prioritized accessibility (touch target size) and reliable interaction over visual flair (scaling effect) for the selection buttons.
- **Card Image Source**: Using a direct URL to Yugipedia for the card image. Ideally, this should be a local asset or a more permanent CDN link to ensure reliability, but this works for now.
- **Tailwind CSS Version**: Used v3 for stability.
- **Persistence**: Using `localStorage` to save user state.
