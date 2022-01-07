import { Navigate } from "react-router-dom";
import { red } from "chalk";

const Axios = require("axios");
const TOKEN = "token";

//action type constants
const SET_AUTH = "SET_AUTH";
const SET_USER_PROJECTS = "SET_USER_PROJECTS";
const ADD_NEW_PROJECT = "ADD_NEW_PROJECT";
const SET_CURRENT_PROJECT_ID = "SET_CURRENT_PROJECT_ID";
const SET_CURRENT_SOURCES = "SET_CURRENT_SOURCES";
// const TRASH_PROJECT = "TRASH_PROJECT";

// action creator
const setUserProjects = (projects) => {
  return { type: SET_USER_PROJECTS, projects };
};

const setCurrentSources = (sources) => {
  console.log(`this is the sources from setCurrentSources action creator:`);
  console.dir(sources);
  return { type: SET_CURRENT_SOURCES, sources };
};

export const setCurrentProjectId = (projectId) => {
  return { type: SET_CURRENT_PROJECT_ID, projectId };
};

const addNewProject = (newProject) => {
  console.log(`logging newProject from addNewProject action creator:`);
  console.dir(newProject);
  return { type: ADD_NEW_PROJECT, newProject };
};

const setAuth = (auth) => {
  // action payload will be auth object
  // auth object will either contain db user object (id, username, pw, etc) or error object
  return { type: SET_AUTH, auth };
};

//thunk creator
export const addNewProjectToDb = (projectName, userId) => async (dispatch) => {
  try {
    const response = await Axios.post("/api/projects/addNew", {
      projectName,
      userId,
    });
    dispatch(addNewProject(response.data));
  } catch (error) {
    console.log(`error in addNewProjectToDb thunk: ${error}`);
  }
};

export const getCurrentProjectSourcesFromDb =
  (projectId) => async (dispatch) => {
    // take in the projectId number
    try {
      console.log(`getting current project sources. projectId is ${projectId}`);
      const response = await Axios.get(`/api/projects/${projectId}/getSources`);
      console.log(`logging response.data:`);
      console.dir(response.data);
      dispatch(setCurrentSources(response.data));
      //send that response to the setCurrentSources action creator
    } catch (error) {
      console.log(
        red(`error in getCurrentProjectSourcesFromDb (reducer file): ${error}`)
      );
    }
  };

export const checkForUserToken = () => async (dispatch) => {
  //checks browser storage for token and dispatches set auth action if found
  console.log(`checking local storage for user token`);
  const token = window.localStorage.getItem(TOKEN);
  //check local storage (user browser) for token
  if (token) {
    console.log(`token FOUND. attempting log in.`);
    const res = await Axios.get("/auth/getUserByToken", {
      //see server/auth.js loc40: router.get("/getUserByToken"
      headers: { authorization: token },
    });
    // if there's a token, look up the user and send that object into setAuth action creator
    return dispatch(setAuth(res.data));
  } else {
    // if there's no token, do nothing. state will continue not having "auth" object, so Login screen will render.
    console.log(`no token found, please log in`);
  }
};

export const retrieveUserProjectsFromDb = (userId) => async (dispatch) => {
  console.log(`Retrieving user projects from db... userId is ${userId}`);
  try {
    const response = await Axios.get(`/api/user/${userId}/projects`);
    console.log(`projects loaded from db. dispatching setUserProjects`);
    dispatch(setUserProjects(response.data));
  } catch (error) {
    console.log(`error in retrieveUserProjectsFromDb thunk creator: ${error}`);
  }
};

export const authenticate =
  (username, password, method) => async (dispatch) => {
    console.log(
      `this message generated from the reducer authenticate method\nusername: ${username}\npassword: ${password}\nmethod: ${method}`
    );
    // look up the user's token and try to add it to their browser local storage
    try {
      const res = await Axios.post(`/auth/${method}`, { username, password });
      window.localStorage.setItem(TOKEN, res.data.token);
      dispatch(checkForUserToken());
    } catch (authError) {
      return dispatch(setAuth({ error: authError }));
    }
  };

export const logout = () => {
  window.localStorage.removeItem(TOKEN);
  // history.push("/login"); <-- method from FS template app
  <Navigate to="/login" />; // <-- new method using React Router v6
  return {
    type: SET_AUTH,
    auth: {},
  };
};

//big ol' reducer:
export default function (
  state = { auth: {}, projects: [], currentProjectId: NaN, currentSources: [] }, // <-- default state
  action
) {
  switch (action.type) {
    case SET_AUTH:
      return { ...state, auth: { ...action.auth } };
    case SET_CURRENT_PROJECT_ID:
      return { ...state, currentProjectId: action.projectId };
    case SET_USER_PROJECTS:
      return { ...state, projects: [...action.projects] };
    case ADD_NEW_PROJECT:
      return {
        ...state,
        projects: [...state.projects, action.newProject],
      };
    case SET_CURRENT_SOURCES:
      return { ...state, currentSources: action.sources };
    default:
      return state;
  }
}
