import React, { useEffect, useState } from 'react';
import { ILobby } from '../../models/Lobby.model';
import Scoreboard from '../Scoreboard/indes';

type Props = {
  disconnectSocket: () => void;
  gameOver: boolean;
  lobby: ILobby;
  socketId: string;
};

const MulitplayerGameOver = ({ disconnectSocket, gameOver, lobby, socketId }: Props) => {
  const [isWinner, setIsWinner] = useState<boolean>(false);

  useEffect(() => {
    if (lobby.users.length === 2) {
      if (
        lobby.users[0].id === socketId &&
        lobby.users[0].gameState.score > lobby.users[1].gameState.score
      )
        return setIsWinner(true);
      if (
        lobby.users[1].id === socketId &&
        lobby.users[1].gameState.score > lobby.users[0].gameState.score
      )
        return setIsWinner(true);
      setIsWinner(false);
    }
  }, [lobby.users, socketId]);
  return (
    <>
      <input
        type="checkbox"
        id="game-over-modal"
        className="modal-toggle"
        checked={gameOver}
        readOnly
      />
      <div className="modal">
        <div className="modal-box">
          <p
            className={
              isWinner
                ? 'text-secondary text-center font-bold text-2xl'
                : 'text-rose-500 text-center font-bold text-2xl'
            }>
            {isWinner ? 'Congratulations!' : 'Sorry!'}
          </p>
          <p></p>
          <div className="flex justify-evenly my-8">
            {lobby.users.map((u) => (
              <div key={u.id} className="mx-8">
                <Scoreboard
                  gameState={u.gameState}
                  isMultiplayer={lobby.users.length > 1}
                  showGameOver={false}
                  username={u.username}
                />
              </div>
            ))}
          </div>
          <div className="modal-action">
            <label
              htmlFor="game-over-modal"
              className="btn bg-secondary border-0 text-white font-bold"
              onClick={disconnectSocket}>
              Close
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default MulitplayerGameOver;
