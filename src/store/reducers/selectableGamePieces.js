import { gamePieces } from 'const';
import { checkGameOver } from 'functions';
import { updateGameOver } from './game';

export const SET_PIECES = 'SET_PIECES';
export const SET_PIECE_NUMBER = 'SET_PIECE_NUMBER';

const INITIAL_STATE = {
  gamePieces: [],
  pieceNumber: 1
};

export default function selectableGamePieces(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_PIECES: {
      return {
        ...state,
        gamePieces: action.gamePieces
      };
    }
    case SET_PIECE_NUMBER: {
      return {
        ...state,
        pieceNumber: action.pieceNumber
      };
    }
    default:
      return { ...state };
  }
}

export function getRandomPieces() {
  return async (dispatch, getState) => {
    const { game, selectableGamePieces } = getState();
    let i = 0;
    let randomPieces = [];
    while (i < 3) {
      randomPieces.push({
        ...gamePieces[Math.floor(Math.random() * gamePieces.length)],
        isValid: false,
        id: selectableGamePieces.pieceNumber + i
      });
      i++;
    }
    dispatch({
      type: SET_PIECES,
      gamePieces: randomPieces
    });
    dispatch({
      type: SET_PIECE_NUMBER,
      pieceNumber: selectableGamePieces.pieceNumber + 4
    });
    if (!checkGameOver(game.gameBoard, randomPieces)) {
      dispatch(updateGameOver(true));
    }
  };
}

export function updateGamePieceValid(id, isValid) {
  return async (dispatch, getState) => {
    const { game, selectableGamePieces } = getState();
    const updatedPieces = [...selectableGamePieces.gamePieces];
    const gamePieceIndex = updatedPieces.findIndex((piece) => piece.id === id);
    if (gamePieceIndex !== -1) {
      updatedPieces[gamePieceIndex].isValid = isValid;
    }
    dispatch({
      type: SET_PIECES,
      gamePieces: updatedPieces
    });

    if (updatedPieces.every((piece) => piece.isValid)) {
      dispatch(getRandomPieces());
    } else if (!checkGameOver(game.gameBoard, updatedPieces)) {
      dispatch(updateGameOver(true));
    }
  };
}
