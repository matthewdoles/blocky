# Blocky

### Description

This website is a block based puzzle game akin to the popular mobile game [Woody](https://play.google.com/store/apps/details?id=game.puzzle.woodypuzzle&hl=en_US&gl=US). The player starts with a blank 10x10 board and places randomly selected pieces to form rows or columns of to get points and clear the board. The site also has multiplayer functionality where the player battle to get the highest score.

#### Hosting

- [https://blocky-beige.vercel.app/](https://blocky-beige.vercel.app/)

The site is hosted on [Vercel](https://vercel.com/). Every commit or merge to main is setup to automatically re-deploy the main branch into production.

### Design

#### Game Pieces

The most helpful asset which this whole game is made possible with is the react-draggable npm package. As the title entails, this package allows for reactive draggable components. Using this package, I can capture the ending x,y coordinates on drag end for a component (game piece) to then accurately fill in the correct squares on the game baord. While it may appear a game piece is being snapped into place, the component itself will disappear as to prevent the user from moving placed pieces and for easier management of the game board as rows and columns are completely filled and removed.

There are 15 unique game pieces that may generate throughout the game. Furthermore, only 3 game pieces will generate at a time. When the 3 pieces are placed, then 3 more random pieces are generatd. Thus, creating a need to strategically place the pieces given and anticpate any combination of the next 3 random pieces.

#### Game Board

#### Multiplayer

#### Accent Picker
