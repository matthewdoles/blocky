import { combineReducers, applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import activeGamePieceReducer from './reducers/activeGamePiece';

const rootReducer = combineReducers({ activeGamePiece: activeGamePieceReducer });

const store = createStore(rootReducer, applyMiddleware(thunk));

export { store };
