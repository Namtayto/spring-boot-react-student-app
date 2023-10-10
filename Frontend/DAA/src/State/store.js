import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import thunk from "redux-thunk";
import { authReducer } from "./Auth/Reducer";
import { noticeReducer } from "./Notice/Reducer";

const rootReducers = combineReducers({
  auth: authReducer,
  notice: noticeReducer,
});

export const store = legacy_createStore(rootReducers, applyMiddleware(thunk));
