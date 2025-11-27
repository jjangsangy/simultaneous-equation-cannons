# Yu-Gi-Oh! Simultaneous Equation Cannons Calculator

![card](./assets/ui.png)

This React application calculates the valid combinations for the Yu-Gi-Oh! card effect **Simultaneous Equation Cannons**. Users can input total cards, opponent monster rank/level, and select Fusion Levels and Xyz Ranks to determine valid combinations for resolving the card's effect.

## Features

- **Smart Calculation**: Instantly finds valid Fusion Level and Xyz Rank combinations based on board state.
- **Extra Deck Management**:
  - Validates selections against the 15-card Extra Deck limit.
  - Correctly weights Xyz Monsters (2 cards) and Fusion Monsters (1 card).
- **Comprehensive Analysis**:
  - **"Show Possible Combinations" Mode**: Displays a table of ALL valid solutions for a given Opponent Rank, helping you plan your field setup.
- **User Convenience**:
  - **Persistence**: Remembers your Extra Deck selections and inputs between sessions using LocalStorage.
  - **Card Info**: Built-in reference for the official card text and image.
  - **In-App Tutorial**: Accessible "How to Use" guide within the application.
- **Modern UI**:
  - Built with **React** and **Tailwind CSS**.
  - Fully responsive design with dark mode aesthetic.
  - Input validation for ranks/levels (0-12) and card counts.

## Technologies Used

- **React**: UI Library
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon set

## Getting Started

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/jjangsangy/simultaneous-equation-cannons.git
    ```
2. Navigate to the project directory:
    ```bash
    cd simultaneous-equation-cannons
    ```
3. Install dependencies:
    ```bash
    npm install
    ```

### Usage
1. Start the development server:
    ```bash
    npm start
    ```
2. Open the app in your browser at `http://localhost:3000`

### Deployment

To build the app for production:

```bash
npm run build
```

The production-ready files will be in the `build/` directory.

## How to Use

1. **Extra Deck Setup**: Select the Fusion Levels and Xyz Ranks available in your Extra Deck.
2. **Board State**: Input the total number of cards on the field and in both players' hands.
3. **Opponent Monster**: Input the Rank or Level of the opponent's face-up monster.
4. **View Results**:
   - The app will display the specific Fusion and Xyz monsters to banish if a solution exists.
   - Toggle **"Show Possible Combinations"** to see a list of all valid board states for the current opponent monster.
