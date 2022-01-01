import { useDispatch, useSelector } from "react-redux";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Navigate } from "react-router-dom";
import React from "react";
import Stack from "react-bootstrap/Stack";
import { logout } from "../../store/reducer";

const Home = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.id);
  // if state.auth.id exists, this user is logged in (boolean)

  const { username } = useSelector((state) => state.auth);
  //if they're logged in, also grab their username

  const dispatch = useDispatch();

  if (!isLoggedIn) {
    // if the user is not logged in, return a message inviting them to login or create account
    return (
      <Card border="warning" style={{ width: "40%", margin: "2rem" }}>
        <Card.Header>Warning</Card.Header>
        <Card.Body>
          <Card.Title>Please Log In</Card.Title>
          <Card.Text>
            You must be logged in to use this site. Please log in or create an
            account.
          </Card.Text>
          <Stack direction="horizontal" gap={3}>
            <Button variant="primary" href="/login">
              Login
            </Button>
            <Button variant="secondary" href="/signup">
              Create Account
            </Button>
          </Stack>
        </Card.Body>
      </Card>
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
