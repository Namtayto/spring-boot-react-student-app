import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import thunk from "redux-thunk";
import { authReducer } from "./Auth/Reducer";
import { noticeReducer } from "./Notice/Reducer";
import { studentReducer } from "./Admin/Reducer";

const rootReducers = combineReducers({
  auth: authReducer,
  notice: noticeReducer,
  user: studentReducer,
});

export const store = legacy_createStore(rootReducers, applyMiddleware(thunk));
