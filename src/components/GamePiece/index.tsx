import React, { useRef, useState } from 'react';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';

import { IActiveGamePiece } from '../../models/ActiveGamePiece.model';
import { ISelectableGamePiece } from '../../models/GamePiece.model';

type Props = {
  gamePiece: ISelectableGamePiece;
  setActivePiece: (gamePiece: IActiveGamePiece) => void;
  xOffset: number;
};

const GamePiece = ({ gamePiece, setActivePiece, xOffset }: Props) => {
  const [isBeingDragged, setIsBeingDragged] = useState(false);
  const nodeRef = useRef<HTMLDivElement>(null);

  const handleStop = (_e: DraggableEvent, position: DraggableData) => {
    const { x, y } = position;
    let calcX = x + xOffset + (gamePiece.cols === 1 ? 64 : gamePiece.cols === 2 ? 32 : 0);
    let belowYAxis =
      gamePiece.rows === 1 && y > -130
        ? true
        : gamePiece.rows === 2 && y > -160
        ? true
        : gamePiece.rows === 3 && y > -197
        ? true
        : false;
    let calcY = belowYAxis
      ? -200
      : Math.abs(y + (gamePiece.rows === 1 ? 150 : gamePiece.rows === 2 ? 180 : 217));
    setIsBeingDragged(false);
    setActivePiece({
      x: calcX,
      y: calcY,
      gamePiece
    });
  };

  return (
    <Draggable
      nodeRef={nodeRef}
      onStart={() => setIsBeingDragged(true)}
      onStop={handleStop}
      position={{ x: 0, y: 0 }}>
      <div
        ref={nodeRef}
        className={`grid grid-flow-row
          ${
            gamePiece.cols === 3
              ? 'grid-cols-3'
              : gamePiece.cols === 2
              ? 'grid-cols-2'
              : 'grid-cols-1'
          }`}>
        {gamePiece.structure.map((piece, i) => (
          <div
            key={i}
            className={
              piece.isFilled
                ? `${isBeingDragged ? 'w-16 h-16' : 'w-12 h-12'} rounded bg-secondary`
                : `${isBeingDragged ? 'w-16 h-16' : 'w-12 h-12'} border-transparent bg-transparent`
            }
            style={
              piece.isFilled ? { boxShadow: 'inset 0 2px 3px 0px rgb(0 0 0 / 0.40)' } : {}
            }></div>
        ))}
      </div>
    </Draggable>
  );
};

export default GamePiece;
