import { useDispatch, useSelector } from "react-redux";

import React from "react";

const About = () => {
  useSelector((state) => state);

  return (
    <div>
      <h1>Welcome</h1>
      <p>Welcome to StudyBuddy, created from scratch* by Tyler Monaghan</p>
      <br />
      <br />
      <p>
        <em>*with help from FS-App-Template and Boilermaker workshop</em>
      </p>
    </div>
  );
};

export default About;
