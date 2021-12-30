import { applyMiddleware, createStore } from "redux";

import { composeWithDevTools } from "redux-devtools-extension";
import { createLogger } from "redux-logger";
import reducer from "./reducer";
import thunkMiddleware from "redux-thunk";

const MiddlewareWithDevtools = composeWithDevTools(
  //wrapping the applyMiddleWare like this enabled redux devtools via the redux-devtools-extension package
  applyMiddleware(thunkMiddleware, createLogger())
);

const store = createStore(reducer, MiddlewareWithDevtools);

export default store;
