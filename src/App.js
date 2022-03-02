import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import GameBoard from 'components/GameBoard';
import GamePiece from 'components/GamePiece';
import { getRandomPieces } from 'store/reducers/selectableGamePieces';
import './App.css';

function App() {
  const { gamePieces } = useSelector((state) => state.selectableGamePieces);
  const { score, isOver } = useSelector((state) => state.game);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRandomPieces());
  }, []);

  return (
    <div className="bg-zinc-800 max-h-screen min-h-screen min-w-screen max-w-screen">
      <div className="relative pt-8 mx-auto" style={{ width: '40rem' }}>
        <GameBoard />
        <div className="absolute top-0 mt-6" style={{ right: '-175px' }}>
          <div className="w-40">
            <div className="text-white text-center font-bold uppercase">Score</div>
            <div className="stat-value text-white text-center">{score}</div>
            {isOver && (
              <div className="text-red-500 font-bold text-center uppercase">Game Over</div>
            )}
          </div>
        </div>
        <div className="mt-6 w-full h-40 grid gap-6 grid-cols-3">
          {gamePieces.map((piece, i) => (
            <div
              className="flex mx-auto w-48 h-48 bg-blue-400/75 rounded-lg"
              style={{
                boxShadow: 'inset 0 2px 6px 1px rgb(0 0 0 / 0.40)'
              }}
              key={piece.id}>
              <div className="flex mx-auto items-center">
                {!piece.isValid && <GamePiece pieceData={piece} xOffset={220 * i} />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
