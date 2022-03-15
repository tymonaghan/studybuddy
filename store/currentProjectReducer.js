const Axios = require("axios");

//action type constants
const SET_CURRENT_PROJECT_ID = "SET_CURRENT_PROJECT_ID";

// const TRASH_PROJECT = "TRASH_PROJECT";

// action creator

export const setCurrentProjectId = (projectId) => {
  return { type: SET_CURRENT_PROJECT_ID, projectId };
};

//thunk creator

export function currentProjectReducer(state = NaN, action) {
  switch (action.type) {
    case SET_CURRENT_PROJECT_ID:
      return action.projectId;
    default:
      return state;
  }
}
