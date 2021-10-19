import { applyMiddleware, combineReducers, compose, createStore } from "redux"
import thunk from "redux-thunk";
import authReducer from "./AuthReducer";

// const rootReducer = {
//     auth: authReducer,
//     library: LibraryReducer,
// }

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    authReducer,
    // combineReducers(rootReducer),
    composeEnhancers(applyMiddleware(thunk))
);

export default store;