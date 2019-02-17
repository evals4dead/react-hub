import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import rootReducer from './modules';
import penderMiddleware from 'redux-pender';

const reducers = combineReducers(rootReducer);
const middlewares = [penderMiddleware()];

const isDev = process.env.NODE_ENV === 'development';
const devTools = isDev && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const composeEnhancers = devTools || compose;

const configure = (preloadedState) => createStore(reducers, preloadedState, composeEnhancers(applyMiddleware(...middlewares)));

export default configure;