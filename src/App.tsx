import React, { SyntheticEvent, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

import GameBoard from './components/GameBoard';
import GamePiece from './components/GamePiece';
import MiniGameBoard from './components/MiniGameBoard';
import MultiplayerForm from './components/MultiplayerForm';
import Scoreboard from './components/Scoreboard/indes';
import { piecesCatalog, gameBoard, initLobbyState, INVALID } from './const';
import { themes } from './const/themes';
import { checkGameOver } from './functions';
import { IActiveGamePiece } from './models/ActiveGamePiece.model';
import { ISelectableGamePiece } from './models/GamePiece.model';
import { IGameState } from './models/GameState.model';
import { IGameBoardPiece } from './models/GameBoardPiece.model';
import { ILobby } from './models/Lobby.model';
import { IClientToServerEvents, IServerToClientEvents } from './models/ClientToServerEvent.model';
import './App.css';

function App() {
  const [dataTheme, setDataTheme] = useState<string>('blueGreen');
  const [socket, setSocket] = useState<Socket<IServerToClientEvents, IClientToServerEvents>>();
  const [lobby, setLobby] = useState<ILobby>(initLobbyState);
  const [error, setError] = useState<string>('');
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
    const newSocket = io(`http://localhost:8080`);
    setSocket(newSocket);
  }, []);

  const joinLobby = (username: string, profileImage: string) => {
    const newGameState = { addedPoints: 0, gameBoard: gameBoard, isOver: false, score: 0 };
    socket?.emit(
      'joinLobby',
      {
        id: socket.id,
        gameState: newGameState,
        username,
        profileImage
      },
      (error) => {
        if (error) {
          return setError(error);
        }
        setGameState(newGameState);
      }
    );
  };
  socket?.on('userLeft', () => {
    setLobby(initLobbyState);
  });

  socket?.on('updateLobby', (lobby: ILobby) => {
    setLobby(lobby);
    console.log(lobby);
  });

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

  const updateGameState = (gameBoard: IGameBoardPiece[], score: number) => {
    setGameState((currState: IGameState) => {
      return {
        ...currState,
        addedPoints: score,
        gameBoard,
        score: currState.score + score
      };
    });
    if (socket) {
      socket?.emit(
        'updateUserGameState',
        {
          lobbyId: lobby.lobbyId,
          gameBoard,
          addedPoints: score
        },
        (error) => {
          if (error) {
            return setError(error);
          }
        }
      );
    }
  };

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
    <>
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
          {lobby.users.length > 1 && (
            <div className="absolute top-0 mt-7" style={{ left: '-220px' }}>
              <div className="w-50">
                <Scoreboard
                  gameState={
                    lobby.users.filter((u) => u.id !== socket?.id).map((gs) => gs.gameState)[0]
                  }
                  isMultiplayer={true}
                  username={
                    lobby.users.filter((u) => u.id !== socket?.id).map((u) => u.username)[0]
                  }
                />
                <div className="mt-6">
                  <MiniGameBoard user={lobby.users.filter((u) => u.id !== socket?.id)[0]} />
                </div>
              </div>
            </div>
          )}
          <div className="absolute top-0 mt-7" style={{ right: '-200px' }}>
            <div className="w-44">
              <Scoreboard
                gameState={gameState}
                isMultiplayer={lobby.users.length > 1}
                username={lobby.users.filter((u) => u.id === socket?.id).map((u) => u.username)[0]}
              />
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
              {lobby.users.length !== 2 && (
                <label
                  htmlFor="multiplayer-modal"
                  className="w-full mt-4 btn btn-secondary text-white font-bold">
                  Multiplayer
                </label>
              )}
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
      {lobby.lobbyId === INVALID && (
        <MultiplayerForm dataTheme={dataTheme} error={error} joinLobby={joinLobby} />
      )}
    </>
  );
}

export default App;
