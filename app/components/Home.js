import React, { useEffect } from "react";
import { checkForUserToken, logout } from "../../store/reducer";
import { useDispatch, useSelector } from "react-redux";

import Button from "react-bootstrap/Button";

const Home = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.id);
  // if state.auth.id exists, this user is logged in (boolean)

  const { username } = useSelector((state) => state.auth);
  //if they're logged in, also grab their username

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkForUserToken());
  }, []);
  // check for user token every time this page is loaded

  if (!isLoggedIn) {
    // if the user is not logged in, return a message inviting them to login or create account
    return (
      <div>
        You are not currently logged in. Please Log in or Create an Account to
        continue.
      </div>
    );
  }

  return (
    // if the user Is logged in, show the homescreen greeting and logout button
    <div className="home">
      <h1>
        Welcome, <strong>{username}</strong>
      </h1>
      <Button
        variant="warning"
        onClick={() => {
          dispatch(logout());
        }}
      >
        Logout
      </Button>
    </div>
  );
};

export default Home;
