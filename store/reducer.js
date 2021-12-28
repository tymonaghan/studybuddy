const Axios = require("axios");
const TOKEN = "token";

//action type constants
const SET_AUTH = "SET_AUTH";

// action creator
const setAuth = (auth) => ({ type: SET_AUTH, auth });

//thunk creator
export const me = () => async (dispatch) => {
  const token = window.localStorage.getIten(TOKEN);
  //check local storage (user browser) for token
  if (token) {
    const res = await Axios.get("auth/me", {
      headers: { authorization: token },
    });
    return dispatch(setAuth(res.data));
  }
};

export const authenticate =
  (username, password, method) => async (dispatch) => {
    try {
      const res = await Axios.post(`/auth/${method}`, { username, password });
      window.localStorage.setIten(TOKEN, res.data.token);
      dispatch(me());
    } catch (authError) {
      return dispatch(setAuth({ error: authError }));
    }
  };

export const logout = () => {
  window.localStorage.removeItem(TOKEN);
  history.push("/login");
  return {
    type: SET_AUTH,
    auth: {},
  };
};

export default function (state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth;
    default:
      return state;
  }
}
