import { Navigate } from "react-router-dom";

const Axios = require("axios");
const TOKEN = "token";

//action type constants
const SET_AUTH = "SET_AUTH";
const SET_USER_PROJECTS = "SET_USER_PROJECTS";

// action creator
const setUserProjects = (projects) => {
  return { type: SET_USER_PROJECTS, projects };
};
const setAuth = (auth) => {
  // action payload will be auth object
  // auth object will either contain db user object (id, username, pw, etc) or error object
  return { type: SET_AUTH, auth };
};

//thunk creator
export const checkForUserToken = () => async (dispatch) => {
  //checks browser storage for token and dispatches set auth action if found
  console.log(`checking local storage for user token`);
  const token = window.localStorage.getItem(TOKEN);
  //check local storage (user browser) for token
  if (token) {
    console.log(`token FOUND. logging in`);
    const res = await Axios.get("auth/getUserByToken", {
      //see server/auth.js loc40: router.get("/getUserByToken"
      headers: { authorization: token },
    });
    // if there's a token, look up the user and send that object into setAuth action creator
    return dispatch(setAuth(res.data));
  }
  console.log(`no token found, please log in`);
  // if there's no token, do nothing. state will continue not having "auth" object, so Login screen will render.
};

export const retrieveUserProjectsFromDb = (userId) => async (dispatch) => {
  console.log(`Retrieving user projects from db...`);
  try {
    const response = await Axios.get(`/api/user/${userId}/projects`);
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

export default function (state = { auth: {}, projects: {} }, action) {
  switch (action.type) {
    case SET_AUTH:
      return { ...state, auth: { ...action.auth } };
    case SET_USER_PROJECTS:
      return { ...state, projects: { ...action.projects } };
    default:
      return state;
  }
}
