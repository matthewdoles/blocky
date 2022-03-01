import { gameBoard } from 'const';

export const UPDATE_SCORE = 'UPDATE_SCORE';
export const GAME_OVER = 'GAME_OVER';

const INITIAL_STATE = {
  score: 0,
  addedPoints: 0,
  isOver: false,
  gameBoard: gameBoard
};

export default function gameReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case UPDATE_SCORE: {
      return {
        ...state,
        gameBoard: action.gameBoard,
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

export function updateGame(gameBoard, score) {
  return async (dispatch) => {
    dispatch({
      type: UPDATE_SCORE,
      gameBoard,
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
