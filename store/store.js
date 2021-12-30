import { applyMiddleware, createStore } from "redux";

import { composeWithDevTools } from "redux-devtools-extension";
import { createLogger } from "redux-logger";
import reducer from "./reducer";
import thunkMiddleware from "redux-thunk";

const MiddlewareWithDevtools = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger())
);

const store = createStore(
  reducer,
  MiddlewareWithDevtools
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
