import React, { useState } from 'react';
import Draggable from 'react-draggable';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { updateActivePiece } from 'store/reducers/activeGamePiece';

const GamePiece = ({ xOffset }) => {
  const [gamePiece] = useState([true, false, false, true, false, false, true, true, true]);
  const [isBeingDragged, setIsBeingDragged] = useState(false);
  const dispatch = useDispatch();

  const handleStart = () => {
    setIsBeingDragged(true);
  };

  const handleStop = (e, position) => {
    const { x, y } = position;
    dispatch(updateActivePiece({ x: x + xOffset, y: Math.abs(y + 217), gamePiece }));
  };

  return (
    <Draggable onStart={handleStart} onStop={handleStop}>
      <div className="grid grid-cols-3">
        {gamePiece.map((val, i) => (
          <div
            key={i}
            className={
              val
                ? `${isBeingDragged ? 'w-16 h-16' : 'w-12 h-12'} rounded bg-emerald-300`
                : `${isBeingDragged ? 'w-16 h-16' : 'w-12 h-12'} border-transparent bg-transparent`
            }
            style={val ? { boxShadow: 'inset 0 2px 3px 0px rgb(0 0 0 / 0.40)' } : {}}></div>
        ))}
      </div>
    </Draggable>
  );
};

export default GamePiece;

GamePiece.propTypes = {
  xOffset: PropTypes.number
};
