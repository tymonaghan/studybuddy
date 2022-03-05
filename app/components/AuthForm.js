import React, { useEffect } from "react";
import { authenticate, checkForUserToken } from "../../store/authReducer";
import { useDispatch, useSelector } from "react-redux";

import Button from "react-bootstrap/Button";
import { Navigate } from "react-router-dom";

/**
 * COMPONENT
 */
const AuthForm = ({ name, displayName }) => {
  const { error } = useSelector((state) => state.auth) || null;
  const isLoggedIn = useSelector((state) => !!state.auth.id);
  // if state.auth.id exists, this user is logged in
  const dispatch = useDispatch();
  // console.dir(error);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const formName = evt.target.name;
    const username = evt.target.username.value;
    const password = evt.target.password.value;
    dispatch(authenticate(username, password, formName));
  };

  if (isLoggedIn) {
    return <Navigate to="/alphaWarning" />;
  }

  return (
    <div>
      <h1>{displayName}</h1>
      <form onSubmit={handleSubmit} name={name}>
        <div>
          <label htmlFor="username">
            <small>Username</small>
          </label>
          <input name="username" type="text" />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
        </div>
        <div>
          <Button type="submit">{displayName}</Button>
        </div>
        {error && error.response && (
          <div className="errorbox">
            {" "}
            Login Error. Check your username and password and try again.{" "}
          </div>
        )}
      </form>
    </div>
  );
};

export const Login = <AuthForm name="login" displayName="Login" />;
export const Signup = <AuthForm name="signup" displayName="Sign Up" />;
// these "props" get passed into the component function as arguments
