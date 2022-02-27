import React, { useState } from 'react';

const GameBoard = () => {
  const [values] = useState(Array.from(Array(100).keys()));

  return (
    <div className="grid grid-cols-10">
      {values.map((val) => (
        <div
          key={val}
          className="w-16 h-16 border-zinc-900 rounded bg-blue-400/75"
          style={{ borderWidth: '1px', boxShadow: 'inset 0 2px 6px 1px rgb(0 0 0 / 0.40)' }}></div>
      ))}
    </div>
  );
};

export default GameBoard;
