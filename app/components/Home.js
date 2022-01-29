import { NoLoginWarning, ProjectList } from ".";
import { useDispatch, useSelector } from "react-redux";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import { Navigate } from "react-router-dom";
import React from "react";
import Stack from "react-bootstrap/Stack";
import { logout } from "../../store/authReducer";

const Home = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.id);
  // if state.auth.id exists, this user is logged in (boolean)

  const { username } = useSelector((state) => state.auth);
  //if they're logged in, also grab their username

  const dispatch = useDispatch();

  if (!isLoggedIn) {
    // if the user is not logged in, return a message inviting them to login or create account
    return <NoLoginWarning />;
  }

  return (
    // if the user Is logged in, show the homescreen greeting and logout button
    <Container className="home">
      <Stack direction="horizontal" gap={2}>
        <h1>
          Welcome, <strong>{username}</strong>
        </h1>
        <div className="vr" />
        <Button
          variant="warning"
          onClick={() => {
            dispatch(logout());
          }}
        >
          Logout
        </Button>
      </Stack>
      <ProjectList />
    </Container>
  );
};

export default Home;
