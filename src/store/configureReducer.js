import { combineReducers, applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import activeGamePieceReducer from './reducers/activeGamePiece';
import selectableGamePieces from './reducers/selectableGamePieces';

const rootReducer = combineReducers({
  activeGamePiece: activeGamePieceReducer,
  selectableGamePieces: selectableGamePieces
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export { store };
