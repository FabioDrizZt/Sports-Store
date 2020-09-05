import { createStore, compose, applyMiddleware } from "redux";
import rootReducer from "../reducers/index";
import thunk from "redux-thunk";

const store = createStore(
    rootReducer,
    window.REDUX_DEVTOOLS_EXTENSION && window.REDUX_DEVTOOLS_EXTENSION(),
    applyMiddleware(thunk)
);

export default store;