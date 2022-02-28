import React, { useState } from 'react';
import Draggable from 'react-draggable';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { updateActivePiece } from 'store/reducers/activeGamePiece';

const GamePiece = ({ pieceData, xOffset }) => {
  const [gamePiece] = useState(pieceData);
  const [isBeingDragged, setIsBeingDragged] = useState(false);
  const dispatch = useDispatch();

  const handleStart = () => {
    setIsBeingDragged(true);
  };

  const handleStop = (e, position) => {
    const { x, y } = position;
    let calcX = x + xOffset + (gamePiece.cols === 1 ? 64 : gamePiece.cols === 2 ? 32 : 0);
    let calcY = Math.abs(y + (gamePiece.rows === 1 ? 150 : gamePiece.rows === 2 ? 180 : 217));
    setIsBeingDragged(false);
    dispatch(
      updateActivePiece({
        x: calcX,
        y: calcY,
        gamePiece
      })
    );
  };

  return (
    <Draggable onStart={handleStart} onStop={handleStop} position={{ x: 0, y: 0 }}>
      <div
        className={
          gamePiece.cols === 4
            ? 'grid grid-flow-row grid-cols-4'
            : gamePiece.cols === 3
            ? 'grid grid-flow-row grid-cols-3'
            : gamePiece.cols === 2
            ? 'grid grid-flow-row grid-cols-2'
            : 'grid grid-flow-row grid-cols-1'
        }>
        {gamePiece.structure.map((val, i) => (
          <div
            key={i}
            className={
              val.isFilled
                ? `${isBeingDragged ? 'w-16 h-16' : 'w-12 h-12'} rounded bg-emerald-300`
                : `${isBeingDragged ? 'w-16 h-16' : 'w-12 h-12'} border-transparent bg-transparent`
            }
            style={
              val.isFilled ? { boxShadow: 'inset 0 2px 3px 0px rgb(0 0 0 / 0.40)' } : {}
            }></div>
        ))}
      </div>
    </Draggable>
  );
};

export default GamePiece;

GamePiece.propTypes = {
  pieceData: PropTypes.object,
  xOffset: PropTypes.number
};
