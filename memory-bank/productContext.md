# Product Context

## Problem Statement
The Yu-Gi-Oh! card "Simultaneous Equation Cannons" requires a complex mathematical calculation to resolve. Players must banish Xyz Monsters and a Fusion Monster from their Extra Deck such that:
1. The total number of ranks/levels equals the number of cards on the field and in hands.
2. The number of Xyz Monsters banished times the opponent's monster's Rank/Level equals the number of cards on the field and in hands.

Solving this "simultaneous equation" mid-game can be slow and prone to error.

## Solution
This app automates the calculation. Users input the game state variables (Total Cards, Opponent Monster Rank/Level) and their available Extra Deck resources. The app computes the required banishments instantly.

## User Experience Goals
- **Speed**: Instant calculation updates as inputs change.
- **Clarity**: Clear visualization of the solution (Fusion Level and Xyz Ranks).
- **Usability**: Easy toggling of available Extra Deck cards.
- **Persistence**: Remembers selected cards and inputs between sessions so players don't have to re-enter their Extra Deck contents every time.
