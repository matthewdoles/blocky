import React from 'react';
import { ILobby } from '../../models/Lobby.model';

type Props = {
  gameOver: boolean;
  lobby: ILobby;
};

const MulitplayerGameOver = ({ gameOver, lobby }: Props) => {
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
          {lobby.users.map((u) => (
            <div key={u.id}>
              <h3 className="font-bold text-lg">Congratulations random Interner user!</h3>
              <p className="py-4">
                You've been selected for a chance to get one year of subscription to use Wikipedia
                for free!
              </p>
              <div className="modal-action">
                <label htmlFor="game-over-modal" className="btn">
                  Yay!
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MulitplayerGameOver;
