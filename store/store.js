import { applyMiddleware, createStore, combineReducers } from "redux";

import { composeWithDevTools } from "redux-devtools-extension";
import { createLogger } from "redux-logger";
import {
  authReducer,
  projectsReducer,
  currentProjectReducer,
  currentSourcesReducer,
} from "./reducer";
import thunkMiddleware from "redux-thunk";

export const combinedReducer = combineReducers({
  auth: authReducer,
  projects: projectsReducer,
  currentProjectId: currentProjectReducer,
  currentSources: currentSourcesReducer,
});

const MiddlewareWithDevtools = composeWithDevTools(
  //wrapping the applyMiddleWare like this enabled redux devtools via the redux-devtools-extension package
  applyMiddleware(thunkMiddleware, createLogger())
);

const store = createStore(combinedReducer, MiddlewareWithDevtools);

export default store;
