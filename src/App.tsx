import React, { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { BounceLoader } from 'react-spinners';

import ColorPicker from './components/ColorPicker';
import GameBoard from './components/GameBoard';
import GamePiece from './components/GamePiece';
import MiniGameBoard from './components/MiniGameBoard';
import MultiplayerForm from './components/MultiplayerForm';
import MulitplayerGameOver from './components/MultiplayerGameOver';
import Scoreboard from './components/Scoreboard/indes';
import { blankGameBoard, piecesCatalog, initLobbyState, INVALID, initActivePiece } from './const';
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
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [activePiece, setActivePiece] = useState<IActiveGamePiece>(initActivePiece);
  const [gamePieces, setGamePieces] = useState<ISelectableGamePiece[]>([]);
  const [piecesUsed, setPiecesUsed] = useState<number>(0);
  const [gameState, setGameState] = useState<IGameState>({
    addedPoints: 0,
    gameBoard: JSON.parse(JSON.stringify(blankGameBoard)),
    isOver: false,
    score: 0
  });

  useEffect(() => {
    getRandomPieces();
  }, []);

  const joinLobby = (username: string, profileImage: string) => {
    const newSocket = io(`http://localhost:8080`);
    setSocket(newSocket);

    const newGameState = {
      addedPoints: 0,
      gameBoard: JSON.parse(JSON.stringify(blankGameBoard)),
      isOver: false,
      score: 0
    };
    newSocket.emit(
      'joinLobby',
      {
        id: newSocket.id,
        gameState: newGameState,
        username,
        profileImage
      },
      (error: string) => {
        if (error) {
          return setError(error);
        }
      }
    );
    if (error.length === 0) {
      setGameState(newGameState);
      setActivePiece(initActivePiece);
      getRandomPieces();
    }
  };

  socket?.on('userLeft', () => {
    setLobby(initLobbyState);
  });

  socket?.on('updateLobby', (lobby: ILobby) => {
    setLobby(lobby);
    if (lobby.users.length === 1) {
      return setIsSearching(true);
    }
    setIsSearching(false);

    if (lobby.users.every((u) => u.gameState.isOver)) {
      return setGameOver(true);
    }
    lobby.users.forEach((u) => {
      setGameOver(u.id !== socket.id && u.gameState.isOver && u.gameState.score < gameState.score);
    });
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
      if (socket) {
        socket?.emit('updateGameOver', { lobbyId: lobby.lobbyId, isOver: true }, (error) => {
          if (error) {
            return setError(error);
          }
        });
      }
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
        <div className="absolute top-0 mt-7" style={{ left: '-220px' }}>
          {isSearching && (
            <div className="flex flex-col items-center">
              <p className="text-white font-bold text-lg mb-2">Searching for player...</p>
              <BounceLoader color="rgb(96 165 250)" loading={isSearching} />
            </div>
          )}
          {lobby.users.length > 1 && (
            <div className="w-50">
              <div className="my-2">
                <MiniGameBoard user={lobby.users.filter((u) => u.id !== socket?.id)[0]} />
              </div>
              <Scoreboard
                gameState={
                  lobby.users.filter((u) => u.id !== socket?.id).map((gs) => gs.gameState)[0]
                }
                isMultiplayer={true}
                username={lobby.users.filter((u) => u.id !== socket?.id).map((u) => u.username)[0]}
              />
            </div>
          )}
        </div>
        <div className="absolute top-0 mt-7" style={{ right: '-200px' }}>
          <div className="w-44">
            <Scoreboard
              gameState={gameState}
              isMultiplayer={lobby.users.length > 1}
              username={lobby.users.filter((u) => u.id === socket?.id).map((u) => u.username)[0]}
            />
            <ColorPicker dataTheme={dataTheme} setDataTheme={(theme) => setDataTheme(theme)} />
            {lobby.users.length !== 2 && !isSearching && (
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
                    isSearching={isSearching}
                    setActivePiece={(piece) => setActivePiece(piece)}
                    xOffset={220 * i}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {lobby.lobbyId === INVALID && <MultiplayerForm error={error} joinLobby={joinLobby} />}
      <MulitplayerGameOver gameOver={gameOver} lobby={lobby} />
    </div>
  );
}

export default App;
