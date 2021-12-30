const Axios = require("axios");
const TOKEN = "token";

//action type constants
const SET_AUTH = "SET_AUTH";

// action creator
const setAuth = (auth) => ({ type: SET_AUTH, auth });

//thunk creator
export const me = () => async (dispatch) => {
  console.log(`hitting "me"(?) thunk in reducer file`);
  const token = window.localStorage.getItem(TOKEN);
  //check local storage (user browser) for token
  if (token) {
    const res = await Axios.get("auth/me", {
      //see server/auth.js loc27: router.get("/me"
      headers: { authorization: token },
    });
    return dispatch(setAuth(res.data));
  }
};

export const authenticate =
  (username, password, method) => async (dispatch) => {
    // console.log(
    //   `reducer authenticate method reached. username: ${username}\nPLAINTEXT password: ${password}\nmethod: ${method}`
    // );
    try {
      console.log(
        `trying axios.post to /auth/${method}, passing \nusername: ${username} \npassword:${password}`
      );
      const res = await Axios.post(`/auth/${method}`, { username, password });
      window.localStorage.setItem(TOKEN, res.data.token);
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
