import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Button";

const AlphaWarning = () => {
  const navigate = useNavigate();

  return (
    <Card border="warning" style={{ width: "80%", margin: "2rem" }}>
      <Card.Header>Warning</Card.Header>
      <Card.Body>
        <Card.Title>Alpha Software</Card.Title>
        <Card.Text>
          <span style={{ fontWeight: "bold" }}>**PLEASE NOTE**</span> StudyBuddy
          is a pre-release product and is subject to change. Your account and
          its contents may be viewed, removed or altered without warning. DO NOT
          use this app for research that is not backed up nor to store any
          private or personally identifiable information.
        </Card.Text>
        {/* <Stack direction="horizontal" gap={3}> */}
        {/* <Link to="/home"> */}

        <Button
          variant="primary"
          onClick={() => {
            navigate("/home");
          }}
        >
          {" "}
          Got It
        </Button>
        {/* </Link> */}
        {/* </Stack> */}
      </Card.Body>
    </Card>
  );
};

export default AlphaWarning;
