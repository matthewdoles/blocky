import React, { SyntheticEvent, useEffect, useState } from 'react';

import GameBoard from './components/GameBoard';
import GamePiece from './components/GamePiece';
import { piecesCatalog, gameBoard } from './const';
import { themes } from './const/themes';
import { checkGameOver } from './functions';
import { IActiveGamePiece } from './models/ActiveGamePiece.model';
import { ISelectableGamePiece } from './models/GamePiece.model';
import { IGameState } from './models/GameState.model';
import { IGameBoardPiece } from './models/GameBoardPiece.model';
import './App.css';

function App() {
  const [dataTheme, setDataTheme] = useState<string>('blueGreen');
  const [activePiece, setActivePiece] = useState<IActiveGamePiece>({
    x: -200,
    y: -200,
    gamePiece: {
      ...piecesCatalog[Math.floor(Math.random() * piecesCatalog.length)],
      id: 0,
      isValid: false
    }
  });
  const [gamePieces, setGamePieces] = useState<ISelectableGamePiece[]>([]);
  const [piecesUsed, setPiecesUsed] = useState<number>(0);
  const [gameState, setGameState] = useState<IGameState>({
    addedPoints: 0,
    gameBoard: gameBoard,
    isOver: false,
    score: 0
  });

  useEffect(() => {
    getRandomPieces();
  }, []);

  const getRandomPieces = () => {
    let i = 0;
    let randomPieces = [];
    while (i < 3) {
      randomPieces.push({
        ...piecesCatalog[Math.floor(Math.random() * piecesCatalog.length)],
        id: piecesUsed + i,
        isValid: false
      });
      i++;
    }

    setPiecesUsed(piecesUsed + 4);
    setGamePieces(randomPieces);
    checkIfGameOver(randomPieces);
  };

  const updateGamePieceValid = (id: number) => {
    const updatedPieces = [...gamePieces];
    const gamePieceIndex = updatedPieces.findIndex((piece) => piece.id === id);
    if (gamePieceIndex !== -1) {
      updatedPieces[gamePieceIndex].isValid = true;
    }
    setGamePieces(updatedPieces);

    if (updatedPieces.every((piece) => piece.isValid)) {
      getRandomPieces();
    } else {
      checkIfGameOver(updatedPieces);
    }
  };

  const updateGameState = (gameBoard: IGameBoardPiece[], score: number) =>
    setGameState((currState: IGameState) => {
      return {
        ...currState,
        addedPoints: score,
        gameBoard,
        score: currState.score + score
      };
    });

  const checkIfGameOver = (pieces: ISelectableGamePiece[]) => {
    if (!checkGameOver(gameState.gameBoard, pieces)) {
      setGameState((currState) => {
        return {
          ...currState,
          isOver: true
        };
      });
    }
  };

  return (
    <div
      className="bg-zinc-800 max-h-screen min-h-screen max-w-screen min-w-screen"
      data-theme={dataTheme}>
      <div className="relative pt-8 mx-auto" style={{ maxWidth: '40rem', minWidth: '40rem' }}>
        <GameBoard
          activeGamePiece={activePiece}
          gameBoard={gameState.gameBoard}
          updateGame={updateGameState}
          updateGamePieceValid={updateGamePieceValid}
        />
        <div className="absolute top-0 mt-7" style={{ right: '-200px' }}>
          <div className="w-44">
            <div className="text-white text-center font-bold uppercase">Score</div>
            <div className="text-white text-center stat-value">{gameState.score}</div>
            {gameState.isOver && (
              <div className="text-red-500 text-center font-bold uppercase">Game Over</div>
            )}
            <div className="mt-6 form-control w-full">
              <label className="label justify-center">
                <span className="font-bold">Accent</span>
              </label>
              <select
                className=" w-full select select-secondary border-4 font-bold"
                defaultValue={dataTheme}
                onChange={(e: SyntheticEvent<HTMLSelectElement, Event>) =>
                  setDataTheme(e.currentTarget.value)
                }>
                {themes.map((theme) => (
                  <option key={theme.name} value={theme.name}>
                    {theme.accent}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="w-full mt-6 h-40 grid gap-6 grid-cols-3">
          {gamePieces.map((piece, i) => (
            <div
              className="w-48 h-48 flex mx-auto bg-primary rounded-lg"
              style={{
                boxShadow: 'inset 0 2px 6px 1px rgb(0 0 0 / 0.40)'
              }}
              key={piece.id}>
              <div className="flex mx-auto items-center">
                {!piece.isValid && (
                  <GamePiece
                    gamePiece={piece}
                    setActivePiece={(piece) => setActivePiece(piece)}
                    xOffset={220 * i}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
