import { useDispatch, useSelector } from "react-redux";

import React from "react";

const About = () => {
  useSelector((state) => state);

  return (
    <div>
      <h1>About</h1>
      <p>StudyBuddy was created by Tyler Monaghan.</p>
      <br />
      <p>
        StudyBuddy is built using React, Express, and a Postgres database. It is
        deployed via Heroku. Learn more about StudyBuddy and my other software
        at{" "}
        <a href="https://portfolio.tylermonaghan.dev">
          portfolio.tylermonaghan.dev
        </a>
        .
      </p>
      <br />
      <p></p>
    </div>
  );
};

export default About;
