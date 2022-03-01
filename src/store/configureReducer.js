import { combineReducers, applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import activeGamePieceReducer from './reducers/activeGamePiece';
import gameReducer from './reducers/game';
import selectableGamePieces from './reducers/selectableGamePieces';

const rootReducer = combineReducers({
  activeGamePiece: activeGamePieceReducer,
  game: gameReducer,
  selectableGamePieces: selectableGamePieces
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export { store };
