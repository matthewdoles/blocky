import { gamePieces } from 'const';

export const SET_PIECES = 'SET_PIECES';

const INITIAL_STATE = {
  gamePieces: []
};

export default function selectableGamePieces(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_PIECES: {
      return {
        ...state,
        gamePieces: action.gamePieces
      };
    }
    default:
      return { ...state };
  }
}

export function getRandomPieces() {
  return async (dispatch) => {
    let i = 0;
    let randomPieces = [];
    while (i < 3) {
      randomPieces.push({
        ...gamePieces[Math.floor(Math.random() * gamePieces.length)],
        isValid: false,
        id: i
      });
      i++;
    }
    dispatch({
      type: SET_PIECES,
      gamePieces: randomPieces
    });
  };
}

export function updateGamePieceValid(id, isValid) {
  return async (dispatch, getState) => {
    const { selectableGamePieces } = getState();
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
    }
  };
}
