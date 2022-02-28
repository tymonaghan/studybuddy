import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import React from "react";
import Stack from "react-bootstrap/Stack";

const NoLoginWarning = () => {
  return (
    <Card border="warning" style={{ width: "80%", margin: "2rem" }}>
      <Card.Header>Warning</Card.Header>
      <Card.Body>
        <Card.Title>Please Log In</Card.Title>
        <Card.Text>
          <p>
            You must be logged in to use this site. Please log in or create an
            account.
          </p>{" "}
          <p>
            <span style={{ fontWeight: "bold" }}>**PLEASE NOTE**</span>{" "}
            StudyBuddy is a pre-release product and is subject to change. Your
            account and its contents may be viewed, removed or altered without
            warning. DO NOT use this app for research that is not backed up nor
            to store any private or personally identifiable information.
          </p>
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
};

export default NoLoginWarning;
