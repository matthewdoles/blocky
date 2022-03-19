# Blocky

### Description

This website is a block based puzzle game akin to the popular mobile game [Woody](https://play.google.com/store/apps/details?id=game.puzzle.woodypuzzle&hl=en_US&gl=US). The player starts with a blank 10x10 board and places randomly selected pieces to form rows or columns of to get points and clear the board. The site also has multiplayer functionality where the player battle to get the highest score.

#### Hosting

- [https://blocky-beige.vercel.app/](https://blocky-beige.vercel.app/)

The site is hosted on [Vercel](https://vercel.com/). Every commit or merge to main is setup to automatically re-deploy the main branch into production.

### Design

#### Gameplay

The most helpful asset which this whole game is made possible with is the [react-draggable](https://www.npmjs.com/package/react-draggable) npm package. As the title entails, this package allows for reactive draggable components. Using this package, I can capture the ending x,y coordinates on drag end for a component (game piece) to then accurately fill in the correct squares on the game baord. While it may appear a game piece is being snapped into place, the component itself will disappear as to prevent the user from moving placed pieces and for easier management of the game board as rows and columns are completely filled and removed.

There are 15 unique game pieces that may generate throughout the game. Furthermore, only 3 game pieces will generate at a time. When the 3 pieces are placed, then 3 more random pieces are generatd. Thus, creating a need to strategically place the pieces given and anticpate any combination of the next 3 random pieces. Each valid placed piece will net points totaling the number of squares the piece is. A full row or column will net 10 points. However, points multiply by 100 for every 2 or more rows/columns filled in simultaneously - i.e. a game piece placed that clears 2 rows nets 200 points, 3 nets 300, etc. Thus, with the randomly generated game pieces there is a strategy of keeping your board clean and clear vs waiting for the right piece to clear multiple rows/columns.

#### Multiplayer

Multiplayer is made possible using [Socket.io](https://socket.io/). There is a simple dedicated server backend which helps with the orchestration of creating a lobby and communicating game state to the appropriate players. The gameplay itself does not differ at all from what you will read above this section. Each player simply plays their game as they would until game over and the player with the most points win. Each player will see a smaller version of their opponents game board and total score to the left of theirs so they can gauge how they are progressing.

#### Accent Picker

This feature is made possible with [daisyUI themes](https://daisyui.com/docs/themes/) which allows you to use the same CSS classes across all your components and pages and when a theme change is triggered there is very little additional coding or logic needed. Each available option you see in the accent picklist is a custom theme. While in this project the user is only switching the accent color - the primary color in all the themes is set to the blue background of the game board and the secondary color to the selected accent color. While the use case in this project is quite simple it was nice to experiment with daisyUI more and creating custom themes.
