import React, { useEffect } from 'react';

import { checkBoardState, checkPlacementValidity } from '../../functions';
import { IActiveGamePiece } from '../../models/ActiveGamePiece.model';
import { IGameBoardPiece } from '../../models/GameBoardPiece.model';

type Props = {
  activeGamePiece: IActiveGamePiece;
  gameBoard: IGameBoardPiece[];
  updateGame: (gameBoard: IGameBoardPiece[], score: number) => void;
  updateGamePieceValid: (id: number) => void;
};

const GameBoard = ({ activeGamePiece, gameBoard, updateGame, updateGamePieceValid }: Props) => {
  useEffect(() => {
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
  }, [activeGamePiece, gameBoard, updateGame, updateGamePieceValid]);

  return (
    <div className="grid grid-cols-10">
      {gameBoard.map((val, i) => (
        <div
          key={i}
          className={
            val.isFilled
              ? 'w-16 h-16 border-zinc-900 rounded bg-secondary'
              : 'w-16 h-16 border-zinc-900 rounded bg-primary'
          }
          style={{ borderWidth: '1px', boxShadow: 'inset 0 2px 6px 1px rgb(0 0 0 / 0.40)' }}></div>
      ))}
    </div>
  );
};

export default GameBoard;
