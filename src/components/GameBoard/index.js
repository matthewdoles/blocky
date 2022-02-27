import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { gameArray } from 'const';

const GameBoard = () => {
  const [gameBoard, setGameBoard] = useState(gameArray);
  const activeGamePiece = useSelector((state) => state.activeGamePiece);

  useEffect(() => {
    console.log(activeGamePiece);
    const rootSquare = gameBoard.findIndex((square) => {
      console.log(square.y < activeGamePiece.y < square.y + 64);

      return (
        square.x - 20 < activeGamePiece.x &&
        activeGamePiece.x + 20 < square.x + 64 &&
        square.y - 20 < activeGamePiece.y &&
        activeGamePiece.y + 20 < square.y + 64
      );
    });
    console.log(rootSquare);
    if (rootSquare !== -1) {
      setGameBoard((currBoard) => {
        const updatedArray = [...currBoard];

        updatedArray[rootSquare].isFilled = true;
        return [...updatedArray];
      });
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
