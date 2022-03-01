export const UPDATE_SCORE = 'UPDATE_SCORE';
export const GAME_OVER = 'GAME_OVER';

const INITIAL_STATE = {
  score: 0,
  addedPoints: 0,
  isOver: false
};

export default function gameReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case UPDATE_SCORE: {
      return {
        ...state,
        addedPoints: action.score,
        score: state.score + action.score
      };
    }
    case GAME_OVER: {
      return {
        ...state,
        isOver: action.isOver
      };
    }
    default:
      return { ...state };
  }
}

export function updateScore(score) {
  return async (dispatch) => {
    dispatch({
      type: UPDATE_SCORE,
      score
    });
  };
}

export function updateGameOver(isOver) {
  return async (dispatch) => {
    dispatch({
      type: GAME_OVER,
      isOver
    });
  };
}
