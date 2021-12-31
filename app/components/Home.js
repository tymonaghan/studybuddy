import React, { useEffect } from "react";
import { checkForUserToken, logout } from "../../store/reducer";
import { useDispatch, useSelector } from "react-redux";

import Button from "react-bootstrap/Button";
import { Navigate } from "react-router-dom";

const Home = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.id);
  // if state.auth.id exists, this user is logged in

  const { username } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkForUserToken());
  }, []);

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
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
