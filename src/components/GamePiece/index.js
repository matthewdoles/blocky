import React, { useState } from 'react';

const GamePiece = () => {
  const [gamePiece] = useState([true, false, false, true, false, false, true, true, true]);

  return (
    <div className="grid grid-cols-3">
      {gamePiece.map((val) => (
        <div
          key={val}
          className={
            val ? 'w-12 h-12 rounded bg-emerald-300' : 'w-12 h-12 border-transparent bg-transparent'
          }
          style={val ? { boxShadow: 'inset 0 2px 3px 0px rgb(0 0 0 / 0.40)' } : {}}></div>
      ))}
    </div>
  );
};

export default GamePiece;
