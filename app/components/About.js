import { useDispatch, useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

import React from "react";

const About = () => {
  useSelector((state) => state);

  return (
    <div>
      <h1>About</h1>
      <p>
        StudyBuddy was created by{" "}
        <a href="https://portfolio.tylermonaghan.dev" target="_blank">
          Tyler Monaghan
        </a>
        .
      </p>
      <Card border="primary" className="mb-3" style={{ maxWidth: "36rem" }}>
        <Card.Header>Recent Updates</Card.Header>
        <Card.Body>
          <b>3/15/2022: </b> Users may now edit and save project info such as
          title, theme, topic, and thesis.
          <b>3/15/2022: </b> Update about page to include recent updates
        </Card.Body>
      </Card>
      <Card border="warning" style={{ maxWidth: "36rem" }}>
        <Card.Header>Features and Limitations</Card.Header>
        <Card.Body>
          StudyBuddy is an alpha product; it is still missing key functionality.
          <br />
          Currently, users may:
          <ul>
            <li>Create and log in to an account</li>
            <li>View and create Projects</li>
            <li>View and delete Sources</li>
            <li>View and add Notes from Source View</li>
          </ul>
          <p>Missing functionality includes, but is not limited to:</p>
          <ul>
            <li>View, create, edit, and remove Projects, Sources, and Notes</li>
            <li>Notes View, separate from Source View</li>
            <li>Edit user details and change password</li>
          </ul>
        </Card.Body>
      </Card>
    </div>
  );
};

export default About;
