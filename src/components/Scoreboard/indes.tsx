import React from 'react';

import { IGameState } from '../../models/GameState.model';

type Props = {
  gameState: IGameState;
  isMultiplayer: boolean;
  username: string;
};

const Scoreboard = ({ gameState, isMultiplayer, username }: Props) => {
  return (
    <>
      <div className="text-white text-center font-bold uppercase">
        {isMultiplayer ? username : 'Score'}
      </div>
      <div className="text-white text-center stat-value">{gameState.score}</div>
      {gameState.isOver && (
        <div className="text-red-500 text-center font-bold uppercase">Game Over</div>
      )}
    </>
  );
};

export default Scoreboard;
