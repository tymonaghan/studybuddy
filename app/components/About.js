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
          <b>4/6/2022: </b> Users may now associate notes with claims from a
          note's card (in either Notes or Sources view).
          <br />
          <b>4/6/2022: </b> Argument Table View / "at a glance" added to
          Argument view.
          <br />
          <b>4/4/2022: </b> Users can now click a Claim on the "Your Argument"
          view to see a Claim Detail Card that shows notes linked to that claim.
          <br />
          <b>3/28/2022: </b> Users may now add and remove claims from the "Your
          Argument" view of a project.
        </Card.Body>
      </Card>
      <Card border="warning" style={{ maxWidth: "36rem" }}>
        <Card.Header>Features and Limitations</Card.Header>
        <Card.Body>
          StudyBuddy is an alpha product; it is still missing key functionality.
          See more on the{" "}
          <a
            href="https://github.com/tymonaghan/studybuddy/issues"
            target="_blank"
          >
            GitHub issues page
          </a>
          .
          <br />
          <h3>Planned features:</h3>
          <ul>
            <li>View, create, edit, and remove Projects, Sources, and Notes</li>
            <li>
              Users can assign teammates and teachers who can collaborate on
              their projects
            </li>
            <li>Notes View, separate from Source View</li>
            <li>
              Argument view: add your main points, associate them with your
              notes, see visualizations showing where your evidence is strongest
            </li>
            <li>Edit user details and change password</li>
          </ul>
        </Card.Body>
      </Card>
    </div>
  );
};

export default About;
