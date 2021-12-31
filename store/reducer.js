import { Navigate } from "react-router-dom";

const Axios = require("axios");
const TOKEN = "token";

//action type constants
const SET_AUTH = "SET_AUTH";

// action creator
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
    const res = await Axios.get("auth/me", {
      //see server/auth.js loc27: router.get("/me"
      headers: { authorization: token },
    });
    // if there's a token, look up the user and send that object into setAuth action creator
    return dispatch(setAuth(res.data));
  }
  console.log(`no token found, please log in`);
  // if there's no token, do nothing. state will continue not having "auth" object, so Login screen will render.
};

export const authenticate =
  (username, password, method) => async (dispatch) => {
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
  // history.push("/login");
  <Navigate to="/login" />;
  return {
    type: SET_AUTH,
    auth: {},
  };
};

export default function (state = { auth: {} }, action) {
  switch (action.type) {
    case SET_AUTH:
      return { ...state, auth: { ...action.auth } };
    default:
      return state;
  }
}
