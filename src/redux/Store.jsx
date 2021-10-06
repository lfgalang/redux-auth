import { applyMiddleware, compose, createStore } from "redux"
import thunk from "redux-thunk";
import authReducer from "./Reducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    authReducer,
    composeEnhancers(applyMiddleware(thunk))
);

export default store;