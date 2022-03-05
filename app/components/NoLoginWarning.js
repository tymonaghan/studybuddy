import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import React from "react";
import Stack from "react-bootstrap/Stack";

const NoLoginWarning = () => {
  return (
    <Card border="warning" style={{ width: "80%", margin: "2rem" }}>
      <Card.Header>Welcome to StudyBuddy</Card.Header>
      <Card.Body>
        {/* <Card.Title></Card.Title> */}
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
};

export default NoLoginWarning;
