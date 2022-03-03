import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { checkBoardState, checkPlacementValidity } from 'functions';

const GameBoard = ({ activeGamePiece, gameBoard, updateGame, updateGamePieceValid }) => {
  useEffect(() => {
    if (activeGamePiece) {
      const anchorSquare = gameBoard.findIndex((square) => {
        return (
          square.x - 20 < activeGamePiece.x &&
          activeGamePiece.x + 20 < square.x + 64 &&
          square.y - 20 < activeGamePiece.y &&
          activeGamePiece.y + 20 < square.y + 64
        );
      });
      if (anchorSquare !== -1) {
        const updatedArray = [...gameBoard];

        if (checkPlacementValidity(anchorSquare, gameBoard, activeGamePiece.gamePiece)) {
          let addScore = 0;
          activeGamePiece.gamePiece.structure.forEach((piece) => {
            if (piece.isFilled) {
              updatedArray[anchorSquare - 10 * piece.row + piece.col].isFilled = true;
              addScore += 1;
            }
          });
          const gameState = checkBoardState(updatedArray, addScore);
          updateGame(gameState.gameBoard, gameState.addScore);
          updateGamePieceValid(activeGamePiece.gamePiece.id);
        }
      }
    }
  }, [activeGamePiece]);

  return (
    <div className="grid grid-cols-10">
      {gameBoard.map((val, i) => (
        <div
          key={i}
          className={
            val.isFilled
              ? 'w-16 h-16 border-zinc-900 rounded bg-emerald-300'
              : 'w-16 h-16 border-zinc-900 rounded bg-blue-400/75'
          }
          style={{ borderWidth: '1px', boxShadow: 'inset 0 2px 6px 1px rgb(0 0 0 / 0.40)' }}></div>
      ))}
    </div>
  );
};

export default GameBoard;

GameBoard.propTypes = {
  activeGamePiece: PropTypes.object,
  gameBoard: PropTypes.array,
  updateGame: PropTypes.func,
  updateGamePieceValid: PropTypes.func
};
