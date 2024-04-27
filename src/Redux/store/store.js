import { applyMiddleware, createStore } from "redux";
import { rootReducers } from "../reducers/rootReducer";
import { thunk } from "redux-thunk";


export const store = createStore(rootReducers,applyMiddleware(thunk))

