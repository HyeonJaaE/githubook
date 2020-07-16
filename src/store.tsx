import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import loggerMiddleware from "./lib/loggerMiddleware";

const initialState = {};
const middleware = [thunk, loggerMiddleware];

const store = createStore(rootReducer, initialState, compose(applyMiddleware(...middleware)));

export default store;

/*
createStore(reducer, [preloadedState], [enhancer])
compose to enhance a store with applyMiddleware and a few developer tools from the redux-devtools package.
*/
