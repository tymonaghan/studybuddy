import { applyMiddleware, createStore, combineReducers } from "redux";

import { composeWithDevTools } from "redux-devtools-extension";
import { createLogger } from "redux-logger";
import {
  currentProjectReducer as currentProjectId,
  currentNotesReducer as currentNotes,
} from "./reducer";
import { projectsReducer as projects } from "./projectsReducer";
import { currentSourcesReducer as currentSources } from "./sourcesReducer";

import { authReducer as auth } from "./authReducer";
import thunkMiddleware from "redux-thunk";

export const combinedReducer = combineReducers({
  auth,
  projects,
  currentProjectId,
  currentSources,
  currentNotes,
});

const MiddlewareWithDevtools = composeWithDevTools(
  //wrapping the applyMiddleWare like this enabled redux devtools via the redux-devtools-extension package
  applyMiddleware(thunkMiddleware, createLogger())
);

const store = createStore(combinedReducer, MiddlewareWithDevtools);

export default store;
