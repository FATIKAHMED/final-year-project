// * Redux
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers";
import thunk from "redux-thunk";
import { persistStore } from 'redux-persist';

// * Middlewares
// import logMiddleware from 'redux/middlewares/log'
// import apiMiddleware from 'redux/middlewares/api'
import toastMiddleware from 'redux/middlewares/toast'

const initialState = {};
const middlewares = [thunk, toastMiddleware];

const middleware = [
    applyMiddleware(...middlewares),
    ...(window.__REDUX_DEVTOOLS_EXTENSION__
        ? [window.__REDUX_DEVTOOLS_EXTENSION__()]
        : []),
];

export const store = createStore(
    rootReducer,
    initialState,
    compose(...middleware)
);
export const persistor = persistStore(store);

