import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Navigate } from "react-router-dom";
import { authenticate } from "../../store/reducer";
import { checkForUserToken } from "../../store/reducer";

/**
 * COMPONENT
 */
const AuthForm = ({ name, displayName }) => {
  const { error } = useSelector((state) => state.auth) || null;
  const isLoggedIn = useSelector((state) => !!state.auth.id);
  // if state.auth.id exists, this user is logged in
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkForUserToken());
  }, []);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const formName = evt.target.name;
    const username = evt.target.username.value;
    const password = evt.target.password.value;
    dispatch(authenticate(username, password, formName));
  };

  if (isLoggedIn) {
    return <Navigate to="/home" />;
  }

  return (
    <div>
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
          <button type="submit">{displayName}</button>
        </div>
        {error && error.response && (
          <div className="errorbox"> {error.response.data} </div>
        )}
      </form>
    </div>
  );
};

export const Login = <AuthForm name="login" displayName="Login" />;
export const Signup = <AuthForm name="signup" displayName="Sign Up" />;
