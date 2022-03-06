import React from 'react';

import { IUser } from '../../models/User.model';

type Props = {
  user: IUser;
};

const MiniGameBoard = ({ user }: Props) => {
  return (
    <div className="grid grid-cols-10">
      {user.gameState.gameBoard.map((val, i) => (
        <div
          key={i}
          className={
            val.isFilled
              ? 'w-5 h-5 border-zinc-900 rounded-xs bg-secondary'
              : 'w-5 h-5 border-zinc-900 rounded-xs bg-primary'
          }
          style={{
            borderWidth: '1px',
            boxShadow: 'inset 0 1px 3px 1px rgb(0 0 0 / 0.40)'
          }}></div>
      ))}
    </div>
  );
};

export default MiniGameBoard;
