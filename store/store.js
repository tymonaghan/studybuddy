import { applyMiddleware, createStore } from "redux";

import { createLogger } from "redux-logger";
import reducer from "./reducer";
import thunkMiddleware from "redux-thunk";

const store = createStore(
  reducer,
  applyMiddleware(thunkMiddleware, createLogger())
);

export default store;
