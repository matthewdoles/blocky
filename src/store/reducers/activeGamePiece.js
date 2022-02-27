export const UPDATE_PIECE = 'UPDATE_PIECE';

const INITIAL_STATE = {
  x: -100,
  y: -100,
  gamePiece: []
};

export default function activeGamePieceReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case UPDATE_PIECE: {
      return {
        ...state,
        ...action.pieceData
      };
    }
    default:
      return { ...state };
  }
}

export function updateActivePiece(pieceData) {
  return async (dispatch) => {
    dispatch({
      type: UPDATE_PIECE,
      pieceData
    });
  };
}
