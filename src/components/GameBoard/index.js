import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { gameArray } from 'const';
import { updateGamePieceValid } from 'store/reducers/selectableGamePieces';

const GameBoard = () => {
  const [gameBoard, setGameBoard] = useState(gameArray);
  const activeGamePiece = useSelector((state) => state.activeGamePiece);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(activeGamePiece);
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
      let isValid = true;
      activeGamePiece.gamePiece.structure.forEach((piece) => {
        if (piece.isFilled) {
          if (piece.col > 0 && (piece.col + anchorSquare) % 10 === 0) {
            isValid = false;
          }
          const index = anchorSquare - 10 * piece.row + piece.col;
          if (index < 0) {
            isValid = false;
          } else if (updatedArray[index].isFilled) {
            isValid = false;
          }
        }
      });
      if (isValid) {
        activeGamePiece.gamePiece.structure.forEach((piece) => {
          if (piece.isFilled) {
            updatedArray[anchorSquare - 10 * piece.row + piece.col].isFilled = true;
          }
        });
        setGameBoard(updatedArray);
        dispatch(updateGamePieceValid(activeGamePiece.gamePiece.id, isValid));
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
