import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import GameBoard from 'components/GameBoard';
import GamePiece from 'components/GamePiece';
import { getRandomPieces } from 'store/reducers/selectableGamePieces';
import './App.css';

function App() {
  const { gamePieces } = useSelector((state) => state.selectableGamePieces);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRandomPieces());
  }, []);

  return (
    <div className="bg-zinc-800 min-h-screen">
      <div className="pt-8 mx-auto" style={{ width: '40rem' }}>
        <GameBoard />
        <div className="mt-6 w-full h-40 grid gap-6 grid-cols-3">
          {gamePieces.map((piece, i) => (
            <div
              className="flex mx-auto w-48 h-48 bg-blue-400/75 rounded-lg"
              style={{
                boxShadow: 'inset 0 2px 6px 1px rgb(0 0 0 / 0.40)'
              }}
              key={i}>
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
